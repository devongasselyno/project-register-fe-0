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
                        <p>ID: {client.ID}</p>
                        <p>Client Code: {client.client_code || '-'}</p>
                        <p>Client Name: {client.client_name || '-'}</p>
                        <p>Alias: {client.alias || '-'}</p>
                        <p>Website: {client.website || '-'}</p>
                        {/* <p>Date: {client.date || '-'}</p> */}
                    </div>


                    <div className='py-5'>
                        <p className='font-bold'>Locations</p>
                        {client.locations && client.locations.map(location => (
                            <div className='pb-3' key={location.ID}>
                                <p>Address: {location.address || '-'}</p>
                                <p>City: {location.city.city_name || '-'}</p>
                                <p>Province: {location.province.province_name || '-'}</p>
                                <p>Postal Code: {location.postal_code || '-'}</p>
                                <p>Country: {location.country || '-'}</p>
                                <p>Geo: {location.geo || '-'}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className='py-5'>
                        <p className='font-bold'>Client Social Presence</p>
                        {client.client_social_presence && (
                        <React.Fragment>
                            <p>LinkedIn: {client.client_social_presence.linkedin || '-'}</p>
                            <p>Facebook: {client.client_social_presence.facebook || '-'}</p>
                            <p>Twitter: {client.client_social_presence.twitter || '-'}</p>
                            <p>Github: {client.client_social_presence.github || '-'}</p>
                            <p>
                            Other Social Media: {client.client_social_presence.other?.join(', ') || '-'}
                            </p>
                        </React.Fragment>
                        )}
                    </div>

                    <div>
                        <p className='font-bold'>Subsidiary</p>
                        {client.subsidiary && (
                        <React.Fragment>
                            <p>Subsidiaries: {client.subsidiary.subsidiaries?.join(', ') || '-'}</p>
                            <p>Immediate Parents: {client.subsidiary.immediate_parents?.join(', ') || '-'}</p>
                            <p>Ultimate Parents: {client.subsidiary.ultimate_parents?.join(', ') || '-'}</p>
                        </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
   
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            <button className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" > Delete </button>
        </div>
    )
}

export default ClientDetail
