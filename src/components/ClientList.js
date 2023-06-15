import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProspectDetail from './forms/ProspectDetail'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

const ClientList = () => {
    const [clients, setCLients] = useState([])
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(5)

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = clients.slice(firstIndex, lastIndex)
    const npage = Math.ceil(clients.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const fetchClient = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/client/read')
            setCLients(res.data.data)
            console.log(clients)
        } catch (error) {
            console.log("Error fetching data")
        }
    }

    useEffect(() => {
        fetchClient()
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