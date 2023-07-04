import Fetch from '../api'

export const createCompany = async (companyData) => {
    try {
        const response = await Fetch({url: '/company/create', payload: companyData, method:'POST'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllCompanies = async () => {
    try {
        const response = await Fetch({url:'/company/read', method:'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getCompanyByID = async (id) => {
    try {
        const response = await Fetch({url: `/company/read/${id}`, method:'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchCompany = async (query) => {
    try {
        const response = await Fetch('/company/search', { params: { query } });
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateCompany = async (id, updatedData) => {
    try {
        const response = await Fetch(`/company/${id}`, updatedData);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteCompany = async (id) => {
    try {
        const response = await Fetch(`/company/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteCompany = async (id) => {
    try {
        const response = await Fetch(`/company/hard/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverCompany = async (companyData) => {
    try {
        const response = await Fetch('/company/recover', companyData);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};