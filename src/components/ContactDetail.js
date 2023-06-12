import { useEffect, useState, React } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/posts'
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const ContactDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [clientContactID, setClientContactID] = useState()
    const [contact, setContact] = useState({})
    const [employments, setEmployments] = useState([])
    const [locationsList, setLocationsList] = useState([])
    const [showAddClient, setShowAddClient] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const [showEmploymentForm, setShowEmploymentForm] = useState(false)
    const [employmentFormData, setEmploymentFormData] = useState({
        job_title: '',
        job_start: '',
        job_end: '',
        status: '',
    })
    const [showField, setShowField] = useState(false)
    const [showSelectField, setShowSelectField] = useState(true)
    const [buttonType, setButtonType] = useState(true)
    const [fetchedClient, setFetchedClient] = useState(0)
    const [clientList, setClientList] = useState([])

    const [clientContactData, setClientContactData] = useState({
        contact_id: id,
        client_id: 0,
    })

    const [clients, setClients] = useState([])
    const [clientData, setClientData] = useState({
        client_name: "",
        client_code: ""
    })
    const [clientError, setClientError] = useState('')
    const [errors, setErrors] = useState({})
    const [clientSnackbar, setClientSnackbar] = useState('')
    const [successSnackbar, setSuccessSnackbar] = useState('')

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

    const handleChange = (field, values) => {
        setClientData({ ...clientData, [field]: values })
    }

    const handleClientChange = (event) => {
        const { name, value } = event.target;
        setClientContactData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEmploymentChange = (e) => {
        setEmploymentFormData({ ...employmentFormData, [e.target.name]: e.target.value });
    }

    const handleClientClick = (event) => {
        event.preventDefault()
        setShowAddClient(true)
    }

    const handleClientClose = () => {
        setShowAddClient(false)
        setShowField(false)
        setShowSelectField(true)
    }

    const handleEmploymentClick = (e) => {
        e.preventDefault()
        setShowEmploymentForm(true)
    }

    const handleEmploymentClose = () => {
        setShowEmploymentForm(false)
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


    const handleEmploymentFormSubmit = async (e) => {
        e.preventDefault()

        let errors = {}

        if (employmentFormData.client_id === 'select') {
            errors.client_id = 'Please select a client'
        }
        if (!employmentFormData.job_title) {
            errors.job_title = 'Please enter a job title'
        }
        if (!employmentFormData.job_start) {
            errors.job_start = 'Please enter a job start date'
        }
        if (!employmentFormData.job_end) {
            errors.job_end = 'Please enter a job end date'
        }
        if (!employmentFormData.status || employmentFormData.status === 'select') {
            errors.status = 'Please select a status'
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const contactData = {
                    contact_id: parseInt(clientContactData.contact_id),
                    client_id: parseInt(clientContactData.client_id)
                }

                const res = await axios.post('http://localhost:8080/api/clientcontact/create', contactData)
                setClientContactID(res.data.data.ID)

                const employmentData = {
                    ...employmentFormData,
                    client_contact_id: clientContactID
                }

                await axios.post('http://localhost:8080/api/employments/create', employmentData)
                setShowEmploymentForm(false)
                window.location.reload(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSnackbarClose = () => {
        setClientSnackbar('')
        setSuccessSnackbar('')
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

    const handleContactDelete = async (contactID) => {
        try {
            await axios.delete(`http://localhost:8080/api/contact/delete/soft/${id}`, contactID)
            console.log('Contact deleted successfully')

            setTimeout(() => {
                navigate('/contact')
            }, 500);

        } catch (err) {
            console.error('Error deleting prospect:', err);
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

    const fetchClients = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/client/read")
            const clientData = res.data.data
            const clientList = res.data
            setClients(clientData)
            setClientList(clientList)
        } catch (error) {
            console.log("Error fetching data:", error)
        }
    }

    const fetchEmployments = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/employments/read/${id}`)
            const data = res.data
            setEmployments(data)
        } catch (error) {
            console.log("Error fetching data:", error)
        }
    }

    const fetchLocations = async () => {
        try {
            const res = await api.get(`/contact/locations/${id}`)
            const data = res.data.data
            console.log(data)
            setLocationsList(data)
        } catch (error) {
            console.error("Failed to fetch locations")
        }
    }

    useEffect(() => {
        fetchContact()
        fetchClients()
        fetchEmployments()
        fetchLocations()
    }, [])

    // useEffect(() => {
    //     if (locationsList) {
    //         const updatedLocationsList = locationsList.map((location) => ({
    //             ID: location.ID,
    //             address: location.address,
    //             // city_name: location.city.city_name,
    //             province_name: location.province.province_name,
    //             postal_code: location.postal_code,
    //             country: location.country,
    //             geo: location.geo,
    //         }));
    //         setLocationsList(updatedLocationsList);
    //     }
    // }, [contact]);

    const columns = [
        { field: 'ID', headerName: 'ID' },
        { field: 'job_title', headerName: 'Job Title', width: 140 },
        { field: 'job_start', headerName: 'Job Start', width: 110 },
        { field: 'job_end', headerName: 'Job End', width: 110 },
        { field: 'status', headerName: 'Status' },
        { field: 'client_contact_id', headerName: 'Client Contact ID', width: 125 },
    ]

    const locationColumns = [
        { field: 'ID', headerName: 'ID' },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'city_name', headerName: 'City', width: 150, valueGetter: (params) => params.row.city.city_name  },
        { field: 'province_name', headerName: 'Province', width: 150, valueGetter: (params) => params.row.province.province_name  },
        { field: 'postal_code', headerName: 'Postal Code', width: 120 },
        { field: 'country', headerName: 'Country', width: 150 },
        { field: 'geo', headerName: 'Geo', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <div className="flex gap-3">
                    <button className="text-lg" onClick={() => deleteLocation(params.row.id)}>
                        <FaTrash />
                    </button>
                    <button
                        className="text-lg"
                    >
                        <FaEdit />
                    </button>
                </div>
            ),
        },
    ]

    const getRowId = (row) => row.ID

    const deleteLocation = async (event) => {
        try {
            api.delete(`/locations/${event}`)
        } catch (error) {
            console.error(error)
        }
    }

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


                    {/* <div className='py-5'>
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
                    </div> */}
                </div>
            </div>

            <div className='mb-10 w-fit'>
                <div>
                    <p className='font-bold text-xl mb-3'>Locations</p>

                </div>

                <DataGrid
                    rows={locationsList}
                    getRowId={getRowId}
                    columns={locationColumns}
                    sty
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSize={5}
                    pageSizeOptions={[5, 10]}
                />
                <button
                    variant="contained"
                    color="primary"
                    className="bg-red-700 font-bold my-2 text-white text-base text-bold py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none"
                >
                    Add Location
                </button>
            </div>

            <div className='mb-10 w-fit'>
                <p className='font-bold text-xl mb-3'>Employments</p>
                <DataGrid
                    rows={employments}
                    getRowId={getRowId}
                    columns={columns}
                    sty
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            <button onClick={() => setConfirmation(true)} className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"> Delete </button>
            <button type="button" onClick={handleClientClick} className="ml-8 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"> Add Client </button>
            <button className="ml-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleEmploymentClick}>Add Employment</button>

            {confirmation && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute'>
                        <div className='text-center'>
                            <p className='text-xl font-bold mb-2'>Confirmation</p>
                            <p className='mb-5'>Are you sure you want to delete?</p>
                            <div className="items-center justify-center flex gap-6 mt-4">
                                <button type="button" onClick={() => setConfirmation(false)} className="bg-red-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-red-800 focus:outline-none">Cancel</button>
                                <button type="button" onClick={() => handleContactDelete(id)} className="bg-emerald-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-emerald-800 focus:outline-none">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEmploymentForm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute'>
                        <div>
                            <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleEmploymentClose} />
                        </div>
                        <h1 className='text-center py-5'>Add Employment</h1>

                        <form onSubmit={handleEmploymentFormSubmit}>
                            <div className='pb-2'>
                                <label htmlFor="client_id" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Clients</label>
                                <select onChange={handleClientChange} id='client_id' name='client_id' className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'>
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
                                <label htmlFor="job_title" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job Title</label>
                                <input onChange={handleEmploymentChange} id='job_title' name='job_title' type="text" placeholder='Job title' className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5' />
                                {errors.job_title && <p className="text-red-500">{errors.job_title}</p>}
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="job_start" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job Start</label>
                                <input onChange={handleEmploymentChange} type="date" name="job_start" id="job_start" className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5' />
                                {errors.job_start && <p className="text-red-500">{errors.job_start}</p>}
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="job_end" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job End</label>
                                <input onChange={handleEmploymentChange} type="date" name="job_end" id="job_end" className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5' />
                                {errors.job_end && <p className="text-red-500">{errors.job_end}</p>}
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="status" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Status</label>
                                <select onChange={handleEmploymentChange} name='status' id='status' className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'>
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

            {showAddClient && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute text-center'>
                        <div>
                            <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleClientClose} />
                        </div>
                        <h1 className="text-lg mb-2">
                            Add Client
                        </h1>
                        {showSelectField &&
                            <div>
                                <label htmlFor="client"
                                    className="text-left block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Select Client
                                </label>
                                <select id="clients" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5" value={fetchedClient} onChange={(e) => {
                                    // const value = e.target.value
                                    // if (value === "addContact") {
                                    //     handleShowField()
                                    // }
                                    const selectedClientId = parseInt(e.target.value, 10);
                                    setFetchedClient(selectedClientId);
                                }}>
                                    <option value="">Select Client</option>
                                    {Array.isArray(clientList.data) &&
                                        clientList.data.map((client) => (
                                            <option key={client.ID} value={client.ID}>
                                                {client.client_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        }

                        {showField &&
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
                        }
                        <div className="items-center justify-center flex gap-6 mt-6">
                            <button type="button" onClick={handleClientClose} className="bg-red-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-red-800 focus:outline-none">Cancel</button>
                            {buttonType &&
                                <button type="button" onClick={handleShowInputField} className="bg-slate-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-slate-800 focus:outline-none">Add</button>
                            }
                            {!buttonType &&
                                <button type="button" onClick={handleShowSelectField} className="bg-slate-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-slate-800 focus:outline-none">Select</button>
                            }
                            <button type="button" onClick={handleClientSubmit} className="bg-emerald-700 font-bold text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-emerald-800 focus:outline-none">Submit</button>
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