import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import img1 from '../assets/React.png'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Welcome() {

  const [email, setEamil] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/')
      }
    })
  }, [])

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/home')
    })
      .catch((error) => alert(error.message))
  }

  return (

    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src={img1} /> Login to your acount
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              value={email} onChange={(e) =>
                setEamil(e.target.value)}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)}
            />
            <Button
              color='teal'
              fluid size='large'
              onClick={handleSignIn}
            >
              Log In
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/register'>Register page</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Welcome;
