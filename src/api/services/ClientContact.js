import api from '../api'

export const createClientContact = async (clientContactData) => {
    try {
        const response = await api.post('/clientcontact/create', clientContactData);
        console.log("clientcontact", response.data.data)
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllClientContacts = async () => {
    try {
        const response = await api.get('/clientcontact/read');
        return response
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
  