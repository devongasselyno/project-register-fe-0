import api from '../api';

const login = async (email, password) => {
    try {
        const response = await api.post('/user/login', {
            email,
            password,
        });

        if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem('token', token);

        return true;
        } else if (response.status === 401) {
            console.log('Unauthorized: Invalid email or password');
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.log('Login error:', error);
    }

    return false;
};

const User = {
  // Other API functions for user-related operations...
  login,
};

export default User;
