import api from '../api';

export const createProspect = async (ProspectData) => {
        try {
            const response = await api.post('model/prospect/create', ProspectData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const getAllProspects = async () => {
        try {
            const response = await api.get('model/prospect/read');
            return response.data.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const getProspect = async (ProspectId) => {
        try {
            const response = await api.get(`model/prospect/read/${ProspectId}`);
            return response.data.data
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const updateProspect = async (ProspectId, ProspectData) => {
        try {
            const response = await api.patch(`model/prospect/update/${ProspectId}`, ProspectData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const deleteProspect = async (ProspectId) => {
        try {
            const response = await api.delete(`model/prospect/delete/${ProspectId}`);
            return response.data.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const hardDeleteProspect = async (ProspectId) => {
        try {
            const response = await api.delete(`model/prospect/hard/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const convertToProspect = async (ProspectId) => {
        try {
            const response = await api.post(`model/prospect/convert/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const recoverProspect = async (ProspectId) => {
        try {
            const response = await api.post(`model/prospect/recover/${ProspectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const searchProspects = async (searchParams) => {
        try {
            const response = await api.get('model/prospect/search', { params: searchParams });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };

    export const filterAllProspects = async () => {
        try {
            const response = await api.get('model/prospect/filter');
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };
