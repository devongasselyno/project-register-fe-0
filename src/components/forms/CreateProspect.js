import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/api'
import { createProspect } from '../../api/services/Prospect';

const CreateProspect = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState(0);
    const [manager, setManager] = useState('');
    const [status, setStatus] = useState('');
    const [amount, setAmount] = useState(0);
    const [company, setCompany] = useState(0);
    const [client, setClient] = useState(0);
    const [jira, setJira] = useState(false);
    const [clockify, setClockify] = useState(false);
    const [pms, setPMS] = useState(false);
    const [pcs, setPCS] = useState(false);
    const [types, setTypes] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [clients, setClients] = useState([]);
    const [errors, setErrors] = useState({});

    const notify = () => {
        toast.success('Prospect Created!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const breakpoints = [
        { width: 1600, ratio: 2 / 5 },
        { width: 1200, ratio: 1 / 2 },
        { width: 1000, ratio: 2 / 3 },
        { width: 800, ratio: 3 / 4 },
        { width: 600, ratio: 4 / 5 },
    ];

    const [width, setWidth] = useState(getWidth(window.innerWidth));

    function getWidth(windowWidth) {
        const breakpoint = breakpoints.find((bp) => windowWidth > bp.width);
        return breakpoint ? windowWidth * breakpoint.ratio : windowWidth;
    }

    useEffect(() => {
        const handleResize = () => {
            const newWidth = getWidth(window.innerWidth);
            setWidth(newWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Prospect Name is required';
        }

        if (year === 0) {
            errors.year = 'Year is required';
        } else if (!/^\d{4}$/.test(year)) {
            errors.year = 'Year must be a valid four-digit number';
        }

        if (!manager.trim()) {
            errors.manager = 'Manager is required';
        }

        if (!status.trim()) {
            errors.status = 'Status is required';
        }

        if (amount === 0) {
            errors.amount = 'Amount is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
            errors.amount = 'Amount must be a valid number with up to 2 decimal places';
        }

        if (company === 0) {
            errors.company = 'Please select a Company';
        }

        if (client === 0) {
            errors.client = 'Please select a Client';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await api.get('/company/read');
                setCompanies(response.data);
            } catch (error) {
                console.error('Failed to fetch companies:', error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await api.get('/client/read', {
                    params: {
                        limit: 100,
                    },
                });
                setClients(response.data);
            } catch (error) {
                console.error('Failed to fetch clients:', error);
            }
        };

        const fetchTypes = async () => {
            try {
                const response = await api.get('/type/read');
                setTypes(response.data)
            } catch (error) {
                console.error('Failed to fetch types:', error);
            }
        };

        fetchCompanies();
        fetchClients();
        fetchTypes();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            const data = {
                prospect_name: name,
                year: year,
                manager: manager,
                status: status,
                amount: amount,
                company_id: company,
                client_id: client,
                jira: jira,
                clockify: clockify,
                pcs: pcs,
                pms: pms,
            };

            try {
                const response = await createProspect(data)
                console.log('Data sent successfully:', response.data);
                notify();
                setName('');
                setYear(0);
                setManager('');
                setStatus('');
                setAmount(0);
                setCompany(0);
                setClient(0);
                setJira(false);
                setClockify(false);
                setPMS(false);
                setPCS(false);
            } catch (error) {
                console.error('Failed to send data:', error);
            }
        }


    };

    return (
        <section className="flex flex-col justify-center content-center py-5">
            <div className="max-w-full items-center justify-center flex">
                {/* <div className="pb-3 w-1/2 rounded-2xl px-5 py-3"> */}
                <div className={"pb-3 rounded-2xl px-5 py-3"}
                    style={{ width: `${width}px`, userSelect: 'none' }}
                >
                    <div className="px-7 py-1 text-center">
                        <h2 className="text-xl py-2 font-semibold leading-7 text-gray-900">Create new prospect</h2>
                        <p className="text-base leading-6 text-gray-600">
                            Please insert data for the new prospect.
                        </p>
                    </div>
                    <div className="px-6 py-4 justify-center">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Prospect Name</label>
                            <input type="text" autoComplete='off' className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="name" value={name} onChange={(e) => {
                                console.log('Prospect Name:', e.target.value);
                                setName(e.target.value);
                            }} placeholder='Insert Prospect Name' />
                            {errors.name && <p className="text-red-500 text-sm pt-1 pl-1">{errors.name}</p>}

                            <label htmlFor="manager" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Prospect Manager</label>
                            <input type="text" autoComplete='off' className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="manager" value={manager} onChange={(e) => {
                                console.log('Manager Name:', e.target.value);
                                setManager(e.target.value);
                            }} placeholder='Insert Prospect Manager' />
                            {errors.manager && <p className="text-red-500 text-sm pt-1 pl-1">{errors.manager}</p>}

                            <div className="flex gap-4">
                                <div className="w-1/2 max-w-full">
                                    <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                        Year
                                    </label>
                                    <select
                                        type="text"
                                        inputMode="numeric"
                                        id="year"
                                        className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                        value={year}
                                        onChange={(e) => {
                                            const year = parseInt(e.target.value, 10);
                                            console.log('Year:', year);
                                            setYear(year);
                                        }}
                                    >
                                        <option value="">Select Year</option>
                                        {Array.from({ length: 10 }, (_, index) => {
                                            const currentYear = new Date().getFullYear();
                                            const yearValue = currentYear - index;
                                            return (
                                                <option key={yearValue} value={yearValue}>
                                                    {yearValue}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.year && <p className="text-red-500 text-sm pt-1 pl-1">{errors.year}</p>}
                                </div>

                                <div className="w-1/2 max-w-full">
                                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                        value={status}
                                        onChange={(e) => {
                                            console.log('Status:', e.target.value);
                                            setStatus(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Open">Open</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm pt-1 pl-1">{errors.status}</p>}
                                </div>
                            </div>

                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Amount</label>
                            <input
                                type="text"
                                autoComplete='off'
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5 appearance-none"
                                id="amount"
                                value={amount || ''}
                                onChange={(e) => {
                                    const amount = parseFloat(e.target.value);
                                    console.log('Amount:', amount);
                                    setAmount(amount);
                                }}
                                placeholder='Insert Amount'
                            />
                            {errors.amount && <p className="text-red-500 text-sm pt-1 pl-1">{errors.amount}</p>}

                            {/* <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Type</label>
                            <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="type" value={type} onChange={(e) => {
                                const selectedTypeId = parseInt(e.target.value, 10);
                                console.log('Type:', selectedTypeId);
                                setType(selectedTypeId);
                            }}>
                                <option value="">Select Type</option>
                                {Array.isArray(types.data) &&
                                    types.data.map((type) => (
                                        <option key={type.ID} value={type.ID}>
                                            {type.project_name}
                                        </option>
                                    ))}
                            </select>
                            {errors.type && <p className="text-red-500 text-sm pt-1 pl-1">{errors.type}</p>} */}
                            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Company</label>
                            <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="company" value={company} onChange={(e) => {
                                const selectedCompanyId = parseInt(e.target.value, 10);
                                console.log('Company:', selectedCompanyId);
                                setCompany(selectedCompanyId);
                            }}>
                                <option value="">Select Company</option>
                                {Array.isArray(companies.data) &&
                                    companies.data.map((company) => (
                                        <option key={company.ID} value={company.ID}>
                                            {company.company_name}
                                        </option>
                                    ))}
                            </select>
                            {errors.company && <p className="text-red-500 text-sm pt-1 pl-1">{errors.company}</p>}


                            <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Client</label>
                            <select
                                id="client"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                value={client}
                                onChange={(e) => {
                                    const selectedClientId = parseInt(e.target.value, 10);
                                    console.log('Client:', selectedClientId);
                                    setClient(selectedClientId);
                                }}
                                >
                                <option value="">Select Client</option>
                                {Array.isArray(clients.data)
                                    ? clients.data
                                        .sort((a, b) => a.client_name.localeCompare(b.client_name)) // Sort the array by client_name
                                        .map((client) => (
                                        <option key={client.ID} value={client.ID}>
                                            {client.client_name}
                                        </option>
                                        ))
                                    : null}
                                </select>
                            {errors.client && <p className="text-red-500 text-sm pt-1 pl-1">{errors.client}</p>}


                            <div className="flex flex-wrap gap-4 mx-auto my-3 px-1 py-1 justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="jira"
                                        className="w-5 h-5 text-red-800 bg-gray-100 border-zinc-400 rounded focus:ring-0"
                                        checked={jira}
                                        onChange={(e) => {
                                            console.log('Jira:', e.target.checked);
                                            setJira(e.target.checked);
                                        }}
                                    />
                                    <label htmlFor="jira" className="text-sm font-medium leading-6 text-gray-900 pl-2">
                                        Jira
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="clockify"
                                        className="w-5 h-5 text-red-800 bg-gray-100 border-zinc-400 rounded focus:ring-0"
                                        checked={clockify}
                                        onChange={(e) => {
                                            console.log('Clockify:', e.target.checked);
                                            setClockify(e.target.checked);
                                        }}
                                    />
                                    <label htmlFor="clockify" className="text-sm font-medium leading-6 text-gray-900 pl-2">
                                        Clockify
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="pms"
                                        className="w-5 h-5 text-red-800 bg-gray-100 border-zinc-400 rounded focus:ring-0"
                                        checked={pms}
                                        onChange={(e) => {
                                            console.log('PMS:', e.target.checked);
                                            setPMS(e.target.checked);
                                        }}
                                    />
                                    <label htmlFor="pms" className="text-sm font-medium leading-6 text-gray-900 pl-2">
                                        PMS
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="pcs"
                                        className="w-5 h-5 text-red-800 bg-gray-100 border-zinc-400 rounded focus:ring-0"
                                        checked={pcs}
                                        onChange={(e) => {
                                            console.log('PCS:', e.target.checked);
                                            setPCS(e.target.checked);
                                        }}
                                    />
                                    <label htmlFor="pcs" className="text-sm font-medium leading-6 text-gray-900 pl-2">
                                        PCS
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="w-full mt-2 bg-red-800 text-white text-base text-bold py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Submit</button>
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

export default CreateProspect