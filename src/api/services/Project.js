import HandleApiCall from "../HandleApiCall";

const { fetch } = HandleApiCall()

export const createProject = async (projectData) => {
    try {
        const response = await fetch({ url: 'model/project/create', payload: projectData, method: 'POST' });
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllProjects = async () => {
    try {
        const response = fetch({ url: 'model/project/read', method: 'GET' })
        return response
    } catch (error) {
        throw new Error(error.response.data.error)    
    }
}

export const getProject = async (projectId) => {
    try {
        const response = fetch({url:`model/project/read/${projectId}`, method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const updateProject = async (projectId, projectData) => {
    try {
        const response = await fetch({ url: `model/project/update/${projectId}`, payload: projectData, method: 'PATCH' });
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteProject = async (projectId) => {
    try {
        const response = await fetch.delete({ url: `model/project/delete/${projectId}`, method: 'PATCH' });
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const hardDeleteProject = async (projectId) => {
    try {
        const response = await fetch(`model/project/hard/${projectId}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const convertToProject = async (projectId) => {
    try {
        const response = await fetch(`model/project/convert/${projectId}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const recoverProject = async (projectId) => {
    try {
        const response = await fetch(`model/project/recover/${projectId}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchProjects = async (searchParams) => {
    try {
        const response = await fetch('model/project/search', { params: searchParams });
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const filterAllProjects = async () => {
    try {
        const response = await fetch('model/project/filter');
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
