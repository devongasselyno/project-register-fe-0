import Fetch from '../api'

export const createContact = async (contactData) => {
    try {
        const response = await Fetch({url: '/contact/create', payload: contactData, method: 'POST'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const getLatestContact = async () => {
    try {
        const response = await Fetch({url: '/contact/latest', method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const getAllContacts = async () => {
    try {
        const response = await Fetch({url:'/contact/read', method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const getContactById = async (id) => {
    try {
        const response = await Fetch({url: `/contact/read/${id}`, method: 'GET'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const updateContact = async (id, updatedData) => {
    try {
        const response = await Fetch({url: `/contact/update/${id}`, payload: updatedData, method: 'PATCH'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const softDeleteContact = async (id) => {
    try {
        const response = await Fetch.delete({url: `/contact/delete/soft/${id}`, method: 'DELETE'});
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getLocationByContactID = async (id) => {
    try {
        const response = await Fetch.get({url: `/contact/locations/${id}`, method: 'DELETE'})
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};