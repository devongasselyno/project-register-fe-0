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
            client_social_presence: {
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
        const { name, value } = e.target;
        const updatedFormData = { ...formData }
    
        const propertyNames = name.split('.')
    
        let currentProperty = updatedFormData;
        for (let i = 0; i < propertyNames.length - 1; i++) {
        const propertyName = propertyNames[i]
        currentProperty = currentProperty[propertyName]
        }
        currentProperty[propertyNames[propertyNames.length - 1]] = value
    
        setFormData(updatedFormData);
    }
        

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("formData:", formData)
        try {
            await axios.patch(`http://localhost:8080/api/client/${id}`, formData);
            navigate(`/client/read/${id}`);
        } catch (error) {
            console.error('Failed to update client: ', error)
        }
    }

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/client/read/${id}`);
                const clientData = response.data.data;
                setClient(clientData);
        
                setFormData((prevData) => ({
                ...prevData,
                client_code: clientData.client_code || '',
                client_name: clientData.client_name || '',
                alias: clientData.alias || '',
                website: clientData.website || '',
                client_social_presence: {
                    linkedin: clientData.client_social_presence.linkedin || '',
                    facebook: clientData.client_social_presence.facebook || '',
                    twitter: clientData.client_social_presence.twitter || '',
                    github: clientData.client_social_presence.github || '',
                    other: clientData.client_social_presence.other || [],
                },
                subsidiary: {
                    subsidiaries: clientData.subsidiary.subsidiaries || [],
                    immidiate_parents: clientData.subsidiary.immediate_parents || [],
                    ultimate_parents: clientData.subsidiary.ultimate_parents || [],
                },
                }))
        
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
                    <input id='client_name' name='client_name' type="text" value={formData.client_name}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.client_name && <p className="text-red-500">{errors.client_name}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="client_code" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Client Code</label>
                    <input id='client_code' name='client_code' type="text" value={formData.client_code}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.client_name && <p className="text-red-500">{errors.client_code}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="alias" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Alias</label>
                    <input id='alias' name='alias' type="text" value={formData.alias}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.alias && <p className="text-red-500">{errors.alias}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="website" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Website</label>
                    <input id='website' name='website' type="text" value={formData.website}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.website && <p className="text-red-500">{errors.website}</p>}
                </div>


                <h1 className='text-xl font-bold py-5'>Client Social Presence</h1>
                <div className='pb-2'>
                    <label htmlFor="linkedin" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Linkedin</label>
                    <input id='linkedin' name='client_social_presence.linkedin' type="text" value={formData.client_social_presence.linkedin}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.linkedin && <p className="text-red-500">{errors.linkedin}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="facebook" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Facebook</label>
                    <input id='facebook' name='client_social_presence.facebook' type="text" value={formData.client_social_presence.facebook}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.facebook && <p className="text-red-500">{errors.facebook}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="twitter" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Twitter</label>
                    <input id='twitter' name='client_social_presence.twitter' type="text" value={formData.client_social_presence.twitter}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.twitter && <p className="text-red-500">{errors.twitter}</p>}
                </div>


                <div className='pb-2'>
                    <label htmlFor="github" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Github</label>
                    <input id='github' name='client_social_presence.github' type="text" value={formData.client_social_presence.github}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.github && <p className="text-red-500">{errors.github}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="other" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Other Social Media</label>
                    <input id='other' name='client_social_presence.other' type="text" value={formData.client_social_presence.other}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.other && <p className="text-red-500">{errors.other}</p>}
                </div>

                <h1 className='text-xl font-bold py-5'>Subsidiary</h1>
                <div className='pb-2'>
                    <label htmlFor="subsidiaries" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Subsidiaries</label>
                    <input id='subsidiaries' name='subsidiary.subsidiaries' type="text" value={formData.subsidiary.subsidiaries}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.subsidiaries && <p className="text-red-500">{errors.subsidiaries}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="immidiate_parents" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Immediate Parents</label>
                    <input id='immidiate_parents' name='subsidiary.immidiate_parents' type="text" value={formData.subsidiary.immidiate_parents}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.immidiate_parents && <p className="text-red-500">{errors.immidiate_parents}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="ultimate_parents" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Ultimate Parents</label>
                    <input id='ultimate_parents' name='subsidiary.ultimate_parents' type="text" value={formData.subsidiary.ultimate_parents}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.ultimate_parents && <p className="text-red-500">{errors.ultimate_parents}</p>}
                </div>

                <div className='float-right'>
                    <button onClick={() => navigate(`/client/read/${id}`)} className='my-5 mr-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Cancel</button>
                    <button type='submit' className=' my-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateClient