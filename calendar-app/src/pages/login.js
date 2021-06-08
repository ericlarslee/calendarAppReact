import React from 'react';
import { loginUser } from '../components/Services/services';
import { Button, Form } from 'react-bootstrap';
import UseForm from '../components/formFiles/useForm';

export const LoginScreen = (props) => {
    const [user, setUser] = UseForm({
        email:'',
        password:'',
});

// const loginUser = (user) => {
//     console.log(user);
//     loginUser(user);
//     window.location = '/';
// }

return (
    <div>
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
    </div>
)
}