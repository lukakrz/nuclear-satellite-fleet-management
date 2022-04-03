import { createContext, useState } from "react";
import AxiosConfig from "../api/AxiosConfig";

const SatelliteContext = createContext();

export function SatelliteProvider({ children }) {

    const [sattelites, setSatellites] = useState([]);
    const [activePage, setActivePage] = useState('');
    const [itemsCountPerPage, setItemsCountPerPage] = useState();
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    const getSatellites = async () => {
        try {
            const response = await AxiosConfig.get(`/api/satellites?page=${pageNumber}`)
            if (response && response.status === 200) {
                setSatellites(response.data.data)
                setActivePage(response.data.current_page);
                setItemsCountPerPage(response.data.per_page);
                setTotalItemsCount(response.data.total);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <SatelliteContext.Provider value={{
            sattelites, getSatellites, activePage, itemsCountPerPage, totalItemsCount, pageNumber, setPageNumber
        }}>{children}</SatelliteContext.Provider>
    )
}

export default SatelliteContext;