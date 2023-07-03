import Fetch from '../api'

export const createProspect = async (ProspectData) => {
    try {
        const response = await Fetch({url: 'model/prospect/create', payload: ProspectData, method: 'POST'});
        return response;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllProspects = async () => {
    try {
        const response = await Fetch({url: 'model/prospect/read', method: 'GET'});
        return response;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getProspect = async (ProspectId) => {
    try {
        const response = await Fetch({url: `model/prospect/read/${ProspectId}`, method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateProspect = async (ProspectId, ProspectData) => {
    try {
        const response = await Fetch({url: `model/prospect/update/${ProspectId}`,payload: ProspectData, method: 'PATCH'});
        return response;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteProspect = async (ProspectId) => {
    try {
        const response = await Fetch({url: `model/prospect/delete/${ProspectId}`, method: 'DELETE'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteProspect = async (ProspectId) => {
    try {
        const response = await Fetch({url: `model/prospect/hard/${ProspectId}`, method: 'DELETE'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const convertToProject = async (ProspectId, requestData) => {
    try {
        const response = await Fetch({url: `model/prospect/convert/${ProspectId}`, payload: requestData, method: 'POST'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverProspect = async (ProspectId) => {
    try {
        const response = await Fetch({url: `model/prospect/recover/${ProspectId}`, method: 'POST'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchProspects = async (searchParams) => {
    try {
        const response = await Fetch({url: 'model/prospect/search', params: searchParams, method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const filterAllProspects = async () => {
    try {
        const response = await Fetch({url: 'model/prospect/filter', method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};