import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Form, Button, Badge } from 'react-bootstrap'
import AxiosConfig from '../api/AxiosConfig'
import { useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const editContainer = {
    display: 'flex',
    justifyContent: 'center',
}
const buttonGroup = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
}
const button = {
    width: '200px',
    backgroundColor: '#845EC2',
    border: '1px solid #5B2DA6',
}
const EditProfile = () => {
    let navigate = useNavigate();
    useEffect(() => {
        setName(user.name);
        setOrigin(user.origin);
        setEmail(user.email);
        setAtomicButton(user.has_atomic_button);
    }, [])
    const { user, getUser } = useContext(UserContext)
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [atomicButton, setAtomicButton] = useState();
    const [errors, setErrors] = useState([]);

    const editUser = async () => {
        let items = { name, origin, email, password, has_atomic_button: atomicButton }
        try {
            const response = await AxiosConfig.put('/api/user', items)
            if (response && response.status === 200) {
                NotificationManager.success('', 'Profil zaktualizowany!');
                setTimeout(() => {
                    navigate('/profile')
                    getUser();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                }, 1500)

            }
        } catch (err) {
            setErrors(err.response.data.errors)
        }
    }

    return (
        <div style={editContainer}>
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
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" placeholder="Podaj hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" style={{ display: 'flex', justifyContent: 'space-around' }} value={atomicButton} onChange={(e) => setAtomicButton(e.target.value)}>
                    Przycisk atomowy?
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="tak"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                value={1}
                                defaultChecked={user.has_atomic_button ? true : false}
                            />
                            <Form.Check
                                inline
                                label="nie"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                                value={0}
                                defaultChecked={user.has_atomic_button ? false : true}
                            />
                        </div>
                    ))}
                </Form.Group>
                <Form.Group style={buttonGroup}>
                    <Button style={button} onClick={editUser}>Edytuj!</Button>
                </Form.Group>
            </Form>
            <NotificationContainer />
        </div >
    )
}

export default EditProfile