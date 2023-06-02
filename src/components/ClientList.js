import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProspectDetail from './forms/ProspectDetail'
import axios from 'axios'

const ClientList = () => {
    const [clients, setCLients]  = useState([])
    const navigate = useNavigate()

    const fetchClient = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/client/read')
            setCLients(res.data.data)
            console.log(clients)
        } catch (error) {
            console.log("Error fetching data")
        }
    }

    useEffect (() => {
        fetchClient()
    }, [])

    const handleClientClick = (id) => {
        navigate(`/client/read/${id}`);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className='border px-4 py-2'>ID</th>
                        <th className='border px-4 py-2'>Client Code</th>
                        <th className='border px-4 py-2'>Client Name</th>
                        <th className='border px-4 py-2'>Alias</th>
                        <th className='border px-4 py-2'>Website</th>
                    </tr>
                </thead>

                <tbody>
                    {clients.map(client => 
                        <tr key={client.ID} className='cursor-pointer hover:bg-blue-200' onClick={() => handleClientClick(client.ID)}>
                            <td className='border px-4 py-2'>{client.ID}</td>
                            <td className='border px-4 py-2'>{client.client_code}</td>
                            <td className='border px-4 py-2'>{client.client_name}</td>
                            <td className='border px-4 py-2'>{client.alias}</td>
                            <td className='border px-4 py-2'>{client.website}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ClientList