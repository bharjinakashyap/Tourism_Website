
import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'

import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from './../context/AuthContext'
import { BASE_URL } from './../utils/config'


const HotelRegistration = () => {

  const [credentials, setCredentials] = useState({
    hotelname: undefined,
    address: undefined,
    locality: undefined,
    pincode: undefined,
    email: undefined,
    phone: undefined,
    gstnumber: undefined,
    tradelicense: undefined
  })


  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()


  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/hotel/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })


      const result = await res.json()
      console.log(result);

      if (result.success) {

        navigate('/hotel-login', { state: credentials.email })
        dispatch({ type: 'REGISTER_SUCCESS' })

      }

      // if (!res.ok) alert(result.message)



    } catch (err) {
      alert(err.message)
    }
  }

  // useEffect(() => {
  //   if (exist) {
  //     navigate('/hotel-login', { state: exist.toString() })

  //   }
  // }, [])



  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register Your Hotel</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="text" placeholder="Hotel Name" required id="hotelname" onChange={handleChange} value={credentials.hotelname} />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder="Address" required id="address" onChange={handleChange} value={credentials.address} />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder="Locality" required id="locality" onChange={handleChange} value={credentials.locality} />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder="Pincode" required id="pincode" onChange={handleChange} value={credentials.pincode} />
                  </FormGroup>
                  <FormGroup>
                    <input type="email" placeholder="Email" required id="email" onChange={handleChange} value={credentials.email} />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder="Phone" required id="phone" onChange={handleChange} value={credentials.phone} />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder="Gst Number" required id="gstnumber" onChange={handleChange} value={credentials.gstnumber} />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder="Tradelicense Number" required id="tradelicense" onChange={handleChange} value={credentials.tradelicense} />
                  </FormGroup>

                  <Button className='btn secondary__btn auth__btn' type="submit" >Create Account</Button>
                </Form>
                <p>Already have an account? <Link to='/hotel-login'>Login</Link> </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HotelRegistration