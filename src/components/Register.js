import React, { useState } from "react";
import { createUserWithEmailAndPassword, } from 'firebase/auth'
import { auth } from '../firebase.config'
import { useNavigate } from "react-router-dom";
import img1 from '../assets/React.png'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Register() {

    const navigate = useNavigate()

    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    })

    const handleRegister = () => {
        if (registerInfo.email !== registerInfo.confirmEmail) {
            alert('Please confirm email');
            return
        } else if (registerInfo.password !== registerInfo.confirmPassword) {
            alert('please confirm password');
            return
        }
        createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password)
            .then(() => {
                navigate('/home')
            })
            .catch((err) => alert(err.message))
    }
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={img1} /> Register to your acount
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            type="email"
                            value={registerInfo.email}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
                        />
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='Confirm E-mail address'
                            type="email"
                            value={registerInfo.confirmEmail}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, confirmEmail: e.target.value })}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={registerInfo.password}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm Password'
                            type='password'
                            value={registerInfo.confirmPassword}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })}
                        />
                        <Button
                            color='teal'
                            fluid size='large'
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Have you acount? <a href='/'>Login</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Register