import Fetch from '../api';

export const createType = async (typeData) => {
    try {
        const response = await Fetch({url: '/type/create', payload: typeData, method: 'POST'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllProjectTypes = async () => {
    try {
        const response = await Fetch({url: '/type/read', method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getProjectTypeByID = async (typeId) => {
    try {
        const response = await Fetch({url: `/type/read/${typeId}`, method:'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchProjectType = async (searchParams) => {
    try {
        const response = await Fetch({url: '/type/search',  params: searchParams , method:'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateProjectType = async (typeId, typeData) => {
    try {
        const response = await Fetch({url:`/type/update/${typeId}`, payload: typeData, method:'PATCH'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteProjectType = async (typeId) => {
    try {
        const response = await Fetch({url:`/type/${typeId}`, method:'DELETE'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteProjectType = async (typeId) => {
    try {
        const response = await Fetch({url:`/type/hard/${typeId}`, method:'DELETE'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverProjectType = async (typeId) => {
    try {
        const response = await Fetch({url:`/type/recover/${typeId}`, method:'PATCH'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
