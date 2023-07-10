import axios from "axios"
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export default instance