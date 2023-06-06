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

    const columns = [
        { field: 'ID', headerName: 'ID' },
        { field: 'client_code', headerName: 'Client Code' },
        { field: 'client_name', headerName: 'Client Name' },
        { field: 'alias', headerName: 'Alias' },
        { field: 'website', headerName: 'Website' },
    ];

    const getRowId = (row) => row.ID

    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changeCPage(id) {
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className='py-10 px-20'>

            <div className='flex items-center justify-between'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Client List</h1>
                <a href='/client/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                    Add Client
                </a>
            </div>

            <div className='overflow-x-auto text-center w-3/5'>
                {/* <table className='text-center'>
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
                        {records.map(client =>
                            <tr key={client.ID} className='cursor-pointer hover:bg-blue-200' onClick={() => handleClientClick(client.ID)}>
                                <td className='border px-4 py-2'>{client.ID}</td>
                                <td className='border px-4 py-2'>{client.client_code || '-'}</td>
                                <td className='border px-4 py-2'>{client.client_name || '-'}</td>
                                <td className='border px-4 py-2'>{client.alias || '-'}</td>
                                <td className='border px-4 py-2'>{client.website || '-'}</td>
                            </tr>
                        )}
                    </tbody>
                </table> */}

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
                />
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
                        numbers.map((n, i) => (
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
            </nav>

        </div>
    )
}

export default ClientList