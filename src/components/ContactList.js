// import MaterialTable from "material-table"
import { useNavigate } from "react-router-dom"
import React from 'react'
import { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { getAllContacts } from "../api/services/Contact"

const ContactList = () => {

    const [contacts, setcontacts]  = useState([])
    const navigate = useNavigate()

    const fetchcontact = async () => {
        try {
            const response = await getAllContacts()
            setcontacts(response.data.data)
        } catch (error) {
            console.log("Error fetching data")
        }
    }

    useEffect (() => {
        fetchcontact()
    }, [])

    const handleContactClick = (id) => {
        navigate(`/contact/read/${id}`);
    }

    const getRowId = (row) => row.ID
    const columns = [
        { field: 'ID', headerName: 'ID' , align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'contact_name', headerName: 'Contact Name' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'contact_alias', headerName: 'Alias' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'gender', headerName: 'Gender' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'religion', headerName: 'Religion' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center'},
        { field: 'birth_date', headerName: 'Date OF birth' ,align: 'center', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', width: 180},
    ]


    return (
        <div className='py-10 px-20'>
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Contact List</h1>
                <a href='/contact/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                    Add Contact
                </a>
            </div>

            <DataGrid
                rows={contacts}
                getRowId={getRowId}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                onRowClick={(params) => handleContactClick(params.row.ID)}
                className="w-fit"
            />
        </div>
    )
}

export default ContactList