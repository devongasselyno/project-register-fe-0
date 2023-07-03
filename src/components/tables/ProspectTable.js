import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getAllProspects } from '../../api/services/Prospect';

const ProspectTable = () => {
    const [prospects, setProspects] = useState([])
    const [loading, setLoading]  = useState(false)

    const navigate = useNavigate()

    const handleProspectClick = (id) => {
        navigate(`/prospect/read/${id}`)
    }

    const fetchProspects = async () => {
        setLoading(true)
        try {
            const response = await getAllProspects()
            setProspects(response.data.data)
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    useEffect(() => {
        fetchProspects();
    }, [])

    const getRowId = (row) => row.ID
    const columns = [
        { field: 'ID', headerName: 'No', width: 20, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_type.name', headerName: 'Type', valueGetter: (params) => params.row.project_type.project_name, width: 140, headerAlign: 'center', align: 'center', headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'company.name', headerName: 'Company', valueGetter: (params) => params.row.company.company_name, width: 300, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'client.name', headerName: 'Client', valueGetter: (params) => params.row.client.client_name, width: 240, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'year', headerName: 'Year', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_id', headerName: 'Prospect ID', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white', width: 180},
        { field: 'manager', headerName: 'Manager', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white', width: 140},
        { field: 'status', headerName: 'Status', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_name', headerName: 'Prospect Name', width: 175, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'title', headerName: 'Title', width: 350, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
    ]

    if (loading && prospects.length === 0){
      return <h2>Loading...</h2>
    }

    return (
        <div>
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

export default ProspectTable