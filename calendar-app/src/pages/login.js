import React from 'react';
import { loginUser, toRegisterPage } from '../components/Services/services';
import { Button, Form, Card } from 'react-bootstrap';
import UseForm from '../components/formFiles/useForm';
import { Redirect } from 'react-router';

export const LoginScreen = () => {
    const [user, setUser] = UseForm({
        email:'',
        password:'',
});

return (
    <div>
        <Card style={{display:"block", justifyContent: "center", textAlign: 'left', verticalAlign: 'middle', border: '1px dot black', marginTop: '25%', width: '45%', position:'relative', left:'25%'}}>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={setUser} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter a password" name="password" value={user.password} onChange={setUser} />
                </Form.Group>  
            </Form>
            <Button onClick={() => loginUser(user)}>
                Log In
            </Button>
            <Button onClick={() => toRegisterPage()} type="submit">Register</Button>
        </Card>
    </div>
)
}