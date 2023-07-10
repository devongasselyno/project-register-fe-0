import Fetch from '../api'

export const createClient = async (clientData) => {
    try {
        const response = await Fetch({url: '/client/create', payload: clientData, method: 'POST'})
        return response
    } catch (error) {
        throw new Error(error?.response.data.error);
    }
};

export const getAllClients = async () => {
    try {
        const response = await Fetch({url: '/client/read', method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getClientByID = async (id) => {
    try {
        const response = await Fetch({url: `/client/read/${id}`, method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateClient = async (id, updatedData) => {
    try {
        const response = await Fetch({url: `/client/${id}`, payload: updatedData, method: 'PATCH'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getLatestClient = async () => {
    try {
        const response = await Fetch({url: '/client/latest', method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchClient = async (query) => {
    try {
        const response = await Fetch({url: '/client/search',  params: { query } , method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}


export const deleteClient = async (id) => {
    try {
        const response = await Fetch({url: `/client/${id}`, method: 'DELETE'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteClient = async (id) => {
    try {
        const response = await Fetch({url: `/client/hard/${id}`, method: 'DELETE'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}