import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllClients } from '../../api/services/Client'
import { getAllCompanies } from '../../api/services/Company'
import { getProject, updateProject } from '../../api/services/Project'

const UpdateProject = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        project_id: '',
        project_name: '',
        manager: '',
        status: '',
        amount: 0,
        kurs: 0,
        total_amount: 0,
        company_id: 0,
        client_id: 0,
        jira: false,
        clockify: false,
        pcs: false,
        pms: false,
    })
    const [clients, setClients] = useState([]);
    const [companies, setCompanies] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        if (name === 'amount' || name === 'kurs' || name === 'total_amount') {
            const formattedValue = newValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: formattedValue,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: newValue,
            }))
        }
    }
      

    const handleSubmit = async (e) => {
        e.preventDefault()

        const amountWithoutDots = String(formData.amount).replace(/\./g, '');
        
        formData.amount = parseInt(amountWithoutDots);
        formData.client_id = parseInt(formData.client_id)
        formData.company_id = parseInt(formData.company_id)

        console.log("formData:", formData)
        try {
            await updateProject(id, formData)
            navigate(`/project/read/${id}`);
        } catch (error) {
            console.error('Failed to update project: ', error)
        }
    }

    useEffect(() => {
        const fetchproject = async () => {
            try {
                const response = await getProject(id)
                const projectData = response
        
                console.log("project data", projectData)
                setFormData({
                    project_id: projectData.ID|| '',
                    project_name: projectData.project_name || '',
                    manager: projectData.manager || '',
                    status: projectData.status || '',
                    amount: projectData.amount || 0,
                    company_id: projectData.company_id || 0,
                    client_id: projectData.client_id || 0,
                    jira: projectData.jira || false,
                    clockify: projectData.clockify || false,
                    pcs: projectData.pcs || false,
                    pms: projectData.pms || false,
                })
        
                setLoading(false)
            } catch (error) {
                console.error('Failed to fetch project: ', error)
            }
        }
    
        fetchproject()
    }, [id])

    const fetchDropdownData = async () => {
        try {
            const clientsResponse = await getAllClients()
            const companiesResponse = await getAllCompanies()
        
            setClients(clientsResponse)
            setCompanies(companiesResponse)
        } catch (error) {
            console.error('Failed to fetch dropdown data:', error)
        }
    }

    useEffect(() => {
        fetchDropdownData()
    }, [])

    const currencyOptions = [
        { code: 'USD', symbol: '$' },
        { code: 'IDR', symbol: 'Rp.' },
        { code: 'CNY', symbol: '¥' },
    ];

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        setSelectedCurrency(selectedCurrency);
      
        if (selectedCurrency === 'IDR') {
          setFormData((prevData) => ({
            ...prevData,
            kurs: '',
            total_amount: '',
          }));
        }
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [formData.kurs, formData.amount]);
      
    const calculateTotalAmount = () => {
        const { amount, kurs } = formData;
        if (amount && kurs) {
            const kursWithoutDots = parseInt(kurs.replace(/\./g, '').replace(/,/g, '.'));

            console.log("kurs", kursWithoutDots)
            const totalAmount = parseInt(amount) * kursWithoutDots
            
            setFormData((prevData) => ({ ...prevData, total_amount: totalAmount }));
        } else {
            setFormData((prevData) => ({ ...prevData, total_amount: '' }));
        }
    };

    const [selectedCurrency, setSelectedCurrency] = useState('')
      
    return (
        <div className='mt-10 mb-20 mx-auto max-w-xl flex-col items-center'>
            <h1 className='text-3xl leading-8 font-bold py-5'>Update Project</h1>

            <form onSubmit={handleSubmit}>
                <div className='pb-2'>
                    <label htmlFor="project_name" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Project Name</label>
                    <input id='project_name' name='project_name' type="text" value={formData.project_name}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.project_name && <p className="text-red-500">{errors.project_name}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="manager" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Manager</label>
                    <input id='manager' name='manager' type="text" value={formData.manager}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.manager && <p className="text-red-500">{errors.manager}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="status" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Status</label>
                    <input id='status' name='status' type="text" value={formData.status}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.status && <p className="text-red-500">{errors.status}</p>}
                </div>

                <div className='pb-2 flex gap-3'>
                    <div>
                        <label htmlFor="Currency" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Currency</label>
                            <div className='flex items-center gap-2'>
                            <select
                                id="currency"
                                name="currency"
                                value={selectedCurrency}
                                onChange={handleCurrencyChange}
                                className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700'
                            >
                                <option value="">Select a currency</option>
                                {currencyOptions.map((currency) => (
                                    <option key={currency.code} value={currency.code}>
                                       {currency.code}
                                    </option>
                                ))}
                                </select>
                            </div>
                        {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                    </div>
                    <div>
                        <label htmlFor="amount" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Amount</label>
                            <div className='flex items-center gap-2'>
                            <span>{currencyOptions.find((currency) => currency.code === selectedCurrency)?.symbol}</span>
                                <input id='amount' name='amount' type="text" value={formData.amount.toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 0 }).replace(/,/g, '.')}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>   
                            </div>
                        {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                    </div>
                    {selectedCurrency !== 'IDR' && selectedCurrency !== '' && (
                    <div>
                        <label htmlFor="kurs" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Kurs</label>
                        <div className='flex items-center gap-2'>
                            <input id='kurs' name='kurs' type="text" value={formData.kurs} onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>   
                        </div>
                        {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                    </div>
                    )}

                    {selectedCurrency !== 'IDR' && selectedCurrency !== '' && (
                    <div>
                        <label htmlFor="total_amount" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Total Amount (IDR)</label>
                        <div className='flex items-center gap-2'>
                            <span>Rp. </span>
                            <input id='total_amount' name='total_amount' type="text" value={(formData.total_amount || 0).toLocaleString('en-US', {useGrouping: true,minimumFractionDigits: 0,}).replace(/,/g, '.')} onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>   
                        </div>
                        {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                    </div>
                    )}


                </div>

                <div className='pb-2'>
                    <label htmlFor="company_id" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Company</label>
                    <select
                        id='company_id'
                        name='company_id'
                        value={formData.company_id}
                        onChange={handleChange}
                        className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'
                    >
                        <option value=''>Select a company</option>
                        {companies.map((company) => (
                        <option key={company.ID} value={String(company.ID)}>
                            {company.company_name}
                        </option>
                        ))}
                    </select>
                    {errors.company_id && <p className="text-red-500">{errors.company_id}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="client_id" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Client</label>
                    <select
                        id='client_id'
                        name='client_id'
                        value={formData.client_id}
                        onChange={handleChange}
                        className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'
                    >
                        <option value=''>Select a client</option>
                        {clients.map((client) => (
                        <option key={client.ID} value={String(client.ID)}>
                            {client.client_name}
                        </option>
                        ))}
                    </select>
                    {errors.client_id && <p className="text-red-500">{errors.client_id}</p>}
                </div>             

                <div className='flex justify-between'>
                    <div className='pb-2 flex items-center gap-2'>
                        <input id='jira' name='jira' type="checkbox" checked={formData.jira} onChange={handleChange} className='w-4 h-4 bg-gray-100 border border-zinc-400 text-orange-600 text-sm rounded focus:ring-orange-700 focus:border-orange-700'/>
                        <label htmlFor="jira" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Jira</label>
                        {errors.jira && <p className="text-red-500">{errors.jira}</p>}
                    </div>

                    <div className='pb-2 flex items-center gap-2'>
                        <input id='clockify' name='clockify' type="checkbox" checked={formData.clockify} onChange={handleChange} className='w-4 h-4 bg-gray-100 border border-zinc-400 text-orange-600 text-sm rounded focus:ring-orange-700 focus:border-orange-700'/>
                        <label htmlFor="clockify" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Clockify</label>
                        {errors.clockify && <p className="text-red-500">{errors.clockify}</p>}
                    </div>

                    <div className='pb-2 flex items-center gap-2'>
                        <input id='pcs' name='pcs' type="checkbox" checked={formData.pcs} onChange={handleChange} onClick={() => console.log("valueeee", formData.pcs)} className='w-4 h-4 bg-gray-100 border border-zinc-400 text-orange-600 text-sm rounded focus:ring-orange-700 focus:border-orange-700'/>
                        <label htmlFor="pcs" className='block text-sm font-medium leading-6 text-gray-900 py-1'>PCS</label>
                        {errors.pcs && <p className="text-red-500">{errors.pcs}</p>}
                    </div>

                    <div className='pb-2 flex items-center gap-2'>
                        <input id='pms' name='pms' type="checkbox" checked={formData.pms} onChange={handleChange} className='w-4 h-4 bg-gray-100 border border-zinc-400 text-orange-600 text-sm rounded focus:ring-orange-700 focus:border-orange-700'/>
                        <label htmlFor="pms" className='block text-sm font-medium leading-6 text-gray-900 py-1'>PMS</label>
                        {errors.pms && <p className="text-red-500">{errors.pms}</p>}
                    </div>
                </div>
                
                <button type="submit" className='py-2 px-4 border float-right border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'>Update Project</button>
            </form>
        </div>
    )
}

export default UpdateProject
