import api from '../api'

export const createEmployment = async (employmentData) => {
	try {
		const response = await api.post('/employments/create', employmentData);
		// console.log("employment", employmentData)
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export const getAllEmployments = async () => {
	try {
		const response = await api.get('/employments/read');
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export const getEmploymentsByContactID = async (id) => {
	try {
		const response = await api.get(`/employments/read/${id}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export const deleteEmployment = async (employmentData) => {
	try {
		const response = await api.delete('/employments/delete', { data: employmentData });
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};
