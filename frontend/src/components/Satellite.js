import React from 'react'
import moment from 'moment';
import { Accordion, Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DeleteSatellite from './DeleteSatellite'

const satelliteContainer = {
    display: 'flex',
    justifyContent: 'center'
}

const accordion = {
    opacity: '0.7',
    width: '60%',
    color: 'black',
    fontSize: '1.2rem',
}

const accordionHeader = {
    display: "flex",
    width: "90%",
    justifyContent: "space-between",
};

const accordionRow = {
    margin: '10px 0'
}

const accordionCol = {
    textAlign: 'start',
}

const actionButtons = {
    display: 'flex',
    width: '100%',
    justifyContent: 'end',
    borderBottom: '1px solid #000',
}

const button = {
    margin: '0 10px',
    backgroundColor: '#845EC2',
    border: '1px solid #5B2DA6',
    marginBottom: '15px',
}

const span = {
    fontWeight: '700',
}

const Satellite = ({ satellite }) => {

    return (
        <div style={satelliteContainer}>
            <Accordion flush style={accordion}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div style={accordionHeader}>
                            <span>Model:  <span style={span}> {satellite.model}</span></span>
                            <span>Numer boczny: <span style={span}> {satellite.side_number}</span></span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row style={accordionRow}>
                                <Col style={accordionCol}><span style={span}>Producent:</span> {satellite.manufacturer}</Col>
                                <Col style={accordionCol}><span style={span}>Model:</span> {satellite.model}</Col>
                            </Row>
                            <Row style={accordionRow}>
                                <Col style={accordionCol}><span style={span}>Wersja oprogramowania:</span> {satellite.current_version}</Col>
                                <Col style={accordionCol}><span style={span}>Rocznik:</span> {satellite.year}</Col>
                            </Row>
                            <Row style={accordionRow}>
                                <Col style={accordionCol}><span style={span}>Data wystrzelenia:</span> {moment(satellite.lanuched_at).format('YYYY-MM-DD')}</Col>
                                <Col style={accordionCol}><span style={span}>Ilość amunicji:</span> {satellite.ammount_ammo}</Col>
                            </Row>
                            <Row style={accordionRow}>
                                <Col style={accordionCol}><span style={span}>Wysokość na orbicie:</span> {satellite.orbit_altitude}</Col>
                                <Col style={accordionCol}><span style={span}>Stuczna inteligencja:</span> {satellite.is_ai ? 'TAK' : 'NIE'}</Col>
                            </Row>
                            <Row style={accordionRow}>
                                <Col style={accordionCol}><span style={span}>Data stworzenia:</span> {moment(satellite.created_at).format('YYYY-MM-DD')}</Col>
                                <Col style={accordionCol}><span style={span}>Data aktualizacji:</span> {moment(satellite.updated_at).format('YYYY-MM-DD')}</Col>
                            </Row>
                        </Container>
                        <div style={actionButtons}>
                            <Link to={`/satellites/edit/${satellite.id}`} satellite={satellite}><Button style={button}>Edytuj</Button></Link>
                            <DeleteSatellite satellite={satellite} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div >
    )
}

export default Satellite