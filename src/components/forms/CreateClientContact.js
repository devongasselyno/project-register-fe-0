import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'

const CreateClientContact = () => {

    const [contacts, setContacts] =  useState([])
    const [clients, setClients] = useState([])
    const [employments, setEmployments] = useState([])
    const [errors, setErrors] = useState({})
    const [showEmploymentForm, setShowEmploymentForm] = useState(false)
    const [employmentFormData, setEmploymentFormData] = useState([])

    const fetchContacts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/contact/read")
            const contactData = res.data.data
            setContacts(contactData)
        } catch (error) {
            console.log("Error fetching data:",error)
        }
    }

    const fetchClients = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/client/read")
            const clientData = res.data.data
            setClients(clientData)
        } catch (error) {
            console.log("Error fetching data:",error)
        }
    }
   

    useEffect(() => {
        fetchClients()
        fetchContacts()
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let errors = {}
        const formData = new FormData(e.currentTarget);
       
        const data = {
            client_id: parseInt(formData.get('client_id')),
            contact_id: parseInt(formData.get('contact_id')),
        }

        if (!data.client_id) {errors.client_id = 'Please select a client'}
        if (!data.contact_id) {errors.contact_id = 'Please select a contact'}
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:8080/api/clientcontact/create', data)
            .then(response => {
            const clientContactId = response.data.data.ID
            createEmployments(clientContactId)
            })
            .catch(error => {
            console.error(error)
            });
        }
    }

    const handleEmploymentFormSubmit = (e) => {
        e.preventDefault();
      
        let errors = {};
      
        const formData = new FormData(e.target);
      
        const jobTitle = formData.get('job_title');
        const jobStart = formData.get('job_start');
        const jobEnd = formData.get('job_end');
        const status = formData.get('status');
        
        console.log("jobtitle:", jobTitle)
        if (!jobTitle) {
            errors.job_title = 'Please enter a job title';
        }
        if (!jobStart) {
            errors.job_start = 'Please enter a job start date';
        }
        if (!jobEnd) {
            errors.job_end = 'Please enter a job end date';
        }
        if (!status || status === 'select') {
            errors.status = 'Please select a status';
        }
      
        setErrors(errors);
      
        if (Object.keys(errors).length === 0) {
            const newEmployment = {
                jobTitle,
                jobStart,
                jobEnd,
                status,
            };
        
            setEmploymentFormData((prevFormData) => [...prevFormData, newEmployment])
            setShowEmploymentForm(false)
        }
    }

    const createEmployments = (clientContactId) => {
        
        employmentFormData.forEach((employment) => {
            const data = {
                client_contact_id: clientContactId,
                job_title: employment.jobTitle,
                job_start: employment.jobStart,
                job_end: employment.jobEnd,
                status: employment.status,
            }
            console.log("ccidd", data.client_contact_id)
            axios.post('http://localhost:8080/api/employments/create', data)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    const handleAddEmploymentClick = (e) => {
        e.preventDefault()
        setShowEmploymentForm(true)
    }

    const handleClose = () => {
        setShowEmploymentForm(false)
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className='pt-10 px-20'>
                    <h1 className='text-xl py-2 font-semibold leading-7 text-gray-900'>Create Client Contact</h1>

                    <div className='pb-2'>
                        <label htmlFor="client_id" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Clients</label>
                        <select id='client_id' name='client_id' className='bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'>
                            <option selected disabled value="select">Select...</option>
                            {clients.map((client) => (
                                <option key={client.ID} value={client.ID}>
                                    {client.client_name}
                                </option>
                            ))}
                        </select>
                        {errors.client_id && <p className="text-red-500">{errors.client_id}</p>}
                    </div>

                    <div className='pb-2'>
                        <label htmlFor="contact_id" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Contacts</label>
                        <select id='contact_id' name='contact_id' className='bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'>
                            <option selected disabled value="select">Select...</option>
                            {contacts.map((contact) => (
                                <option key={contact.ID} value={contact.ID}>
                                    {contact.contact_name}
                                </option>
                            ))}
                        </select>
                        {errors.contact_id && <p className="text-red-500">{errors.contact_id}</p>}
                    </div>
                    
                    <button onClick={handleAddEmploymentClick} className="mr-7 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">Add Employment</button>
                    <button type='submit' className="mt-5 bg-red-800 text-white text-base text-bold py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Submit</button>
                </div>
            </form>

            {employmentFormData.length > 0 && (
            <div className="pt-10 px-20">
                <h2 className="text-lg font-medium text-gray-900 pb-1">
                Filled Employment Data:
                </h2>
                {employmentFormData.map((employment, index) => (
                <div key={index}>
                    <p>Job Title: {employment.jobTitle}</p>
                    <p>Job Start: {employment.jobStart}</p>
                    <p>Job End: {employment.jobEnd}</p>
                    <p>Status: {employment.status}</p>
                    <hr className="my-3" />
                </div>
                ))}
            </div>
            )}

            {showEmploymentForm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute'>
                        <div>
                            <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleClose}/>
                        </div>
                        <h1 className='text-center py-5'>Add Employment</h1>
                        <form onSubmit={handleEmploymentFormSubmit}>
                            <div className='pb-2'>
                                <label htmlFor="job_title" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job Title</label>
                                <input id='job_title' name='job_title' type="text" placeholder='Job title' className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                                {errors.job_title && <p className="text-red-500">{errors.job_title}</p>}
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="job_start" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job Start</label>
                                <input type="date" name="job_start" id="job_start" className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5' />
                                {errors.job_start && <p className="text-red-500">{errors.job_start}</p>}
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="job_end" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job End</label>
                                <input type="date" name="job_end" id="job_end" className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                                {errors.job_end && <p className="text-red-500">{errors.job_end}</p>}
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="status" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Status</label>
                                <select name='status' id='status' className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'>
                                    <option selected disabled value="select">Select...</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.status && <p className="text-red-500">{errors.status}</p>}
                            </div>
                            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded float-right'>Submit</button>
                        </form>

                    </div>
                </div>
            )}
        </>
    )
}

export default CreateClientContact