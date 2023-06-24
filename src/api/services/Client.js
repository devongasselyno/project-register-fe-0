import api from '../api'

export const createClient = async (clientData) => {
    try {
        const response = await api.post('/client/create', clientData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllClients = async () => {
    try {
        const response = await api.get('/client/read');
        return response.data.data
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getClientByID = async (id) => {
    try {
        const response = await api.get(`/client/read/${id}`);
        return response.data.data
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateClient = async (id, updatedData) => {
    try {
        const response = await api.patch(`/client/${id}`, updatedData);
        console.log("response", response.data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getLatestClient = async () => {
    try {
        const response = await api.get('/client/latest');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchClient = async (query) => {
    try {
        const response = await api.get('/client/search', { params: { query } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};


export const deleteClient = async (id) => {
    try {
        const response = await api.delete(`/client/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteClient = async (id) => {
    try {
        const response = await api.delete(`/client/hard/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
