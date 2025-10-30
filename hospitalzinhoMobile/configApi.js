import axios from 'axios';

const apiBase = axios.create({
  baseURL: 'http://192.168.11.224:5102/api', // coloque o IP/porta da sua API
});

export default apiBase;
