import React, { useState } from 'react'
import { Container, Col, Row, Badge, Form, Button } from 'react-bootstrap'
import AxiosConfig from '../api/AxiosConfig'
import DatePicker from "react-datepicker";
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const button = {
    width: '200px',
    backgroundColor: '#845EC2',
    border: '1px solid #5B2DA6'
}
const AddSatellite = () => {
    let navigate = useNavigate();
    const [sideNumber, setSideNumber] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const [currentVersion, setCurrentVersion] = useState('')
    const [year, setYear] = useState()
    const [lanuchedAt, setLanuchedAt] = useState('')
    const [ammountAmmo, setAmmountAmmo] = useState('')
    const [orbitAltitude, setOrbitAltitude] = useState('')
    const [isAi, setIsAi] = useState(0)
    const [errors, setErrors] = useState([]);
    const addSatellite = async () => {
        let items = {
            side_number: sideNumber, manufacturer, model,
            current_version: currentVersion, year: moment(year).format('YYYY'), lanuched_at: moment(lanuchedAt).format('YYYY-MM-DD'),
            ammount_ammo: ammountAmmo, orbit_altitude: orbitAltitude, is_ai: isAi,
        }
        try {
            const response = await AxiosConfig.post("/api/satellites", items);
            if (response && response.status === 201) {
                NotificationManager.success('', 'Satelita dodana!');
                setTimeout(() => {
                    navigate('/satellites')
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                }, 1500)
            }
        } catch (err) {
            console.log(err.response.data.errors)
            setErrors(err.response.data.errors)
        }
    }
    return (
        <div>
            <NotificationContainer />
            <Form style={{ width: '100%' }}>
                <Container className='d-flex'>
                    <Col className='w-50'>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.side_number ? <Badge bg="danger"> {errors.side_number} </Badge> : null}
                                <Form.Label>Numer boczny</Form.Label>
                                <Form.Control type="text" placeholder="Podaj numer boczny" value={sideNumber} onChange={(e) => setSideNumber(e.target.value)} />
                            </Form.Group></Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75" >
                                {errors.manufacturer ? <Badge bg="danger"> {errors.manufacturer} </Badge> : null}
                                <Form.Label>Producent</Form.Label>
                                <Form.Control type="text" placeholder="Podaj producenta" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75" >
                                {errors.model ? <Badge bg="danger"> {errors.model} </Badge> : null}
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" placeholder="Podaj model" value={model} onChange={(e) => setModel(e.target.value)} />
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
                                <Form.Control type="text" placeholder="Podaj wersje oprogramowania" value={currentVersion} onChange={(e) => setCurrentVersion(e.target.value)} />
                            </Form.Group></Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.ammount_ammo ? <Badge bg="danger"> {errors.ammount_ammo} </Badge> : null}
                                <Form.Label>Ilość amunicji</Form.Label>
                                <Form.Control type="text" placeholder="Podaj ilość amunicji" value={ammountAmmo} onChange={(e) => setAmmountAmmo(e.target.value)} />
                            </Form.Group></Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="mb-3 w-75">
                                {errors.orbit_altitude ? <Badge bg="danger"> {errors.orbit_altitude} </Badge> : null}
                                <Form.Label>Wysokość na orbicie</Form.Label>
                                <Form.Control type="text" placeholder="Podaj wysokość na orbicie" value={orbitAltitude} onChange={(e) => setOrbitAltitude(e.target.value)} />
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
                                    selected={lanuchedAt} onChange={(date) => setLanuchedAt(date)} />
                            </Form.Group>
                        </Row>
                    </Col>
                </Container>

                <Form.Group className="mb-3 mt-4 d-flex justify-content-center" value={isAi} onChange={(e) => setIsAi(e.target.value)}>
                    Sztuczna inteligencja
                    {['radio'].map((type) => (
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
                    ))}
                </Form.Group>
                <div className='w-100 d-flex justify-content-center'>
                    <Button style={button} onClick={addSatellite}>Dodaj</Button>
                </div>



            </Form >
        </div >
    )
}

export default AddSatellite