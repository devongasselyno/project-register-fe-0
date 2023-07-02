import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

const fetch = (props) => {
    // const [ method, params, url ] = props
    const token = sessionStorage.getItem('token')

    // if ()
}

export default instance