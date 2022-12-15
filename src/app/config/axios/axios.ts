import Axios from 'axios';
import { API_BASE_URL } from 'shared/config/variables';
import { LocalStorageService } from 'shared/services/local-storage-service';

const axiosInstance = Axios.create({
	baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
	function (config) {
		config.headers = {
			Authorization: LocalStorageService.get('token'),
			...config.headers,
		};

		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export const axios = axiosInstance;
