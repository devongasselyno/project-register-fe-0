import Fetch from '../api'

export const createProvince = async (provinceData) => {
    try {
        const response = await Fetch({ url: '/province/create', payload: provinceData, method: 'POST' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getAllProvinces = async () => {
    try {
        const response = await Fetch({ url: '/province/read', method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getProvinceById = async (provinceId) => {
    try {
        const response = await Fetch({ url: `/province/read/${provinceId}`, method: 'GET' });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const searchProvinces = async (searchParams) => {
 
};

export const updateProvince = async (provinceId, provinceData) => {
try {
    const response = await Fetch({ url: `/province/update/${provinceId}`, payload: provinceData, method: 'PUT' });
    return response.data;
} catch (error) {
    throw new Error(error.response.data.error);
}
};

export const deleteProvince = async (provinceId) => {
try {
    const response = await Fetch({ url: `/province/${provinceId}`, method: 'DELETE' });
    return response.data;
} catch (error) {
    throw new Error(error.response.data.error);
}
};

export const hardDeleteProvince = async (provinceId) => {
try {
    const response = await Fetch({ url: `/province/hard/${provinceId}`, method: 'DELETE' });
    return response.data;
} catch (error) {
    throw new Error(error.response.data.error);
}
};

export const recoverProvince = async (provinceId) => {
try {
    const response = await Fetch({ url: `/province/recover/${provinceId}`, method: 'POST' });
    return response.data;
} catch (error) {
    throw new Error(error.response.data.error);
}
};
