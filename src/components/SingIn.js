import React, { useState } from 'react';
import api from '../api/posts';
import sha512 from 'js-sha512';
import { encode } from 'base64-arraybuffer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const SigninPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = sha512.arrayBuffer(data);
        const encodedHash = encode(hashBuffer);
        try {
            const response = await api.post('/user/login', {
                email,
                password: encodedHash
            });

            if (response.status === 200) {
                console.log('Authentication successful');
            } else if (response.status === 401) {
                setError('Invalid email or password');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred');
            }
        }
    };

    const handleSnackbarClose = () => {
        setError('');
    };

    return (
        <section class="h-screen">
            <div class="container bg-slate-800 h-full px-6 py-24">
                <form onSubmit={handleLogin}>
                    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1">Email:</label>
                                <input id="email" type="text" value={email} onChange={handleEmailChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-1">Password:</label>
                                <input id="password" type="password" value={password} onChange={handlePasswordChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        <button type="submit" onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Sign In</button>
                        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }} >
                            <Alert onClose={handleSnackbarClose} severity="error">
                                {error}
                            </Alert>
                        </Snackbar>
                        {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SigninPage;