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

    // useEffect(() => {
    //     const fetchCompanies = async () => {
    //         try {
    //             const response = await axios.get('/company/read');
    //             setCompanies(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch companies:', error);
    //         }
    //     };

    //     const fetchClients = async () => {
    //         try {
    //             const response = await axios.get('/client/read');
    //             setClients(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch clients:', error);
    //         }
    //     };

    //     const fetchTypes = async () => {
    //         try {
    //             const response = await axios.get('/type/read');
    //             setTypes(response.data)
    //         } catch (error) {
    //             console.error('Failed to fetch types:', error);
    //         }
    //     };

    //     fetchCompanies();
    //     fetchClients();
    //     fetchTypes();
    // }, []);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await api.get('/company/read');
                // const formattedCompanies = response.data.map(company => ({
                //     id: company.ID,
                //     name: company.company_name
                // }));
                setCompanies(response.data);
            } catch (error) {
                console.error('Failed to fetch companies:', error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await api.get('/client/read');
                // const formattedClients = response.data.map(client => ({
                //     id: client.ID,
                //     name: client.client_name
                // }));
                setClients(response.data);
            } catch (error) {
                console.error('Failed to fetch clients:', error);
            }
        };

        const fetchTypes = async () => {
            try {
                const response = await api.get('/type/read');
                // const formattedTypes = response.data.map(type => ({
                //     id: type.ID,
                //     name: type.project_name
                // }));
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
        // <form onSubmit={handleSubmit}>
        //     <label htmlFor="name">Prospect Name</label>
        //     <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        //     <label htmlFor="type">Type</label>
        //     {/* <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        //         <option value="">Select Type</option>
        //     </select> */}

        //     <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        //         <option value="">Select Type</option>
        //         {Array.isArray(types.data) &&
        //             types.data.map((type) => (
        //                 <option key={type.ID} value={type.ID}>
        //                     {type.project_name}
        //                 </option>
        //             ))}
        //     </select>
        //     <label htmlFor="year">Year</label>
        //     <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} />

        //     <label htmlFor="manager">Manager</label>
        //     <input type="text" id="manager" value={manager} onChange={(e) => setManager(e.target.value)} />

        //     <label htmlFor="status">Status</label>
        //     <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />

        //     <label htmlFor="amount">Amount</label>
        //     <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

        //     <label htmlFor="company">Company</label>
        //     <select id="company" value={company} onChange={(e) => setCompany(e.target.value)}>
        //         <option value="">Select Company</option>
        //         {Array.isArray(companies.data) &&
        //             companies.data.map((company) => (
        //                 <option key={company.id} value={company.id}>
        //                     {company.name}
        //                 </option>
        //             ))}
        //     </select>

        //     <label htmlFor="client">Client</label>
        //     <select id="client" value={client.data} onChange={(e) => setClient(e.target.value)}>
        //         <option value="">Select Client</option>
        //         {Array.isArray(clients.data) &&
        //             clients.data.map((client) => (
        //                 <option key={client.id} value={client.id}>
        //                     {client.name}
        //                 </option>
        //             ))}
        //     </select>

        //     <label htmlFor="jira">Jira</label>
        //     <input type="checkbox" id="jira" checked={jira} onChange={(e) => setJira(e.target.checked)} />

        //     <label htmlFor="clockify">Clockify</label>
        //     <input type="checkbox" id="clockify" checked={clockify} onChange={(e) => setClockify(e.target.checked)} />

        //     <label htmlFor="pms">PMS</label>
        //     <input type="checkbox" id="pms" checked={pms} onChange={(e) => setPMS(e.target.checked)} />

        //     <label htmlFor="pcs">PCS</label>
        //     <input type="checkbox" id="pcs" checked={pcs} onChange={(e) => setPCS(e.target.checked)} />

        //     <button type="submit">Submit</button>
        // </form>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Prospect Name</label>
            <input type="text" id="name" value={name} onChange={(e) => {
                console.log('Prospect Name:', e.target.value);
                setName(e.target.value);
            }} />



            <label htmlFor="year">Year</label>
            <input type="number" id="year" value={year} onChange={(e) => {
                const year = parseInt(e.target.value, 10);
                console.log('Year:', year);
                setYear(year);
            }} />

            <label htmlFor="manager">Manager</label>
            <input type="text" id="manager" value={manager} onChange={(e) => {
                console.log('Manager:', e.target.value);
                setManager(e.target.value);
            }} />

            <label htmlFor="status">Status</label>
            <input type="text" id="status" value={status} onChange={(e) => {
                console.log('Status:', e.target.value);
                setStatus(e.target.value);
            }} />

            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={(e) => {
                const amount = parseFloat(e.target.value)
                console.log('Amount:', amount);
                setAmount(amount);
            }} />
            <label htmlFor="type">Type</label>
            <select type="number" id="type" value={type} onChange={(e) => {
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
            <label htmlFor="company">Company</label>
            <select type="number" id="company" value={company} onChange={(e) => {
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

            <label htmlFor="client">Client</label>
            <select id="client" value={client.data} onChange={(e) => {
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

            <label htmlFor="jira">Jira</label>
            <input type="checkbox" id="jira" checked={jira} onChange={(e) => {
                console.log('Jira:', e.target.checked);
                setJira(e.target.checked);
            }} />

            <label htmlFor="clockify">Clockify</label>
            <input type="checkbox" id="clockify" checked={clockify} onChange={(e) => {
                console.log('Clockify:', e.target.checked);
                setClockify(e.target.checked);
            }} />

            <label htmlFor="pms">PMS</label>
            <input type="checkbox" id="pms" checked={pms} onChange={(e) => {
                console.log('PMS:', e.target.checked);
                setPMS(e.target.checked);
            }} />

            <label htmlFor="pcs">PCS</label>
            <input type="checkbox" id="pcs" checked={pcs} onChange={(e) => {
                console.log('PCS:', e.target.checked);
                setPCS(e.target.checked);
            }} />

            <button type="submit">Submit</button>

        </form>
    )
}

export default CreateProspect