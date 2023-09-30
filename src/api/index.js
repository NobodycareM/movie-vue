import axios from "axios";

const request = axios.create({
    baseURL : '/api',
    timeout : 10000,
    headers : {'Content-Type' : "application/json; charset = utf-8"},
    responseType : 'json'
})

export default request
