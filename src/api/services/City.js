import Fetch from '../api'

export const createCity = async (cityData) => {
    try {
        const response = await Fetch({ url: '/city/create', payload: cityData, method: 'POST' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllCities = async () => {
    try {
        const response = await Fetch({ url: '/city/read', method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getCityById = async (cityId) => {
    try {
        const response = await Fetch({ url: `/city/read/${cityId}`, method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchCities = async (searchParams) => {
    try {
        const response = await Fetch({ url: '/city/search', params: searchParams, method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateCity = async (cityId, cityData) => {
    try {
        const response = await Fetch({ url: `/city/update/${cityId}`, payload: cityData, method: 'PUT' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteCity = async (cityId) => {
    try {
        const response = await Fetch({ url: `/city/${cityId}`, method: 'DELETE' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteCity = async (cityId) => {
    try {
        const response = await Fetch({ url: `/city/hard/${cityId}`, method: 'DELETE' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverCity = async (cityId) => {
    try {
        const response = await Fetch({ url: `/city/recover/${cityId}`, method: 'POST' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getCityFiltered = async (cityId) => {
    try {
        const response = await Fetch({ url: `/city/filter/${cityId}`, method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
