import React, { useContext } from 'react'
import Pagination from "react-js-pagination";
import SatelliteContext from '../context/SatelliteContext';

const Paginate = () => {
    const { setPageNumber, itemsCountPerPage, totalItemsCount, pageNumber } = useContext(SatelliteContext)

    return (
        <div style={{ opacity: '0.7' }}>
            <Pagination
                activePage={pageNumber}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="Pierwsza"
                lastPageText="Ostatnia"
                onChange={(pageNumber) => setPageNumber(pageNumber)}
            />
        </div>
    )
}

export default Paginate