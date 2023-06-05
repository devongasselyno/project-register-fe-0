import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ClientDetail = () => {
    const { id } = useParams()
    const [client, setClient] = useState({})

    const fetchClient = async () => {
        try {
        const res = await axios.get(`http://localhost:8080/api/client/read/${id}`)
        setClient(res.data.data)
        console.log(client)
        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        fetchClient()
    }, [])

    return (
        <div className='py-10 px-20 grid-flow-row'>
            <p className='text-4xl leading-8 font-bold py-5'>Client Detail</p>

            <div className='flex'>
                <div className='mr-10'>
                    <div className='py-5'>
                        <p><span className='font-bold'>ID:</span> {client.ID}</p>
                        <p><span className='font-bold'>Client Code:</span> {client.client_code || '-'}</p>
                        <p><span className='font-bold'>Client Name:</span>  {client.client_name || '-'}</p>
                        <p><span className='font-bold'>Alias:</span> {client.alias || '-'}</p>
                        <p><span className='font-bold'>Website:</span> {client.website || '-'}</p>
                        {/* <p>Date: {client.date || '-'}</p> */}
                    </div>

                    <div className='py-5'>
                        <p className='font-bold text-xl mb-1'>Client Social Presence</p>
                        {client.client_social_presence && (
                        <div>
                            <p><span className='font-bold'>LinkedIn:</span> {client.client_social_presence.linkedin || '-'}</p>
                            <p><span className='font-bold'>Facebook:</span> {client.client_social_presence.facebook || '-'}</p>
                            <p><span className='font-bold'>Twitter:</span> {client.client_social_presence.twitter || '-'}</p>
                            <p><span className='font-bold'>Github:</span> {client.client_social_presence.github || '-'}</p>
                            <p><span className='font-bold'>Other Social Media:</span> {client.client_social_presence.other?.join(', ') || '-'}</p>
                        </div>
                        )}
                    </div>

                    <div>
                        <p className='font-bold text-xl mb-1'>Subsidiary</p>
                        {client.subsidiary && (
                        <div>
                            <p><span className='font-bold'>Subsidiaries: </span> {client.subsidiary.subsidiaries?.join(', ') || '-'}</p>
                            <p><span className='font-bold'>Immediate Parents: </span>  {client.subsidiary.immediate_parents?.join(', ') || '-'}</p>
                            <p><span className='font-bold'>Ultimate Parents: </span>{client.subsidiary.ultimate_parents?.join(', ') || '-'}</p>
                        </div>
                        )}
                    </div>


                    <div className='py-5'>
                        <p className='font-bold text-xl mb-3'>Locations</p>

                        <table className='border-collapse'>
                            <thead>
                                <tr>
                                    <th className='border px-4 py-2'>Address</th>
                                    <th className='border px-4 py-2'>City</th>
                                    <th className='border px-4 py-2'>Province</th>
                                    <th className='border px-4 py-2'>Postal Code</th>
                                    <th className='border px-4 py-2'>Country</th>
                                    <th className='border px-4 py-2'>Geo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {client.locations && client.locations.map(location => (
                                    <tr key={location.ID}>
                                        <td className='border px-4 py-2'>{location.address || '-'}</td>
                                        <td className='border px-4 py-2'>{location.city.city_name || '-'}</td>
                                        <td className='border px-4 py-2'>{location.province.province_name || '-'}</td>
                                        <td className='border px-4 py-2'>{location.postal_code || '-'}</td>
                                        <td className='border px-4 py-2'>{location.country || '-'}</td>
                                        <td className='border px-4 py-2'>{location.geo || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
   
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            <button className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" > Delete </button>
        </div>
    )
}

export default ClientDetail
