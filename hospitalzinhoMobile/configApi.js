import axios from 'axios';

const apiBase = axios.create({
  baseURL: 'http://172.20.10.3//api', // coloque o IP/porta da sua API
});

export default apiBase;
