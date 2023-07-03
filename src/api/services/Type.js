import api from '../api';

export const createType = async (typeData) => {
    try {
        const response = await api.post('/type/create', typeData);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllProjectTypes = async () => {
    try {
        const response = await api.get('/type/read');
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getProjectTypeByID = async (typeId) => {
    try {
        const response = await api.get(`/type/read/${typeId}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchProjectType = async (searchParams) => {
    try {
        const response = await api.get('/type/search', { params: searchParams });
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateProjectType = async (typeId, typeData) => {
    try {
        const response = await api.put(`/type/update/${typeId}`, typeData);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteProjectType = async (typeId) => {
    try {
        const response = await api.delete(`/type/${typeId}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteProjectType = async (typeId) => {
    try {
        const response = await api.delete(`/type/hard/${typeId}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverProjectType = async (typeId) => {
    try {
        const response = await api.post(`/type/recover/${typeId}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
