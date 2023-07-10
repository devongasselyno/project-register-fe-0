// import React from 'react';
import { useNavigate } from 'react-router-dom';
import instance from './api';

const HandleApiCall = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const fetch = async (props) => {
        const { method, payload, url } = props;

        if (!token) {
            sessionStorage.removeItem('token');
            navigate('/login');
            return;
        }

        try {
            let response;

            if (method === 'POST') {
                response = await instance.post(url, payload);
            } else if (method === 'GET') {
                response = await instance.get(url);
            } else if (method === 'PATCH') {
                response = await instance.patch(url, payload);
            } else if (method === 'DELETE') {
                response = await instance.delete(url);
            }

            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                sessionStorage.removeItem('token');
                navigate('/login');
                throw new Error('Unauthorized access');
            }
            throw error;
        }
    };

    return { fetch };
};

export default HandleApiCall;