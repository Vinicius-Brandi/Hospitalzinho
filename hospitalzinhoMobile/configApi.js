import axios from 'axios';

const apiBase = axios.create({
  baseURL: 'http://localhost:5102/api', // coloque o IP/porta da sua API
});

export default apiBase;
