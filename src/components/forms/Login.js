import React, { useState } from 'react';
import { instance } from '../../api/api'
import sha512 from 'js-sha512';
import { encode } from 'base64-arraybuffer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = sha512.arrayBuffer(data);
        const encodedHash = encode(hashBuffer);

        if (email.length === 0) {
            setEmailError(true);
            return;
        }

        if (password.length === 0) {
            setPasswordError(true);
            return;
        }

        try {
            const response = await instance.post('/user/login', {
                email,
                password: encodedHash
            });

            const token  = response?.data?.token
            
            console.log(token)

            if (response.status === 200) {
                console.log('Authentication successful');
                sessionStorage.setItem('token', token);
                // api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                navigate('/dashboard');
            } else if (response.status === 401) {
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
            console.log(error)
        }
    };

    const handleSnackbarClose = () => {
        setError('');
    };

    return (

        // <section class="min-h-screen flex bg-zinc-900 flex-col justify-center items-center">
        <section className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-neutral-800">
            <div class="container mx-auto h-full px-6 py-24">
                <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 bg-neutral-900 rounded-md">
                    <div className="max-w-md mx-auto p-4">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center mb-6">
                                <img src="soluix.png" className="w-40 h-14 ml-4" alt="Logo" />
                                {/* <h4 className="text-xl font-bold text-slate-100 font-mono">
                                    <Typical
                                        steps={['Hello!', 4000, 'Welcome!', 4000]}
                                        loop={Infinity}
                                        wrapper="p"
                                    />
                                </h4> */}
                            </div>
                        </div>
                        <h1 className="text-slate-100 mb-6 text-center text-2xl font-bold leading-9 tracking-tight">
                            Sign in to your account
                        </h1>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 ml-2 text-base font-medium leading-6 text-white">Email</label>
                            <input id="email" type="text" value={email} onChange={handleEmailChange} className="block w-full rounded-md border-0 py-1.5 bg-zinc-800 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 text-base sm:leading-6" placeholder="Enter your email address" />
                            {emailError && <p className="text-red-500 ml-1 text-sm mt-1">Email cannot be empty</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 ml-2 text-base font-medium leading-6 text-white">Password</label>
                            <input id="password" type="password" value={password} onChange={handlePasswordChange} className="block w-full rounded-md border-0 py-1.5 bg-zinc-800 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 text-base sm:leading-6" placeholder='********' />
                            {passwordError && <p className="text-red-500 ml-1 text-sm mt-1">Password cannot be empty</p>}
                        </div>
                        <button type="submit" onClick={handleLogin} className="w-full bg-red-950 text-white text-base text-bold py-2 px-4 rounded-md hover:bg-orange-900 focus:outline-none mt-4">Sign In</button>
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

export default Login