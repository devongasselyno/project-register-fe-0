import axios from "axios";

const instance = axios.create({
    baseURL: 'http://prj-reg.10.18.5.3.nip.io/api',
})

export default instance