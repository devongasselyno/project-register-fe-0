import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { deleteClient, getClientByID } from '../api/services/Client'
import { createContact, getAllContacts } from '../api/services/Contact';
import LocationTable from './tables/LocationTable';

const ClientDetail = () => {
    const { id } = useParams()
    const [contact, setClient] = useState({})
    const [showAddContact, setShowAddContact] = useState(false)
    const [contactData, setContactData] = useState({
        contact_name: "",
        contact_alias: ""
    })
    const [contacts, setContacts] = useState([])
    const [fetchedContact, setFetchedContact] = useState(0)
    const [contactError, setContactError] = useState('')
    const [contactSnackBar, setContactSnackbar] = useState('')
    const [successSnackbar, setSuccessSnackbar] = useState('')
    const [showField, setShowField] = useState(false)
    const [showSelectField, setShowSelectField] = useState(true)
    const navigate = useNavigate()
    const [ confirmation, setConfirmation ] = useState(false)
    const [buttonType, setButtonType] = useState(true)

    const handleChange = (field, values) => {
        setContactData({ ...contactData, [field]: values })
    }

    const handleContactClick = (event) => {
        event.preventDefault()
        setShowAddContact(true)
    }

    const validateContact = () => {
        const error = {}
        const message = "This field is required"

        if (!contactData.contact_name.trim()) {
            error.name = message
        }

        setContactError(error)
        return Object.keys(error).length === 0
    }

    const handleSnackbarClose = () => {
        setContactSnackbar('')
        setSuccessSnackbar('')
    }

    const handleContactClose = (event) => {
        setShowAddContact(false)
        setShowField(false)
        setShowSelectField(true)
    }

    const handleContactSubmit = async (event) => {
        event.preventDefault()
        const isValid = validateContact()

        if (isValid) {
            try {
                const response = await createContact(contactData)
                setSuccessSnackbar('Contact Created')
                handleContactClose()
                setContactData({
                    contact_name: "",
                    contact_alias: ""
                })
            } catch (error) {
                console.error('Failed to send data: ', error)
            }
        } else {
            setContactSnackbar('Please fill all required fields')
        }
    }

    const fetchClient = async () => {
        try {
            const response = await getClientByID(id)
            setClient(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchContacts = async () => {
        try {
            const response = await getAllContacts()
            const data = response.data
            setContacts(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchClient()
        fetchContacts()
    }, [])

    const handleShowInputField = () => {
        setShowField(true)
        setShowSelectField(false)
        setButtonType(false)
    }

    const handleShowSelectField = () => {
        setShowField(false)
        setShowSelectField(true)
        setButtonType(true)
    }

    const handleClientDelete = async () => {
        try {
            await deleteClient(id)
            console.log('Prospect deleted successfully');
        
            navigate('/client')
        } catch (err) {
            console.error('Error deleting prospect:', err);
        }
    }

    const handleEdit = () => {
        navigate(`/client/update/${id}`)
    }

    return (
        <div className='py-10 px-20 grid-flow-row'>
            <p className='text-4xl leading-8 font-bold py-5'>Client Detail</p>

            <div className='flex'>
                <div className='mr-10'>
                    <div className='py-5'>
                        <p><span className='font-bold'>ID:</span> {contact.ID}</p>
                        <p><span className='font-bold'>Client Code:</span> {contact.client_code || '-'}</p>
                        <p><span className='font-bold'>Client Name:</span>  {contact.client_name || '-'}</p>
                        <p><span className='font-bold'>Alias:</span> {contact.alias || '-'}</p>
                        <p><span className='font-bold'>Website:</span> {contact.website || '-'}</p>
                        {/* <p>Date: {client.date || '-'}</p> */}
                    </div>

                    <div className='py-5'>
                        <p className='font-bold text-xl mb-1'>Client Social Presence</p>
                        {contact.client_social_presence && (
                            <div>
                                <p><span className='font-bold'>LinkedIn:</span> {contact.client_social_presence.linkedin || '-'}</p>
                                <p><span className='font-bold'>Facebook:</span> {contact.client_social_presence.facebook || '-'}</p>
                                <p><span className='font-bold'>Twitter:</span> {contact.client_social_presence.twitter || '-'}</p>
                                <p><span className='font-bold'>Github:</span> {contact.client_social_presence.github || '-'}</p>
                                <p><span className='font-bold'>Other Social Media:</span> {contact.client_social_presence.other?.join(', ') || '-'}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <p className='font-bold text-xl mb-1'>Subsidiary</p>
                        {contact.subsidiary && (
                            <div>
                                <p><span className='font-bold'>Subsidiaries: </span> {contact.subsidiary.subsidiaries?.join(', ') || '-'}</p>
                                <p><span className='font-bold'>Immediate Parents: </span>  {contact.subsidiary.immidiate_parents?.join(', ') || '-'}</p>
                                <p><span className='font-bold'>Ultimate Parents: </span>{contact.subsidiary.ultimate_parents?.join(', ') || '-'}</p>
                            </div>
                        )}
                    </div>

                    <div className='py-5'>
                        <p className='font-bold text-xl mb-3'>Locations</p>

                        <LocationTable id={ id }/>
                    </div>

                </div>
            </div>

            <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            <button onClick={() => setConfirmation(true)} className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" > Delete </button>
            <button type="button" onClick={handleContactClick} className="ml-8 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"> Add Contact </button>

            {confirmation && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute'>
                        <div className='text-center'>
                            <p className='text-xl font-bold mb-2'>Confirmation</p>
                            <p className='mb-5'>Are you sure you want to delete?</p>
                            <div className="items-center justify-center flex gap-6 mt-4">
                                <button type="button" onClick={() => setConfirmation(false)} className="bg-red-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-red-800 focus:outline-none">Cancel</button>
                                <button type="button" onClick={() => handleClientDelete(id)} className="bg-emerald-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-emerald-800 focus:outline-none">Delete</button>
                            </div>
                        </div>   
                    </div>
                </div>
            )}

            {showAddContact && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute text-center'>
                        <div>
                            <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleContactClose} />
                        </div>
                        <h1 className="text-lg mb-2">
                            Add Contact
                        </h1>
                        <div>
                            {showSelectField &&
                                <div>
                                    <label htmlFor="name"
                                        className="text-left block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                        Select Contact
                                    </label>
                                    <select id="contacts" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5" value={fetchedContact} onChange={(e) => {
                                        const value = e.target.value
                                        if (value === "addContact") {
                                            handleShowInputField()
                                        }
                                        const selectedContactId = parseInt(e.target.value, 10);
                                        setFetchedContact(selectedContactId);
                                    }}>
                                        <option value="">Select Contact</option>
                                        
                                        {Array.isArray(contacts.data) &&
                                            contacts.data.map((contact) => (
                                                <option key={contact.ID} value={contact.ID}>
                                                    {contact.contact_name}
                                                </option>
                                            ))}
                                        <option className="text-rose-950" value="addContact">Add New Contact...</option>
                                    </select>
                                </div>
                            }

                            {showField &&
                                <div>
                                    <label htmlFor="name"
                                        className="text-left block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                        Add New Contact
                                    </label>
                                    <input
                                        type="text"
                                        autoComplete='off'
                                        className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 p-2.5"
                                        id="name"
                                        value={contactData.contact_name}
                                        onChange={(event) => handleChange('contact_name', event.target.value)}
                                        placeholder='Insert Contact Name' />
                                </div>
                            }
                        </div>
                        <div className="items-center justify-center flex gap-6 mt-6">
                            <button type="button" onClick={handleContactClose} className="bg-red-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-red-800 focus:outline-none">Cancel</button>
                            {/* {buttonType && 
                                <button type="button" onClick={handleShowInputField} className="bg-slate-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-slate-800 focus:outline-none">Add</button>
                            }
                            {!buttonType && 
                                <button type="button" onClick={handleShowSelectField} className="bg-slate-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-slate-800 focus:outline-none">Select</button>
                            } */}
                            <button type="button" onClick={handleContactSubmit} className="bg-emerald-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-emerald-800 focus:outline-none">Submit</button>
                        </div>
                    </div>
                    <Snackbar open={!!contactSnackBar} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                        <Alert onClose={handleSnackbarClose} severity="error">
                            {contactSnackBar}
                        </Alert>
                    </Snackbar>
                </div>
            )}
            <Snackbar open={!!successSnackbar} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert onClose={handleSnackbarClose} icon={<CheckCircleIcon />}
                    style={{ backgroundColor: 'green', color: 'white' }} severity="success">
                    {successSnackbar}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ClientDetail
