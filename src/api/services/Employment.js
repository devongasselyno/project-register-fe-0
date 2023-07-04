import Fetch from '../api'

export const createEmployment = async (employmentData) => {
	try {
		const response = await Fetch({url: '/employments/create', payload: employmentData, method: 'POST'})
		// console.log("employment", employmentData)
		return response;
	} catch (error) {
		throw new Error(error.response.data.error)
	}
};

export const getAllEmployments = async () => {
	try {
		const response = await Fetch({url: '/employments/read', method: 'GET'});
		return response
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export const getEmploymentsByContactID = async (id) => {
	try {
		const response = await Fetch({url: `/employments/read/${id}`, method: 'GET'});
		return response
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export const deleteEmployment = async (employmentData) => {
	try {
		const response = await Fetch({url: '/employments/delete',  payload: employmentData , method: 'DELETE'});
		return response
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};
