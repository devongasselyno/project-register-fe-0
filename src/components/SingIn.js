import React, { useState } from 'react';
import api from '../api/posts';
import sha512 from 'js-sha512';
import { encode } from 'base64-arraybuffer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typical from 'react-typical';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

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
                navigate('/dashboard');
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
        <section class="min-h-screen flex bg-zinc-900 flex-col justify-center items-center bg-gray-700">
            <div class="container mx-auto h-full px-6 py-24">
                <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 bg-stone-900 shadow-lg shadow-zinc-800 rounded-md">
                    <div className="max-w-md mx-auto p-4">
                        <div className="flex flex-col items-center">
                            <img src='soluix.png' className="w-40 h-14 mb-0 ml-6" alt="Logo" />
                            <h4 className="text-xl font-bold text-slate-100 mt-2 mb-4 mt-3 font-mono">
                                <Typical
                                    steps={[
                                        'Hello!',
                                        4000,
                                        'Welcome!',
                                        4000,
                                    ]}
                                    loop={Infinity}
                                    wrapper="p"
                                />
                            </h4>
                            {/* <h1 className="text-2xl font-bold mb-2 text-white font-mono">Sign In</h1> */}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1 text-white font-mono">Email:</label>
                            <input id="email" type="text" value={email} onChange={handleEmailChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1 text-white font-mono">Password:</label>
                            <input id="password" type="password" value={password} onChange={handlePasswordChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white" />
                        </div>
                        <button type="submit" onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none mt-4">Sign In</button>
                        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}>
                            <Alert onClose={handleSnackbarClose} severity="error">
                                {error}
                            </Alert>
                        </Snackbar>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SigninPage;