import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProspectDetail from './forms/ProspectDetail';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { getAllProspects } from '../api/services/Prospect';

const ProspectList = () => {
    const [prospects, setProspects] = useState([])
    const [loading, setLoading]  = useState(false)

    const [recordsPerPage] = useState(5)

    const navigate = useNavigate()

    const handleProspectClick = (id) => {
        navigate(`/prospect/read/${id}`)
    }

    const fetchProspects = async () => {
        setLoading(true)
        try {
            const projects = await getAllProspects()
            setProspects(projects)
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    useEffect(() => {
        fetchProspects();
    }, [])

    const getRowId = (row) => row.ID
    const columns = [
        { field: 'ID', headerName: 'ID', width: 20, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_type.name', headerName: 'Type', valueGetter: (params) => params.row.project_type.project_name, width: 180, headerAlign: 'center', align: 'center', headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'company.name', headerName: 'Company', valueGetter: (params) => params.row.company.company_name, width: 150, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'client.name', headerName: 'Client', valueGetter: (params) => params.row.client.client_name, width: 150, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'year', headerName: 'Year', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_id', headerName: 'Prospect ID', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'manager', headerName: 'Manager', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'status', headerName: 'Status', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_name', headerName: 'Prospect Name', width: 175, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'title', headerName: 'Title', width: 400, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
    ]

    // if (loading && posts.length === 0){
    //   return <h2>Loading...</h2>
    // }

    return (
        <div className='py-10 px-20'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Prospect</h1>
                <a href='/prospect/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                    Add Prospect
                </a>
            </div>

            <DataGrid
                rows={prospects}
                getRowId={getRowId}
                columns={columns}
                sty
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                onRowClick={(params) => handleProspectClick(params.row.ID)}
                pageSize={5}
                pageSizeOptions={[5, 10]}
            />
        </div> 
    )
}

export default ProspectList