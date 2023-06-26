import axios from "axios";

const instance = axios.create({
    baseURL: 'http://prj-reg.10.18.5.3.nip.io/api',
})

// const instance = axios.create({
//     baseURL: 'http:127.0.0.1/api',
// })

export default instance