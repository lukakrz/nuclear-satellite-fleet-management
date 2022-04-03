import React, { useEffect, useContext } from 'react'

import SatelliteContext from '../context/SatelliteContext';
import NoSatellite from './NoSatellite';
import Paginate from './Paginate';
import Satellite from './Satellite';

const satellitesContainer = {
    position: 'relative',
    top: '100px'
}
const paginate = {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '50px',
    width: '1300px',
}

const Satellites = () => {
    const { getSatellites, sattelites, pageNumber } = useContext(SatelliteContext)

    useEffect(() => {
        getSatellites();
    }, [pageNumber])

    return (
        <div style={satellitesContainer}>
            {sattelites.length > 0 ?
                <>
                    {
                        sattelites?.map((satellite, key) => (
                            <Satellite satellite={satellite} key={satellite.id} />
                        ))
                    }
                    <div style={paginate}>
                        <Paginate />
                    </div>
                </>
                :
                <NoSatellite />
            }

        </div>
    )
}

export default Satellites