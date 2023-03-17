import axios from 'axios';
import type { AxiosInstance } from 'axios';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const axiosInstance: AxiosInstance = axios.create({
	baseURL: `${baseUrl}/`
});

export const apiService = axiosInstance;
