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

const Register = () => {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [atomicButton, setAtomicButton] = useState(0);
    const [errors, setErrors] = useState([]);
    const register = async () => {
        let items = { name, origin, email, password, has_atomic_button: atomicButton }
        try {
            const response = await AxiosConfig.post('/api/auth/register', items)
            if (response && response.status === 201) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/satellites')
                window.location.reload();
            }
        } catch (err) {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors);
            }
        }
    }
    return (
        <div style={loginPage}>
            <Form style={{ width: '25%' }}>
                {errors.name ? <Badge bg="danger"> {errors.name} </Badge> : null}
                <Form.Group className="mb-3">
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control type="text" placeholder="Podaj nazwę" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                {errors.origin ? <Badge bg="danger"> {errors.origin} </Badge> : null}
                <Form.Group className="mb-3" >
                    <Form.Label>Kraj pochodzenia</Form.Label>
                    <Form.Control type="text" placeholder="Podaj kraj pochodzenia" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </Form.Group>
                {errors.email ? <Badge bg="danger"> {errors.email} </Badge> : null}
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Podaj emaila" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                {errors.password ? <Badge bg="danger"> {errors.password} </Badge> : null}
                <Form.Group className="mb-3">
                    <Form.Label>Hasło (<small>musi posiadać min. 6 znaków, jedną cyfrę, jeden znak specjalny</small>)</Form.Label>
                    <Form.Control type="password" placeholder="Podaj hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" style={{ display: 'flex', justifyContent: 'space-around' }} value={atomicButton} onChange={(e) => setAtomicButton(e.target.value)}>
                    Przycisk atomowy?
                    {
                        ['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="tak"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    value={1}
                                />
                                <Form.Check
                                    inline
                                    label="nie"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    value={0}
                                    defaultChecked
                                />
                            </div>
                        ))
                    }
                </Form.Group>
                <Form.Group style={buttonGroup}>
                    <Link to="/" style={registerSpan}>Masz już konto?</Link>
                    <Button style={button} onClick={register}>Zarejestruj się</Button>
                </Form.Group>
            </Form>
        </div >
    )
}

export default Register