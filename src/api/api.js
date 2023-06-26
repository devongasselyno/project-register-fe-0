import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// const instance = axios.create({
//     baseURL: 'http:127.0.0.1/api',
// })

export default instance