import { configure } from "@testing-library/react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

const Fetch = async(props, navigate) => {
    
    const { method, payload, url } = props   
    const token = sessionStorage.getItem('token')

    let response = null
    try { 
        if(method === 'POST'){
            response = await instance.post(url, payload)
        }
        else if(method === 'GET'){
            response = await instance.get(url) 
        }
        else if(method === 'PATCH'){
            response = await instance.patch(url, payload)
        }
        else if(method === 'DELETE'){
            response = await instance.delete(url)
        }
        
        if (response.status === 200) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        else if (response.status === 401) {
            sessionStorage.clear()
            navigate('/login')
        }

        console.log("response", response)
        return response
    } catch (error) {
        
    }
}

export default Fetch
export { instance }