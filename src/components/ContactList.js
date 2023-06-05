import MaterialTable from "material-table"
import { useNavigate } from "react-router-dom"
import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"

const ContactList = () => {

    const [contacts, setcontacts]  = useState([])
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(5)
  
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = contacts.slice(firstIndex, lastIndex)
    const npage = Math.ceil(contacts.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const fetchcontact = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/contact/read')
            setcontacts(res.data.data)
            console.log(contacts)
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


    // const columns = [
    //     { title: 'ID', field: 'contacts.ID' },
    //     { title: 'Name', field: 'contacts.contact_name' },
    //     { title: 'Alias', field: 'contacts.contact_alias' },
    //     { title: 'Gender', field: 'contacts.gender' },
    //     { title: 'Religion', field: 'contacts.religion' },
    //     { title: 'Birth Date', field: 'contacts.birth_date' },
    // ]

    

    return (
        <div className='py-10 px-20'>
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Contact List</h1>
                <a href='/contact/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                    Add Contact
                </a>
            </div>

            <div className='overflow-x-auto text-center'>
                <table className='text-center'>
                    <thead>
                        <tr>
                            <th className='border px-4 py-2'>ID</th>
                            <th className='border px-4 py-2'>Contact Name</th>
                            <th className='border px-4 py-2'>Contact Alias</th>
                            <th className='border px-4 py-2'>Gender</th>
                            <th className='border px-4 py-2'>Religion</th>
                            <th className='border px-4 py-2'>Date of Birth</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map(contact => 
                            <tr key={contact.ID} className='cursor-pointer hover:bg-blue-200' onClick={() => handleContactClick(contact.ID)}>
                                <td className='border px-4 py-2'>{contact.ID}</td>
                                <td className='border px-4 py-2'>{contact.contact_name || '-'}</td>
                                <td className='border px-4 py-2'>{contact.contact_alias || '-'}</td>
                                <td className='border px-4 py-2'>{contact.gender || '-'}</td>
                                <td className='border px-4 py-2'>{contact.religion|| '-'}</td>
                                <td className='border px-4 py-2'>{contact.birth_date|| '-'}</td>
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
            </nav>
            
        </div>
    )
}

export default ContactList