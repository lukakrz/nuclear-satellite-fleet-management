import React, { useState } from 'react'

import { Form, Button, Badge } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import AxiosConfig from '../api/AxiosConfig';

const loginPage = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: "center",
    height: '100vh',
}

const registerSpan = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
    color: 'white',
    textDecoration: 'none',
}

const buttonGroup = {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '50px',
}
const button = {
    backgroundColor: '#845EC2',
    border: '1px solid #5B2DA6',
}

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState('');

    const logIn = async () => {
        let items = { email, password };
        try {
            const response = await AxiosConfig.post('/api/auth/login', items)
            if (response && response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/satellites')
                window.location.reload();
            }
        } catch (err) {
            if (err.response.status === 401) {
                setError(err.response.data.message);
                setErrors([]);
            } else {
                setErrors(err.response.data.errors);
                setError("");
            }
        }
    }

    return (
        <div style={loginPage}>
            <Form style={{ width: '25%' }}>
                {error ? <Badge bg="danger"> {error} </Badge> : null}
                {errors.email ? <Badge bg="danger"> {errors.email} </Badge> : null}
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Podaj email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                {errors.password ? (
                    <Badge bg="danger"> {errors.password} </Badge>
                ) : null}
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" placeholder="Podaj hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group style={buttonGroup}>
                    <Link to="/register" style={registerSpan}>Zarejestruj się!</Link>
                    <Button style={button} onClick={logIn}>Zaloguj</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login