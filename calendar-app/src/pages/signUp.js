import React from 'react';
import { registerUser } from '../components/Services/services';
import { Button, Form } from 'react-bootstrap';
import UseForm from '../components/formFiles/useForm';

export const RegisterScreen = () => {
    const [newUser, setNewUser] = UseForm({
        email:'',
        password:'',
        first_name:'',
        last_name:'',
        address:''});
    
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={newUser.email} onChange={setNewUser} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter a password" name="password" value={newUser.password} onChange={setNewUser} />
                </Form.Group>
                <Form.Text>Profile Information</Form.Text>
                <Form.Group className="mb-3" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" name="first_name" value={newUser.first_name} onChange={setNewUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" name="last_name" value={newUser.last_name} onChange={setNewUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" placeholder="Zipcode" name="address" value={newUser.address} onChange={setNewUser} />
                </Form.Group>  
            </Form>
            <Button onClick={() => registerUser(newUser)}>
                Register
            </Button>
        </div>
    )
}
