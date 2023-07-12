import axios from "axios"

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

const Fetch = async(props) => {
    const { method, payload, url } = props
    const token = sessionStorage.getItem('token')

    if (!token) {
        sessionStorage.removeItem('token')
        return
    }

    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

        let response
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
            throw new Error('Unauthorized access')
        }
        throw error
    }
}

export default Fetch
export { instance }
