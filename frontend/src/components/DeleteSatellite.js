import React, { useState, useContext } from 'react'
import { Modal, Button } from "react-bootstrap";
import AxiosConfig from '../api/AxiosConfig';
import SatelliteContext from '../context/SatelliteContext';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const DeleteSatellite = ({ satellite }) => {

    const { getSatellites } = useContext(SatelliteContext)
    const [show, setShow] = useState(false);

    const deleteSatellite = async (id) => {
        try {
            const response = await AxiosConfig.delete(`/api/satellites/${id}`)
            if (response && response.status === 204) {
                handleClose();
                NotificationManager.warning('', 'Satelita usunięta!');
                setTimeout(() => {
                    getSatellites();
                    NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
                }, 1500)

            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{ marginBottom: '15px' }}>
            <Button variant="outline-danger" onClick={() => handleShow()}>
                Usuń
            </Button>
            <Modal style={{ color: 'black' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{satellite.side_number}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Czy na pewno chcesz usunąć tę satelitę?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="danger" onClick={() => deleteSatellite(satellite.id)}>
                        Usuń!
                    </Button>
                </Modal.Footer>
            </Modal>
            <NotificationContainer />
        </div>
    )
}

export default DeleteSatellite