import React, { useState, useEffect } from 'react'
import api from '../api/posts';

const CreateProspect = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState(0);
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

        const data = {
            prospect_name: name,
            type_id: type,
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

        console.log(data)

        try {
            const response = await api.post('/prospect/create', data);
            console.log('Data sent successfully:', response.data);
            setName('');
            setType(0);
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
    };

    return (
        <section className="flex flex-col justify-center py-20">
            <div className="max-w-full mx-12 items-center justify-center flex">
                <div className="pb-3 w-1/2 rounded-2xl px-5 py-3">
                    <div className="px-7 py-1 text-center">
                        <h2 className="text-xl py-2 font-semibold leading-7 text-gray-900">Create new prospect</h2>
                        <p className="text-base leading-6 text-gray-600">
                            Please insert data for the new prospect.
                        </p>
                    </div>
                    <div className="px-6 py-4 justify-center">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Prospect Name</label>
                            <input type="text" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="name" value={name} onChange={(e) => {
                                console.log('Prospect Name:', e.target.value);
                                setName(e.target.value);
                            }} />

                            <div className="flex gap-4">
                                <div className="w-1/2 max-w-full">
                                    <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                        Year
                                    </label>
                                    <select
                                        id="year"
                                        className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
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
                                </div>

                                <div className="w-1/2 max-w-full">
                                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                        value={status}
                                        onChange={(e) => {
                                            console.log('Status:', e.target.value);
                                            setStatus(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Amount</label>
                            <input
                                type="number"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5 appearance-none"
                                id="amount"
                                value={amount}
                                onChange={(e) => {
                                    const amount = parseFloat(e.target.value);
                                    console.log('Amount:', amount);
                                    setAmount(amount);
                                }}
                            />
                            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Type</label>
                            <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="type" value={type} onChange={(e) => {
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
                            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Company</label>
                            <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" id="company" value={company} onChange={(e) => {
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

                            <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">Client</label>
                            <select id="client" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" value={client} onChange={(e) => {
                                const selectedClientId = parseInt(e.target.value, 10);
                                console.log('Client:', selectedClientId);
                                setClient(selectedClientId);
                            }}>
                                <option value="">Select Client</option>
                                {Array.isArray(clients.data) &&
                                    clients.data.map((client) => (
                                        <option key={client.ID} value={client.ID}>
                                            {client.client_name}
                                        </option>
                                    ))}
                            </select>

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
        </section>

    )
}

export default CreateProspect