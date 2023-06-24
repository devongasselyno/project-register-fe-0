import api from '../api'

export const createProject = async (projectData) => {
    try {
        const response = await api.post('model/project/create', projectData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllProjects = async () => {
    try {
        const response = await api.get('model/project/read');
        return response.data.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getProject = async (projectId) => {
    try {
        const response = await api.get(`model/project/read/${projectId}`);
        return response.data.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateProject = async (projectId, projectData) => {
    try {
        const response = await api.patch(`model/project/update/${projectId}`, projectData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteProject = async (projectId) => {
    try {
        const response = await api.delete(`model/project/delete/${projectId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteProject = async (projectId) => {
    try {
        const response = await api.delete(`model/project/hard/${projectId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const convertToProject = async (projectId) => {
    try {
        const response = await api.post(`model/project/convert/${projectId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverProject = async (projectId) => {
    try {
        const response = await api.post(`model/project/recover/${projectId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchProjects = async (searchParams) => {
    try {
        const response = await api.get('model/project/search', { params: searchParams });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const filterAllProjects = async () => {
    try {
        const response = await api.get('model/project/filter');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
