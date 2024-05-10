import axios from 'axios';
// const HOST = "http://127.0.0.1:8090"

// const HOST = "http://localhost:3001"
//http://torsin-admin.apponward.com

const HOST = "https://torsin-admin.apponward.com/";
const version = "v1/api/";

const API = HOST + version;

const instance = axios.create({
    baseURL: API,
});

export default instance;
