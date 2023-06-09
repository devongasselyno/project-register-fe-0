import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateClient = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [client, setClient] = useState()
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({

    })

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.put(`http://localhost:8080/api/client/${id}`, formData);
            navigate(`/client/${id}`);
        } catch (error) {
            console.error('Failed to update client: ', error)
        }
    }

    useEffect(() => {
        const fetchClient = async () => {
        try {
                const response = await axios.get(`http://localhost:8080/api/client/${id}`);
                setClient(response.data.data);
                setFormData({
                client_code: response.data.data.client_code || '',
                client_name: response.data.data.client_name || '',
                alias: response.data.data.alias || '',
                website: response.data.data.website || '',
                });
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch client: ', error)
            }
        }
    
        fetchClient()
    }, [id])

    return (
        <div className='py-10 px-20'>
            <h1 className='text-3xl leading-8 font-bold py-5'>Update Client</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="clientCode">Client Code:</label>
                <input
                type="text"
                id="clientCode"
                name="client_code"
                value={formData.client_code}
                onChange={handleChange}
                />
                
                <div className='pb-2'>
                    <label htmlFor="clientName" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job Title</label>
                    <input id='clientName' name='clientName' type="text" placeholder='Job title' value={formData.client_name}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {/* {errors.job_title && <p className="text-red-500">{errors.job_title}</p>} */}
                </div>
            </form>
        </div>
    )
}

export default UpdateClient