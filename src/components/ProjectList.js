import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { getAllProjects } from '../api/services/Project'

const ProjectList = () => {

    const [projects, setProjects] = useState([])
    const [loading, setLoading]  = useState(false)

    const navigate = useNavigate()
  
    const handleProjectClick = (id) => {
        navigate(`/project/read/${id}`)
    }
    
    const fetchProjects = async () => {
        setLoading(true)
        try {
            const projects = await getAllProjects()
            setProjects(projects)
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    useEffect(() => {
        fetchProjects();
    }, [])

    const getRowId = (row) => row.ID
    const columns = [
        { field: 'ID', headerName: 'ID', width: 20, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_type.name', headerName: 'Type', valueGetter: (params) => params.row.project_type.project_name, width: 180, headerAlign: 'center', align: 'center', headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'company.name', headerName: 'Company', valueGetter: (params) => params.row.company.company_name, width: 150, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'client.name', headerName: 'Client', valueGetter: (params) => params.row.client.client_name, width: 150, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'year', headerName: 'Year', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_id', headerName: 'Project ID', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'manager', headerName: 'Manager', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'status', headerName: 'Status', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_name', headerName: 'Project Name', width: 175, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'title', headerName: 'Title', width: 400, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
    ]
    
    return (
        <div className='pt-10 px-20'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Projects</h1>
                {/* <a href='/project/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                    Add project
                </a> */}
            </div>

            <DataGrid
                rows={projects}
                getRowId={getRowId}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                onRowClick={(params) => handleProjectClick(params.row.ID)}
                pageSize={5}
                pageSizeOptions={[5, 10]}
            />
        </div>
    )
}

export default ProjectList