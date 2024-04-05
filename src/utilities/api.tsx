import axios from "axios";

export default axios.create({
    baseURL: 'https://progettogiuseppe.local:15038',
    withCredentials: true
});