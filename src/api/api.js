import axios from "axios"
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

const Fetch = async (props) => {
    const { method, payload, url } = props
    const token = sessionStorage.getItem('token')
    // const navigate = useNavigate()

    if(!token) {
        console.log("kick")
        sessionStorage.removeItem('token')
        // navigate('/login')
    }

    console.log("responsnya bisa", url)
    try {
        let response
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

        if (method === 'POST') {
            response = await instance.post(url, payload)
        } else if (method === 'GET') {
            response = await instance.get(url)
            
        } else if (method === 'PATCH') {
            response = await instance.patch(url, payload)
        } else if (method === 'DELETE') {
            response = await instance.delete(url)
        }

        return response
    } catch (error) {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('token')
            // navigate('/login')
            throw new Error('Unauthorized access')
        }
        throw error
    }
}

export default Fetch
export { instance }