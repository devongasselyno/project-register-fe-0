import api from '../api';

export const createProspect = async (ProspectData) => {
        try {
            const response = await api.post('/prospect/create', ProspectData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const getAllProspects = async () => {
        try {
            const response = await api.get('/prospect/read');
            return response.data.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const getProspect = async (ProspectId) => {
        try {
            const response = await api.get(`/prospect/read/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const updateProspect = async (ProspectId, ProspectData) => {
        try {
            const response = await api.patch(`/prospect/update/${ProspectId}`, ProspectData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const deleteProspect = async (ProspectId) => {
        try {
            const response = await api.delete(`/prospect/delete/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const hardDeleteProspect = async (ProspectId) => {
        try {
            const response = await api.delete(`/prospect/hard/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const convertToProspect = async (ProspectId) => {
        try {
            const response = await api.post(`/prospect/convert/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const recoverProspect = async (ProspectId) => {
        try {
            const response = await api.post(`/prospect/recover/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const searchProspects = async (searchParams) => {
        try {
            const response = await api.get('/prospect/search', { params: searchParams });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const filterAllProspects = async () => {
        try {
            const response = await api.get('/prospect/filter');
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };
