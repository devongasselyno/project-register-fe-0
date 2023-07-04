import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { getAllClients } from '../api/services/Client'

const ClientList = () => {
    const [clients, setCLients] = useState([])
    const navigate = useNavigate()

    const fetchClients = async () => {
        try {
            const response = await getAllClients()
            setCLients(response.data.data)
        } catch (error) {
            console.log("Error fetching data")
        }
    }

    useEffect(() => {
        fetchClients()
    }, [])

    const handleClientClick = (id) => {
        navigate(`/client/read/${id}`);
    }

    const getRowId = (row) => row.ID
    const columns = [
        { field: 'ID', headerName: 'ID' , align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'client_code', headerName: 'Client Code' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'client_name', headerName: 'Client Name' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', width: 240},
        { field: 'alias', headerName: 'Alias' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'website', headerName: 'Website' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', width: 180},
    ]

    return (
        <div className='py-10 px-20'>

            <div className='flex items-center justify-between'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Client List</h1>
                <a href='/client/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                    Add Client
                </a>
            </div>

        
            <DataGrid
                rows={clients}
                getRowId={getRowId}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                onRowClick={(params) => handleClientClick(params.row.ID)}
                className='w-fit'
            />
        
        </div>
    )
}

export default ClientList