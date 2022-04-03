import React, { useContext } from 'react'

import { ListGroup, Card, Button } from 'react-bootstrap'
import profile from '../assets/profile.png'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'

const cardContainer = {
    width: '100%',
    margin: 'auto auto',
    color: 'black',
}

const profileCard = {
    width: '25rem',
    margin: 'auto auto',
    opacity: '0.8'
}

const button = {
    width: '200px',
    backgroundColor: '#845EC2',
    border: '1px solid #5B2DA6',
    marginTop: '20px'
}

const Profile = () => {
    const { user } = useContext(UserContext);

    return (
        <div style={cardContainer}>
            <Card style={profileCard}>
                <Card.Img src={profile} />
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center' }}>{user.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                        <ListGroup.Item>Pochodzenie: {user.origin}</ListGroup.Item>
                        <ListGroup.Item>Przycisk atomowy: {user.has_atomic_button ? 'Posiada' : "Nie posiada"}</ListGroup.Item>
                    </ListGroup>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Link to={'/user/edit'}><Button style={button}>Edytuj</Button></Link>
                    </div>

                </Card.Body>
            </Card>
        </div >
    )
}

export default Profile