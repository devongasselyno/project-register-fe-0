import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

const ProjectList = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading]  = useState(false)
  
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(5)
  
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = posts.slice(firstIndex, lastIndex)
    const npage = Math.ceil(posts.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const navigate = useNavigate()
  
    const handleProjectClick = (id) => {
        navigate(`/project/read/${id}`)
    }
    
    useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true)
        const res = await axios.get('http://localhost:8080/api/projects/read')
        setPosts(res?.data?.data)
        setLoading(false)
    }
    fetchPosts();
    }, [])

    const getRowId = (row) => row.ID
    const columns = [
        { field: 'ID', headerName: 'ID', width: 20, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_type.name', headerName: 'Type', valueGetter: (params) => params.row.project_type.project_name, width: 180, headerAlign: 'center', align: 'center', headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'company.name', headerName: 'Company', valueGetter: (params) => params.row.company.company_name, width: 150, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'client.name', headerName: 'Client', valueGetter: (params) => params.row.client.client_name, width: 150, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'year', headerName: 'Year', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'prospect_id', headerName: 'Prospect ID', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'manager', headerName: 'Manager', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'status', headerName: 'Status', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'project_name', headerName: 'Prospect Name', width: 175, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'title', headerName: 'Title', width: 400, headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center' , headerClassName: 'bg-[#EE3E23] text-white'},
    ]
      
    // { field: 'jira', headerName: 'Jira' },
    // { field: 'clockify', headerName: 'Clockify' },
    // { field: 'pcs', headerName: 'PCS' },
    // { field: 'pms', headerName: 'PMS' },
    
    return (
        <div className='pt-10 px-20'>
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Projects</h1>
                <a href='/prospect/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                Add Prospect
                </a>
            </div>

            <DataGrid
                rows={posts}
                getRowId={getRowId}
                columns={columns}
                sty
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSize={5}
                pageSizeOptions={[5, 10]}
            />
        
            {/* <div className='overflow-x-auto text-center'>
                <table className='table-auto border-collapse'>
                <thead>
                    <tr>
                    <th className='border px-4 py-2'>ID</th>
                    <th className='border px-4 py-2'>Company</th>
                    <th className='border px-4 py-2'>Client</th>
                    <th className='border px-4 py-2'>Year</th>
                    <th className='border px-4 py-2'>Project ID</th>
                    <th className='border px-4 py-2'>Project Name</th>
                    <th className='border px-4 py-2'>Sales/Project Manager</th>
                    <th className='border px-4 py-2'>Status</th>
                    <th className='border px-4 py-2'>Project Title</th>
                    <th className='border px-4 py-2'>Project Amount</th>
                    <th className='border px-4 py-2'>Jira</th>
                    <th className='border px-4 py-2'>Clockify</th>
                    <th className='border px-4 py-2'>PCS</th>
                    <th className='border px-4 py-2'>PMS</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map(row => 
                    <tr key={row.ID} className='cursor-pointer hover:bg-blue-200' onClick={() => handleProjectClick(row.ID)}>
                        <td className='border px-4 py-2'>{row.ID}</td>
                        <td className='border px-4 py-2'>{row.company.company_name}</td>
                        <td className='border px-4 py-2'>{row.client.client_name}</td>
                        <td className='border px-4 py-2'>{row.year}</td>
                        <td className='border px-4 py-2'>{row.project_id}</td>
                        <td className='border px-4 py-2'>{row.project_name}</td>
                        <td className='border px-4 py-2'>{row.manager}</td>
                        <td className='border px-4 py-2'>{row.status}</td>
                        <td className='border px-4 py-2'>{row.title}</td>
                        <td className='border px-4 py-2'>{row.amount}</td>
                        <td className='border px-4 py-2'>{row.jira ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                        <td className='border px-4 py-2'>{row.clockify ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                        <td className='border px-4 py-2'>{row.pcs ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                        <td className='border px-4 py-2'>{row.pms ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example" className='pagination py-7'>
                <ul class="inline-flex items-center -space-x-px">
                    <li>
                    <a onClick={prevPage} href="#" className="flex items-center justify-center h-8 w-8 rounded border border-gray-300 bg-white text-gray-900 rtl:rotate-180 hover:bg-[#4E73DF] hover:text-white">
                        <span class="sr-only">Previous</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                    </li>
                    
                    {
                    numbers.map((n, i ) => (
                        <li className={`page-item ${currentPage === n ? 'active:' : ''}`} key={i}>
                        <a onClick={() => changeCPage(n)} href="#" className={`block h-8 w-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900 hover:bg-[#4E73DF] hover:text-white ${currentPage === n ? 'bg-[#4E73DF]' : ''}`}>
                            {n}
                        </a>
                        </li>
                    ))
                    }
        
                    <li>
                    <a onClick={nextPage} href="#" class="flex items-center justify-center h-8 w-8 rounded border border-gray-300 bg-white text-gray-900 rtl:rotate-180 hover:bg-[#4E73DF] hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                    </li>
                </ul>
            </nav> */}
            </div>
        );  

        function prevPage() {
            if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
            }
        }

        function changeCPage(id) {
            setCurrentPage(id)
        }

        function nextPage() {
            if(currentPage !== npage) {
            setCurrentPage(currentPage + 1)
            }
        }
    
}

export default ProjectList