import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateClient = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [client, setClient] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
            client_code: '',
            client_name: '',
            alias: '',
            website: '',
            social_presence: {
                linkedin: '',
                facebook: '',
                twitter: '',
                github: '',
                other: []
            },
            subsidiary: {
                subsidiaries: [],
                immidiate_parents: [],
                ultimate_parents: []
            }
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
            navigate(`/client/read/${id}`);
        } catch (error) {
            console.error('Failed to update client: ', error)
        }
    }

    useEffect(() => {
        const fetchClient = async () => {
        try {
                const response = await axios.get(`http://localhost:8080/api/client/read/${id}`)
                setClient(response.data.data)
                // console.log("clientt", response.data.data.client_social_presence.linkedin)
                setFormData({
                    client_code: response.data.data.client_code || '',
                    client_name: response.data.data.client_name || '',
                    alias: response.data.data.alias || '',
                    website: response.data.data.website || '',
                    social_presence: {
                        linkedin: response.data.data.client_social_presence.linkedin || '',
                        facebook: response.data.data.client_social_presence.facebook || '',
                        twitter: response.data.data.client_social_presence.twitter || '',
                        github: response.data.data.client_social_presence.github || '',
                        other: response.data.data.client_social_presence.other || []
                    },
                    subsidiary: {
                        subsidiaries: response.data.data.subsidiary.subsidiaries || [],
                        immidiate_parents: response.data.data.subsidiary.immidiate_parents || [],
                        ultimate_parents: response.data.data.subsidiary.ultimate_parents || []
                    }
                })
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch client: ', error)
            }
        }
    
        fetchClient()
    }, [id])

    return (
        <div className='py-10 mx-auto max-w-xl flex-col items-center'>
            <h1 className='text-3xl leading-8 font-bold py-5'>Update Client</h1>

            <form onSubmit={handleSubmit}>
                <div className='pb-2'>
                    <label htmlFor="client_name" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Client Name</label>
                    <input id='client_name' name='client_name' type="text" placeholder={formData.client_name} value={formData.client_name}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.client_name && <p className="text-red-500">{errors.client_name}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="client_code" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Client Code</label>
                    <input id='client_code' name='client_code' type="text" placeholder={formData.client_code} value={formData.client_code}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.client_name && <p className="text-red-500">{errors.client_code}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="alias" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Alias</label>
                    <input id='alias' name='alias' type="text" placeholder={formData.alias} value={formData.alias}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.alias && <p className="text-red-500">{errors.alias}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="website" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Website</label>
                    <input id='website' name='website' type="text" placeholder={formData.website} value={formData.website}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.website && <p className="text-red-500">{errors.website}</p>}
                </div>


                <h1 className='text-xl font-bold py-5'>Client Social Presence</h1>
                <div className='pb-2'>
                    <label htmlFor="linkedin" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Linkedin</label>
                    <input id='linkedin' name='linkedin' type="text" placeholder={formData.social_presence.linkedin} value={formData.social_presence.linkedin}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.linkedin && <p className="text-red-500">{errors.linkedin}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="facebook" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Website</label>
                    <input id='facebook' name='facebook' type="text" placeholder={formData.social_presence.facebook} value={formData.social_presence.facebook}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.facebook && <p className="text-red-500">{errors.facebook}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="github" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Github</label>
                    <input id='github' name='github' type="text" placeholder={formData.social_presence.github} value={formData.social_presence.github}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.github && <p className="text-red-500">{errors.github}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="other" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Other Social Media</label>
                    <input id='other' name='other' type="text" placeholder={formData.social_presence.other} value={formData.social_presence.other}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.other && <p className="text-red-500">{errors.other}</p>}
                </div>

                <h1 className='text-xl font-bold py-5'>Subsidiary</h1>
                <div className='pb-2'>
                    <label htmlFor="subsidiaries" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Other Social Media</label>
                    <input id='github' name='github' type="text" placeholder={formData.subsidiary.subsidiaries} value={formData.subsidiary.subsidiaries}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.subsidiaries && <p className="text-red-500">{errors.subsidiaries}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="immidiate_parents" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Immediate Parents</label>
                    <input id='github' name='github' type="text" placeholder={formData.subsidiary.immidiate_parents} value={formData.subsidiary.immidiate_parents}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.immidiate_parents && <p className="text-red-500">{errors.immidiate_parents}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="ultimate_parents" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Ultimate Parents</label>
                    <input id='github' name='github' type="text" placeholder={formData.subsidiary.ultimate_parents} value={formData.subsidiary.ultimate_parents}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.ultimate_parents && <p className="text-red-500">{errors.ultimate_parents}</p>}
                </div>

                <button type='submit' className='float-right my-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateClient