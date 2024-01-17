import Hotel from "../models/Hotel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//hotel registration
export const registration = [
  body("hotelname", "Enter a valid name").isLength({ min: 3 }),
  body("address").isString(),
  body("locality").isString(),
  body("pincode", "Must be of 6 digits")
    .isNumeric()
    .isLength({ min: 6, max: 6 }),
  body("email", "Enter a valid email").isEmail(),
  body("phone", "Must be of 10 digits").isNumeric({ min: 10, max: 10 }),
  body("gstnumber", "Enter a valid gstnumber").isString(),
  body("tradelicense", "Enter a valid trade license number").isNumeric(),

  async (req, res) => {
    const {
      hotelname,
      address,
      locality,
      pincode,
      email,
      phone,
      gstnumber,
      tradelicense,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }
    const userexists = await Hotel.findOne({ email });
    if (userexists) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "User already exists" });
    } else {
      try {
        const newHotel = new Hotel({
          hotelname: hotelname,
          address: address,
          locality: locality,
          pincode: pincode,
          email: email,
          phone: phone,
          gstnumber: gstnumber,
          tradelicense: tradelicense,
        });

        const regsuccess = await newHotel.save();

        if (regsuccess) {
          const user = await Hotel.findOne({ email });

          res
            .status(200)
            .json({ success: true, message: "Successfully created" });
          //if user doesn't exist
          if (!user) {
            return res
              .status(404)
              .json({ success: false, message: "User not found" });
          } else {
            const random = Math.floor(1000 + Math.random() * 9000);

            const keypass = `@${hotelname[0]}${hotelname[
              hotelname.length - 1
            ].toUpperCase()}${random}#`;
            //hashing keypass
            const salt = bcrypt.genSaltSync(10);
            const hashkeypass = bcrypt.hashSync(keypass, salt);

            const updatekeypass = await Hotel.findByIdAndUpdate(
              { _id: user._id },
              { keypass: hashkeypass },
              { new: true }
            );

            console.log(updatekeypass);

            const mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: "Sending a unique key pass for your hotel",
              text: `This keypass : ${keypass} is unique and assigned only for your hotel.Please do not share with others.`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("error", error);
                res
                  .status(401)
                  .json({ success: false, message: "email not send" });
              } else {
                console.log("Email sent", info.response);
                res
                  .status(201)
                  .json({ success: true, message: "Email sent successfully" });
              }
            });
          }
        }
      } catch (err) {
        res
          .status(500)
          .json({
            success: false,
            message: "Failed to create.Try again",
            error: err.message,
          });
      }
    }
  },
];

//user login
export const login = [
  body("email", "Enter a valid email").isEmail(),
  body("keypass", "Keypass is required to login")
    .notEmpty()
    .isLength({ min: 8, max: 8 }),
  async (req, res) => {
    const { email, keypass } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }
    try {
      const user = await Hotel.findOne({ email });

      //if user doesn't exist
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      //if user exists then check the keypass
      const checkKeypass = await bcrypt.compare(keypass, user.keypass);

      //if keypass is incorrect
      if (!checkKeypass) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect email or keypass" });
      } else {
        const { keypass, role, ...rest } = user._doc;

        //create jwt token
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15d" }
        );

        // Save the token in the user's document
        user.tokens.push({ token });
        await user.save();

        //set token in the browser cookies and send the response to the client
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 9000000),
          })
          .status(200)
          .json({ token, data: { ...rest }, role });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to login", error: error });
    }
  },
];
