import Fetch from '../api'

export const createClient = async (clientData) => {
    try {
        const response = await Fetch({url: '/client/create', payload: clientData, method: 'POST'})
        return response;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllClients = async () => {
    try {
        const response = await Fetch.get('/client/read');
        return response.data.data
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getClientByID = async (id) => {
    try {
        const response = await Fetch.get(`/client/read/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateClient = async (id, updatedData) => {
    try {
        const response = await Fetch.patch(`/client/${id}`, updatedData);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getLatestClient = async () => {
    try {
        const response = await Fetch.get('/client/latest');
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchClient = async (query) => {
    try {
        const response = await Fetch.get('/client/search', { params: { query } });
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};


export const deleteClient = async (id) => {
    try {
        const response = await Fetch.delete(`/client/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteClient = async (id) => {
    try {
        const response = await Fetch.delete(`/client/hard/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}