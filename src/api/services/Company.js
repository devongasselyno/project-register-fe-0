import api from '../api'

export const createCompany = async (companyData) => {
    try {
        const response = await api.post('/company/create', companyData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllCompanies = async () => {
    try {
        const response = await api.get('/company/read');
        return response.data.data
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getCompanyByID = async (id) => {
    try {
        const response = await api.get(`/company/read/${id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchCompany = async (query) => {
    try {
        const response = await api.get('/company/search', { params: { query } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateCompany = async (id, updatedData) => {
    try {
        const response = await api.put(`/company/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteCompany = async (id) => {
    try {
        const response = await api.delete(`/company/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteCompany = async (id) => {
    try {
        const response = await api.delete(`/company/hard/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverCompany = async (companyData) => {
    try {
        const response = await api.post('/company/recover', companyData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};