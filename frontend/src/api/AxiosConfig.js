import axios from 'axios';

const baseURL = 'https://satellite-app-lk.herokuapp.com'

let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null

const AxiosConfig = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    }
})

AxiosConfig.interceptors.request.use(async req => {
    if (!token) {
        let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

export default AxiosConfig;