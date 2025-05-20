import axios, { type AxiosInstance } from "axios";

export let api: AxiosInstance;

export const initApi = async () => {

	api = axios.create({
		baseURL: "http://localhost:8080/",
	});
};