import { AxiosResponse } from 'axios';
import { apiService } from './apiService';


class BordersService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getAllItem = async (): Promise<any> =>
        await apiService
			.get('/')
			.then((response) => response.data)
			.catch((error: AxiosResponse) => Promise.reject(error));
}

export const bordersService = new BordersService();
