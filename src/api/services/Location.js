import Fetch from "../api"

export const createLocation = async (locationData) => {
    try {
        const response = await Fetch({ url: '/locations/create', payload: locationData, method: 'POST' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllLocations = async () => {
    try {
        const response = await Fetch({ url: '/locations/read', method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getLocationById = async (locationId) => {
    try {
        const response = await Fetch({ url: `/locations/read/${locationId}`, method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchLocations = async (searchParams) => {
    try {
        const response = await Fetch({ url: '/locations/search', params: searchParams, method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateLocation = async (locationId, locationData) => {
    try {
        const response = await Fetch({ url: `/locations/update/${locationId}`, payload: locationData, method: 'PATCH' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteLocation = async (locationId) => {
    try {
        const response = await Fetch({ url: `/locations/${locationId}`, method: 'DELETE' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteLocation = async (locationId) => {
    try {
        const response = await Fetch({ url: `/locations/hard/${locationId}`, method: 'DELETE' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverLocation = async (locationId) => {
    try {
        const response = await Fetch({ url: `/locations/recover/${locationId}`, method: 'PATCH' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
  