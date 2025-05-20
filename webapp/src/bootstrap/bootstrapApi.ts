import axios, { type AxiosInstance } from "axios";

export let api: AxiosInstance;

export const initApi = async () => {

	api = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL
	});
};