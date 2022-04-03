import React from 'react'

const noSatelite = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    fontSize: '4rem',
    flexDirection: 'column',

}
const NoSatellite = () => {
    return (
        <div style={noSatelite}>
            Brak satelitów!
            <span style={{ fontSize: '2rem' }}>dodaj aby wyświetlić</span>
        </div>
    )
}

export default NoSatellite