import axios from "axios";

export default axios.create({
    //baseURL: 'https://192.168.10.222:15038',
    baseURL: 'https://progettogiuseppe.local:15038',
    withCredentials: true
});