import { useEffect, useState, React } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import api from '../api/posts'
import { FaTimes } from 'react-icons/fa';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const ContactDetail = () => {

    const { id } = useParams()
    const [contact, setContact] = useState({})
    const [showAddClient, setShowAddClient] = useState(false)
    const [clientData, setClientData] = useState({
        client_name: "",
        client_code: ""
    })
    const [clientError, setClientError] = useState('')
    const [clientSnackbar, setClientSnackbar] = useState('')
    const [successSnackbar, setSuccessSnackbar] = useState('')

    const handleChange = (field, values) => {
        setClientData({ ...clientData, [field]: values })
    }

    const handleClientClick = (event) => {
        event.preventDefault()
        setShowAddClient(true)
    }

    const validateClient = () => {
        const error = {}
        const message = "This field is required"

        if (!clientData.client_name.trim()) {
            error.name = message
        }
        if (!clientData.client_code.trim()) {
            error.code = message
        }

        setClientError(error)
        return Object.keys(error).length === 0
    }

    const handleSnackbarClose = () => {
        setClientSnackbar('')
        setSuccessSnackbar('')
    }

    const handleClientClose = () => {
        setShowAddClient(false)
    }

    const handleClientSubmit = async (event) => {
        event.preventDefault()
        const isValid = validateClient()

        if (isValid) {
            try {
                const response = await api.post('client/create', clientData)
                setSuccessSnackbar('Client Created')
                handleClientClose()
                setClientData({
                    client_code: "",
                    client_name: ""
                })
            } catch (error) {
                console.error('Failed to send data: ', error)
            }
        } else {
            setClientSnackbar('Please fill all required fields')
        }
    }

    const fetchContact = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/contact/read/${id}`)
            setContact(res.data.data)
            console.log(contact)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchContact()
    }, [])

    return (
        <div className='py-10 px-20 grid-flow-row'>
            <p className='text-4xl leading-8 font-bold py-5'>Contact Detail</p>

            <div className='flex'>
                <div className='mr-10'>
                    <div className='py-5'>
                        <p><span className='font-bold'>ID:</span>{contact.ID}</p>
                        <p><span className='font-bold'>Contact Name:</span>{contact.contact_name || '-'}</p>
                        <p><span className='font-bold'>Alias:</span> {contact.contact_alias || '-'}</p>
                        <p><span className='font-bold'>Gender:</span> {contact.gender === "1" ? "Male" : contact.gender === "0" ? "Female" : "-"}</p>
                        <p><span className='font-bold'>Birth Date:</span> {contact.birth_date || '-'}</p>
                        <p><span className='font-bold'>Religion:</span> {contact.religion || '-'}</p>
                    </div>

                    <div className='space-y-3'>
                        <div>
                            <p className='font-bold'>Contact Emails:</p>
                            <p>{contact.contact_emails?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p className='font-bold'>Contact Phones:</p>
                            <p>{contact.contact_phones?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p className='font-bold'>Interests:</p>
                            <p>{contact.interests?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p className='font-bold'>Skills:</p>
                            <p>{contact.skills?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p className='font-bold'>Educations:</p>
                            <p>{contact.educations?.join(', ') || '-'}</p>
                        </div>


                        <div>
                            <p className='font-bold'>Notes:</p>
                            <p>{contact.notes || '-'}</p>
                        </div>
                    </div>

                    <div className='py-5'>
                        <p className='font-bold text-xl  mb-1'>Contact Social Presence</p>
                        {contact.contact_social_presence && (
                            <div>
                                <p> <span className='font-bold'>LinkedIn:</span>  {contact.contact_social_presence.linkedin || '-'}</p>
                                <p> <span className='font-bold'>Facebook:</span> {contact.contact_social_presence.facebook || '-'}</p>
                                <p> <span className='font-bold'>Twitter:</span> {contact.contact_social_presence.twitter || '-'}</p>
                                <p> <span className='font-bold'>Github:</span>  {contact.contact_social_presence.github || '-'}</p>
                                <p>
                                    <span className='font-bold'>Other Social Media:</span> {contact.contact_social_presence.other?.join(', ') || '-'}
                                </p>
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
            <button type="button" onClick={handleClientClick} className="ml-8 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"> Add Client </button>

            {showAddClient && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute text-center'>
                        <div>
                            <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleClientClose} />
                        </div>
                        <h1 className="text-lg mb-2">
                            Add Client
                        </h1>
                        <div>
                            <label htmlFor="name"
                                className="text-left block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Client Name
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 p-2.5"
                                id="name"
                                value={clientData.client_name}
                                onChange={(event) => handleChange('client_name', event.target.value)}
                                placeholder='Insert Client Name' />
                            {clientError.name && <p className="text-red-500 text-sm text-left pt-1 pl-1">{clientError.name}</p>}
                            <label htmlFor="name"
                                className="text-left block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Client Name
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 p-2.5"
                                id="name"
                                value={clientData.client_code}
                                onChange={(event) => handleChange('client_code', event.target.value)}
                                placeholder='Insert Client Code' />
                            {clientError.code && <p className="text-red-500 text-sm text-left pt-1 pl-1">{clientError.code}</p>}
                        </div>
                        <div className="items-center justify-center flex gap-6 mt-4">
                            <button type="button" onClick={handleClientClose} className="bg-red-700 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-red-800 focus:outline-none">Cancel</button>
                            <button type="button" onClick={handleClientSubmit} className="bg-emerald-700 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-emerald-800 focus:outline-none">Submit</button>
                        </div>
                    </div>
                    <Snackbar open={!!clientSnackbar} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                        <Alert onClose={handleSnackbarClose} severity="error">
                            {clientSnackbar}
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

export default ContactDetail