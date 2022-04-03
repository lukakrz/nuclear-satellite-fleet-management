import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import AxiosConfig from '../api/AxiosConfig';

import { Container, Col, Row, Badge, Button, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import moment from 'moment';
import { NotificationContainer, NotificationManager } from 'react-notifications';
const buttons = {
    width: '200px',
    margin: '0px 10px',
    backgroundColor: '#845EC2',
    border: '1px solid #5B2DA6'
}

const EditSatellite = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [sideNumber, setSideNumber] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const [currentVersion, setCurrentVersion] = useState('')
    const [year, setYear] = useState('')
    const [lanuchedAt, setLanuchedAt] = useState('')
    const [ammountAmmo, setAmmountAmmo] = useState('')
    const [orbitAltitude, setOrbitAltitude] = useState('')
    const [isAi, setIsAi] = useState(0)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getSatellite();
    }, [])
    const getSatellite = async () => {
        const response = await AxiosConfig.get(`/api/satellites/${id}`)
        setSideNumber(response.data.side_number)
        setManufacturer(response.data.manufacturer)
        setModel(response.data.model)
        setCurrentVersion(response.data.current_version)
        setYear(moment(response.data.year).toDate())
        setLanuchedAt(moment(response.data.lanuched_at).toDate());
        setAmmountAmmo(response.data.ammount_ammo)
        setOrbitAltitude(response.data.orbit_altitude)
        setIsAi(response.data.is_ai)
    }

    const editSatellite = async (id) => {
        let items = {
            side_number: sideNumber, manufacturer, model,
            current_version: currentVersion, year: moment(year).format('YYYY'), lanuched_at: moment(lanuchedAt).format('YYYY-MM-DD'),
            ammount_ammo: ammountAmmo, orbit_altitude: orbitAltitude, is_ai: isAi,
        }
        try {
            const response = await AxiosConfig.put(`/api/satellites/${id}`, items);
            if (response && response.status === 200) {
                NotificationManager.success('', 'Edycja powiodłą się');
                setTimeout(() => {
                    navigate('/satellites')
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                }, 1500)

            }
        } catch (err) {
            setErrors(err.response.data.errors)
        }
    }

    const back = () => {
        navigate('/satellites');
    }

    return (
        <div>

            <Form style={{ width: '100%' }}>
                <Container className='d-flex'>
                    <Col className='w-50'>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.side_number ? <Badge bg="danger"> {errors.side_number} </Badge> : null}
                                <Form.Label>Numer boczny</Form.Label>
                                <Form.Control type="text" placeholder="Podaj numer boczny" defaultValue={sideNumber} onChange={(e) => setSideNumber(e.target.value)} />
                            </Form.Group></Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75" >
                                {errors.manufacturer ? <Badge bg="danger"> {errors.manufacturer} </Badge> : null}
                                <Form.Label>Producent</Form.Label>
                                <Form.Control type="text" placeholder="Podaj producenta" defaultValue={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75" >
                                {errors.model ? <Badge bg="danger"> {errors.model} </Badge> : null}
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" placeholder="Podaj model" defaultValue={model} onChange={(e) => setModel(e.target.value)} />
                            </Form.Group></Row>

                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.year ? <Badge bg="danger"> {errors.year} </Badge> : null}
                                <Form.Label>Rocznik</Form.Label>
                                <DatePicker
                                    minDate={new Date("1900/01/01")}
                                    maxDate={new Date()}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    placeholderText="Wybierz rocznik"
                                    selected={year}
                                    onChange={(date) => setYear(date)} />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col className='w-50'>

                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.current_version ? <Badge bg="danger"> {errors.current_version} </Badge> : null}
                                <Form.Label>Wersja oprogramowania</Form.Label>
                                <Form.Control type="text" placeholder="Podaj wersje oprogramowania" defaultValue={currentVersion} onChange={(e) => setCurrentVersion(e.target.value)} />
                            </Form.Group></Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.ammount_ammo ? <Badge bg="danger"> {errors.ammount_ammo} </Badge> : null}
                                <Form.Label>Ilość amunicji</Form.Label>
                                <Form.Control type="text" placeholder="Podaj ilość amunicji" defaultValue={ammountAmmo} onChange={(e) => setAmmountAmmo(e.target.value)} />
                            </Form.Group></Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.orbit_altitude ? <Badge bg="danger"> {errors.orbit_altitude} </Badge> : null}
                                <Form.Label>Wysokość na orbicie</Form.Label>
                                <Form.Control type="text" placeholder="Podaj wysokość na orbicie" defaultValue={orbitAltitude} onChange={(e) => setOrbitAltitude(e.target.value)} />
                            </Form.Group></Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.lanuched_at ? <Badge bg="danger"> {errors.lanuched_at} </Badge> : null}
                                <Form.Label>Data wystrzelenia na orbitę</Form.Label>
                                <DatePicker
                                    minDate={new Date("1970/01/01")}
                                    maxDate={new Date()}
                                    showDisabledMonthNavigation
                                    placeholderText="Wybierz datę wystrzelenia na orbitę"
                                    selected={lanuchedAt}
                                    onChange={(date) => setLanuchedAt(date)} />
                            </Form.Group>
                        </Row>
                    </Col>
                </Container>
                <Form.Group className="mb-3 mt-4 d-flex justify-content-center" defaultValue={isAi} onChange={(e) => setIsAi(e.target.value)}>
                    Sztuczna inteligencja
                    {
                        ['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3 ms-3">
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
                <div className='w-100 d-flex justify-content-center'>
                    <Button variant="outline-light" onClick={back}>Anuluj</Button>
                    <Button style={buttons} onClick={() => editSatellite(id)}>Edytuj</Button>
                </div>
            </Form >
            <NotificationContainer />
        </div >
    )
}

export default EditSatellite