import api from '../api'

export const createContact = async (contactData) => {
    try {
        const response = await api.post('/contact/create', contactData);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const getLatestContact = async () => {
    try {
        const response = await api.get('/contact/latest');
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const getAllContacts = async () => {
    try {
        const response = await api.get('/contact/read');
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const getContactById = async (id) => {
    try {
        const response = await api.get(`/contact/read/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const updateContact = async (id, updatedData) => {
    try {
        const response = await api.patch(`/contact/update/${id}`, updatedData);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const softDeleteContact = async (id) => {
    try {
        const response = await api.delete(`/contact/delete/soft/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getLocationByContactID = async (id) => {
    try {
        const response = await api.get(`/contact/locations/${id}`);
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};