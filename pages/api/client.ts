import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log('baseUrl client: ', baseUrl);
const client = axios.create({
  baseURL: baseUrl,
  timeout: 2000,
});

export default client;
