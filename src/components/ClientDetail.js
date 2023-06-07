import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import api from '../api/posts'
import { FaTimes } from 'react-icons/fa';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
                const response = await api.post('/contact/create', contactData)
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
            const res = await axios.get(`http://localhost:8080/api/client/read/${id}`)
            setClient(res.data.data)
            console.log(contact)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchContacts = async () => {
        try {
            const response = await api.get('/contact/read')
            const data = response.data
            setContacts(data)
            console.log(contacts)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchClient()
        fetchContacts()
    }, [])

    const handleShowField = () => {
        setShowField(true)
        setShowSelectField(false)
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
                                <p><span className='font-bold'>Immediate Parents: </span>  {contact.subsidiary.immediate_parents?.join(', ') || '-'}</p>
                                <p><span className='font-bold'>Ultimate Parents: </span>{contact.subsidiary.ultimate_parents?.join(', ') || '-'}</p>
                            </div>
                        )}
                    </div>

                    <div className='py-5'>
                        <p className='font-bold text-xl mb-3'>Locations</p>

                        <table className='border-collapse'>
                            <thead>
                                <tr>
                                    <th className='border px-4 py-2'>Address</th>
                                    <th className='border px-4 py-2'>City</th>
                                    <th className='border px-4 py-2'>Province</th>
                                    <th className='border px-4 py-2'>Postal Code</th>
                                    <th className='border px-4 py-2'>Country</th>
                                    <th className='border px-4 py-2'>Geo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contact.locations && contact.locations.map(location => (
                                    <tr key={location.ID}>
                                        <td className='border px-4 py-2'>{location.address || '-'}</td>
                                        <td className='border px-4 py-2'>{location.city.city_name || '-'}</td>
                                        <td className='border px-4 py-2'>{location.province.province_name || '-'}</td>
                                        <td className='border px-4 py-2'>{location.postal_code || '-'}</td>
                                        <td className='border px-4 py-2'>{location.country || '-'}</td>
                                        <td className='border px-4 py-2'>{location.geo || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            <button className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" > Delete </button>
            <button type="button" onClick={handleContactClick} className="ml-8 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"> Add Contact </button>

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
                                    <select id="contacts" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5" value={fetchedContact} onChange={(e) => {
                                        const value = e.target.value
                                        if (value === "addContact") {
                                            handleShowField()
                                        }
                                        const selectedContactId = parseInt(e.target.value, 10);
                                        setFetchedContact(selectedContactId);
                                    }}>
                                        <option value="">Select Contact</option>
                                        <option value="addContact">Add New Contact...</option>
                                        {Array.isArray(contacts.data) &&
                                            contacts.data.map((contact) => (
                                                <option key={contact.ID} value={contact.ID}>
                                                    {contact.contact_name}
                                                </option>
                                            ))}
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
                        <div className="items-center justify-center flex gap-6 mt-4">
                            <button type="button" onClick={handleContactClose} className="bg-red-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-red-800 focus:outline-none">Cancel</button>
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
                    style={{ backgroundColor: 'green', color: 'white' }} severity="succcess">
                    {successSnackbar}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ClientDetail
