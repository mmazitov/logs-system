import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

const getLogs = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/logs`);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch logs:', error);
		throw new Error('Failed to fetch logs');
	}
};

const editLog = async (id: string, data: { owner: string; text: string }) => {
	try {
		const response = await axios.put(`${BASE_URL}/logs/${id}`, data);
		return response.data;
	} catch (error) {
		console.error('Failed to edit log:', error);
		throw new Error('Failed to edit log');
	}
};

const deleteLog = async (id: string) => {
	try {
		const response = await axios.delete(`${BASE_URL}/logs/${id}`);
		return response.data;
	} catch (error) {
		console.error('Failed to delete log:', error);
		throw new Error('Failed to delete log');
	}
};

export { deleteLog, editLog, getLogs };
