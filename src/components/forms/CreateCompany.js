import React, { useState, useEffect } from 'react'
import notify from './CreateProspect'
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api/posts'
import 'react-toastify/dist/ReactToastify.css';

const CreateCompany = () => {

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Company name is required';
        }

        if (!code.trim()) {
            errors.code = 'Company code is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            const data = {
                company_name: name,
                company_code: code,
            };
    
            try {
                const response = await api.post('/company/create', data);
                console.log('Data sent successfully:', response.data);
                setName('');
                setCode('');
                notify();
            } catch (error) {
                console.error('Failed to send data:', error);
            }
        }
    }

    return (
        <section className="flex flex-col justify-center content-center py-5">
            <div className="max-w-full items-center justify-center flex">
                {/* <div className="pb-3 w-1/2 rounded-2xl px-5 py-3"> */}
                <div className={"pb-3 rounded-2xl px-5 py-3"}>
                    <div className="px-7 py-1 text-center">
                        <h2 className="text-xl py-2 font-semibold leading-7 text-gray-900">Create new company</h2>
                        <p className="text-base leading-6 text-gray-600">
                            Please insert data for the new company.
                        </p>
                    </div>
                    <div className="px-6 py-4 justify-center">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Company Name</label>
                            <input type="text" autoComplete='off' className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="name" value={name} onChange={(e) => {
                                console.log('Company Name:', e.target.value);
                                setName(e.target.value);
                            }} placeholder='Insert Company Name' />
                            {errors.name && <p className="text-red-500 text-sm pt-1 pl-1">{errors.name}</p>}

                            <label htmlFor="manager" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Company Code</label>
                            <input type="text" autoComplete='off' className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="code" value={code} onChange={(e) => {
                                console.log('Company Code:', e.target.value);
                                setCode(e.target.value);
                            }} placeholder='Insert Company Code' />
                            {errors.code && <p className="text-red-500 text-sm pt-1 pl-1">{errors.code}</p>}
                            <button type="submit" className="w-full mt-4 bg-red-800 text-white text-base text-bold py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
        </section>
    )
}

export default CreateCompany