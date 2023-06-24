import React, { useState, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import api from '../../api/api'

const CreateContact = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [snackbarErrors, setSnackBarErrors] = useState('')

    const handleSnackbarClose = () => {
        setSnackBarErrors('');
    };

    const handlePrevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const [contact, setContact] = useState({
        contact_name: "",
        contact_alias: "",
        gender: "",
        contact_emails: [],
        contact_phones: [],
        contact_social_presence: {
            linkedin: "",
            facebook: "",
            twitter: "",
            github: "",
            other: [],
        },
        birth_date: "",
        religion: "",
        interests: [],
        skills: [],
        educations: [],
        notes: "",
        locations: [],
    })

    const [cities, setCities] = useState([])
    const [provinces, setProvinces] = useState([])

    const [latestContact, setLatestContact] = useState(0)

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await api.get('/province/read')
                setProvinces(response.data)
            } catch (error) {
                console.error('Failed to fetch provinces:', error)
            }
        }

        const fetchCities = async () => {
            try {
                const response = await api.get('/city/read')
                setCities(response.data)
            } catch (error) {
                console.error('Failed to fetch cities:', error)
            }
        }

        fetchProvinces()
        fetchCities()
    }, [])

    const fetchLatestContact = async () => {
        try {
            const response = await api.get('/contact/latest');
            setLatestContact(response.data);
            setLocations((prevLocations) => ({
                ...prevLocations,
                contact_id: response.data.data.ID
            }));
        } catch (error) {
            console.error('Failed to fetch latest contact:', error);
        }
    };

    const [locationErrors, setLocationErrors] = useState({})
    const validateLocationForm = () => {
        const errors = {}
        const message = "This field is required"

        if (locations.province_id === 0) {
            errors.province_id = message;
        }

        if (locations.city_id === 0) {
            errors.city_id = message;
        }

        if (!locations.postal_code.trim()) {
            errors.postal_code = message;
        }

        if (!locations.country.trim()) {
            errors.country = message;
        }

        if (!locations.address.trim()) {
            errors.address = message;
        }

        setLocationErrors(errors)
        return Object.keys(errors).length === 0;
    }

    const handleNextStep = async () => {
        if (currentStep === 1) {
            const isValid = validateForm()

            if (isValid) {
                setCurrentStep((prevStep) => prevStep + 1);
            } else {
                setSnackBarErrors('Please fill all required fields')
            }
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const [locations, setLocations] = useState({
        address: "",
        city_id: 0,
        province_id: 0,
        postal_code: "",
        country: "",
        geo: "",
        contact_id: 0
    })

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const errors = {};
        const message = "This field is required"

        if (!contact.contact_name.trim()) {
            errors.name = message;
        }

        if (!contact.contact_alias.trim()) {
            errors.alias = message;
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const navigate = useNavigate()

    const handleSubmitLocation = async (event) => {
        event.preventDefault();
        const { contact_id, ...fieldsWithoutContactId } = locations;

        const isFieldsEmpty = Object.values(fieldsWithoutContactId).every((value) => {
            if (typeof value === "string") {
                return value === "";
            }
            if (typeof value === "number") {
                return value === 0;
            }
            return true;
        });

        if (!isFieldsEmpty) {
            try {
                await api.post('/locations/create', locations);
                const id = locations.contact_id
                console.log(id)
                navigate(`/contact/read/${id}`);
            } catch (error) {
                console.error('Failed to create location', error);
            }
        } else {
            const id = locations.contact_id
            navigate(`/contact/read/${id}`);
        }
    }

    const [inputValues, setInputValues] = useState({
        contact_emails: '',
        contact_phones: '',
        interests: '',
        skills: '',
        educations: '',
        other: '',
    });

    const handleTagInputChange = (event, field) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [field]: event.target.value,
        }));
    };

    const handleKeyPress = (event, field) => {
        if (event.key === 'Enter' && inputValues[field].trim() !== '') {
            event.preventDefault();
            setContact((prevContact) => {
                if (field === 'other') {
                    return {
                        ...prevContact,
                        contact_social_presence: {
                            ...prevContact.contact_social_presence,
                            other: [...prevContact.contact_social_presence.other, inputValues[field].trim()],
                        },
                    };
                } else {
                    return {
                        ...prevContact,
                        [field]: [...prevContact[field], inputValues[field].trim()],
                    };
                }
            });
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [field]: '',
            }));
        }
    };

    const handleRemoveTag = (field, tag) => {
        setContact((prevContact) => {
            if (field === 'other') {
                return {
                    ...prevContact,
                    contact_social_presence: {
                        ...prevContact.contact_social_presence,
                        other: prevContact.contact_social_presence.other.filter((t) => t !== tag),
                    },
                };
            } else {
                return {
                    ...prevContact,
                    [field]: prevContact[field].filter((t) => t !== tag),
                };
            }
        });
    };

    const printContact = () => {
        console.log(contact)
    }

    const handleChange = (field, values) => {
        if (["linkedin", "facebook", "twitter", "github"].includes(field)) {
            setContact((prevState) => ({
                ...prevState,
                contact_social_presence: {
                    ...prevState.contact_social_presence,
                    [field]: values,
                },
            }))
        }
        else if (field === "birth_date") {
            setContact({ ...contact, [field]: values });
        } else {
            setContact({ ...contact, [field]: values });
        }
    }

    const handleLocationChange = async (field, values) => {
        if (field === 'city_id' || field === 'province_id') {
            const id = parseInt(values, 10)
            if (field === 'province_id') {
                setLocations({ ...locations, [field]: id })
                try {
                    const response = await api.get(`/city/filter/${id}`)
                    setCities(response.data)
                } catch (error) {
                    console.log(error)
                }
            } else {
                setLocations({ ...locations, [field]: id})
            }
            console.log([field], values)
        } else {
            setLocations({ ...locations, [field]: values })
        }
    }

    const handleAddLocation = async () => {

        const isValid = validateLocationForm()
        if (isValid) {
            try {
                await api.post('/locations/create', locations);

                setLocations({
                    address: "",
                    city_id: 0,
                    province_id: 0,
                    postal_code: "",
                    country: "",
                    geo: "",
                    contact_id: 0
                });

                fetchLatestContact()
                console.log(locations)
            } catch (error) {
                console.error('Failed to send data:', error);
            }
        }
    }

    const handleClearForm = async () => {
        setLocations({
            address: "",
            city_id: 0,
            province_id: 0,
            postal_code: "",
            country: "",
            geo: ""
        })
    }

    const handleConfirmationClick = (event) => {
        event.preventDefault()
        setShowConfirmation(true)
    }

    const handleConfirmationSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await api.post('/contact/create', contact);
            // console.log('Data sent successfully:', response.contact);
            fetchLatestContact()
            // console.log(locations)
            handleNextStep()
        } catch (error) {
            console.error('Failed to send data:', error);
        }
    }

    const handleConfirmationClose = () => {
        setShowConfirmation(false)
    }

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="py-1 text-center">
                            <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Contact Info</h2>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Contact Name
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                    id="name"
                                    value={contact.contact_name}
                                    onChange={(event) => handleChange('contact_name', event.target.value)}
                                    placeholder='Insert Contact Name' />
                                {errors.name && <p className="text-red-500 text-sm pt-1 pl-1">{errors.name}</p>}
                            </div>
                            <div className="w-1/2">
                                <label
                                    htmlFor="alias"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Alias
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 mb-2 p-2.5"
                                    id="alias"
                                    value={contact.contact_alias}
                                    onChange={(event) => handleChange('contact_alias', event.target.value)}
                                    placeholder='Insert Alias' />
                                {errors.alias && <p className="text-red-500 text-sm pt-1 pl-1">{errors.alias}</p>}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Gender
                                </label>
                                <select
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 mb-2 p-2.5"
                                    id="gender"
                                    value={contact.gender}
                                    onChange={(event) => handleChange('gender', event.target.value)}
                                    placeholder='Select your gender'
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-sm pt-1 pl-1">{errors.gender}</p>}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Religion
                                </label>
                                <select
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 mb-2 p-2.5"
                                    id="religion"
                                    value={contact.religion}
                                    onChange={(event) => handleChange('religion', event.target.value)}
                                    placeholder='Select your religion'
                                >
                                    <option value="">Select Religion</option>
                                    <option value="Buddha">Buddha</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Kristen Protestan">Kristen Protestan</option>
                                    <option value="Katolik">Katolik</option>
                                    <option value="Kong Hu Cu">Kong Hu Cu</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <label
                            htmlFor="birth_date"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Birth Date
                        </label>
                        <div class="relative" className="w-full">
                            <input
                                type="date"
                                class="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 mb-2 p-2.5"
                                placeholder="Select date"
                                onChange={(event) => {
                                    // const selectedDate = new Date(event.target.value);
                                    // const formattedDate = selectedDate.toLocaleDateString('en-GB', {
                                    //     year: 'numeric',
                                    //     month: '2-digit',
                                    //     day: '2-digit'
                                    // }).split('/').reverse().join('-');
                                    handleChange('birth_date', event.target.value);
                                    // setSelectedDateString(formattedDate);
                                }} />
                        </div>
                        <div className="flex gap-4">
                            <label
                                htmlFor="emails"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Emails
                            </label>
                            <div className="mt-1">
                                {contact.contact_emails.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('contact_emails', tag)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pb-2">
                            <input
                                type="text"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                                value={inputValues.contact_emails}
                                onChange={(event) => handleTagInputChange(event, 'contact_emails')}
                                placeholder="Insert emails"
                                onKeyDown={(event) => handleKeyPress(event, 'contact_emails')}
                            />
                        </div>

                        <div className="flex gap-4">
                            <label
                                htmlFor="contact_numbers"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Phone Numbers
                            </label>
                            <div className="mt-1">
                                {contact.contact_phones.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('contact_phones', tag)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pb-2">
                            <input
                                type="text"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                                value={inputValues.contact_phones}
                                onChange={(event) => handleTagInputChange(event, 'contact_phones')}
                                placeholder="Insert phone numbers"
                                onKeyDown={(event) => handleKeyPress(event, 'contact_phones')}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label
                                htmlFor="interests"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Interests
                            </label>
                            <div className="mt-1">
                                {contact.interests.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('interests', tag)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pb-2">
                            <input
                                type="text"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                                value={inputValues.interests}
                                onChange={(event) => handleTagInputChange(event, 'interests')}
                                placeholder="Insert interests"
                                onKeyDown={(event) => handleKeyPress(event, 'interests')}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label
                                htmlFor="skills"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Skills
                            </label>
                            <div className="mt-1">
                                {contact.skills.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('skills', tag)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pb-2">
                            <input
                                type="text"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                                value={inputValues.skills}
                                onChange={(event) => handleTagInputChange(event, 'skills')}
                                placeholder="Insert skills"
                                onKeyDown={(event) => handleKeyPress(event, 'skills')}
                            />
                        </div>

                        <div className="flex gap-4">
                            <label
                                htmlFor="educations"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Educations
                            </label>
                            <div className="mt-1">
                                {contact.educations.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('educations', tag)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pb-2">
                            <input
                                type="text"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                                value={inputValues.educations}
                                onChange={(event) => handleTagInputChange(event, 'educations')}
                                placeholder="Insert educations"
                                onKeyDown={(event) => handleKeyPress(event, 'educations')}
                            />
                        </div>
                        <label htmlFor="notes"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Notes
                        </label>
                        <textarea
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5 resize-none"
                            id="notes"
                            value={contact.notes}
                            onChange={(event) => handleChange('notes', event.target.value)} />
                        <button type="button" onClick={handleNextStep} className="mt-4 bg-red-800 font-light text-white text-base text-bold w-full py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                        {/* <button type="button" onClick={printContact} className="mt-4 bg-red-800 font-light text-white text-base text-bold w-full py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Print</button> */}
                    </>
                )
            case 2:
                return (
                    <>
                        <div className="py-1 text-center">
                            <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Social Presence</h2>
                        </div>
                        <label htmlFor="linkedin"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            LinkedIn
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            id="linkedin"
                            value={contact.contact_social_presence.linkedin}
                            onChange={(event) => handleChange('linkedin', event.target.value)}
                            placeholder='Insert LinkedIn url' />
                        <label htmlFor="facebook"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Facebook
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            id="facebook"
                            value={contact.contact_social_presence.facebook}
                            onChange={(event) => handleChange('facebook', event.target.value)}
                            placeholder='Insert Facebook url' />
                        <label htmlFor="twitter"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Twitter
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            id="twitter"
                            value={contact.contact_social_presence.twitter}
                            onChange={(event) => handleChange('twitter', event.target.value)}
                            placeholder='Insert Twitter url' />
                        <label htmlFor="github"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Github
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            id="github"
                            value={contact.contact_social_presence.github}
                            onChange={(event) => handleChange('github', event.target.value)}
                            placeholder='Insert Github url' />
                        <div className="flex gap-4">
                            <label
                                htmlFor="others"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Other
                            </label>
                            <div className="mt-1">
                                {contact.contact_social_presence.other.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('other', tag)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pb-2">
                            <input
                                type="text"
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                                value={inputValues.other}
                                onChange={(event) => handleTagInputChange(event, 'other')}
                                placeholder="Insert other urls"
                                onKeyDown={(event) => handleKeyPress(event, 'other')}
                            />
                        </div>

                        <div className="flex gap-5 w-full">
                            <button type="button" onClick={handlePrevStep} className="mt-4 bg-red-800 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Prev</button>
                            <button type="button" onClick={handleConfirmationClick} className="mt-4 bg-red-800 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                        </div>

                        {showConfirmation && (
                            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                                <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute text-center'>
                                    <div>
                                        <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleConfirmationClose} />
                                    </div>
                                    <h1 className="text-lg mb-4">
                                        Confirm
                                    </h1>
                                    <h2 class="mb-10 text-lg font-light text-black">Submit and continue to add locations?</h2>
                                    <div className="items-center justify-center flex gap-6">
                                        <button type="button" onClick={handleConfirmationClose} className="bg-red-700 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-red-800 focus:outline-none">Cancel</button>
                                        <button type="button" onClick={handleConfirmationSubmit} className="bg-emerald-700 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-emerald-800 focus:outline-none">Continue</button>
                                    </div>
                                </div>
                            </div>
                            // <div class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            //     <div class="relative w-full max-w-md max-h-full">
                            //         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            //             <button type="button" onClick={handleConfirmationClose} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                            //                 <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            //                 <span class="sr-only">Close modal</span>
                            //             </button>
                            //             <div class="p-6 text-center">
                            //                 <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            //                 <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                            //                 <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            //                     Yes, I'm sure
                            //                 </button>
                            //                 <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>

                            // <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                            //     <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute'>
                            //         <div>
                            //             <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleConfirmationClose} />
                            //         </div>
                            //         <h1 className='text-center py-5'>Add Employment</h1>
                            //         <form onSubmit={handleChange}>
                            //             <div className='pb-2'>
                            //                 <label htmlFor="job_title" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job Title</label>
                            //                 <input id='job_title' name='job_title' type="text" placeholder='Job title' className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5' />
                            //                 {errors.job_title && <p className="text-red-500">{errors.job_title}</p>}
                            //             </div>
                            //             <div className='pb-2'>
                            //                 <label htmlFor="job_start" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job Start</label>
                            //                 <input type="date" name="job_start" id="job_start" className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5' />
                            //                 {errors.job_start && <p className="text-red-500">{errors.job_start}</p>}
                            //             </div>
                            //             <div className='pb-2'>
                            //                 <label htmlFor="job_end" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Job End</label>
                            //                 <input type="date" name="job_end" id="job_end" className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5' />
                            //                 {errors.job_end && <p className="text-red-500">{errors.job_end}</p>}
                            //             </div>
                            //             <div className='pb-2'>
                            //                 <label htmlFor="status" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Status</label>
                            //                 <select name='status' id='status' className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'>
                            //                     <option selected disabled value="select">Select...</option>
                            //                     <option value="active">Active</option>
                            //                     <option value="inactive">Inactive</option>
                            //                 </select>
                            //                 {errors.status && <p className="text-red-500">{errors.status}</p>}
                            //             </div>
                            //             <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded float-right'>Submit</button>
                            //         </form>

                            //     </div>
                            // </div>
                        )}
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="self-start flex text-left">
                            <div className="w-full self-start text-left">
                                <div className="pl-1 py-1 text-center">
                                    <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Locations</h2>
                                </div>
                                <label htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="country"
                                    value={locations.country}
                                    onChange={(event) => handleLocationChange('country', event.target.value)}
                                    placeholder='Insert Country' />
                                {locationErrors.country && <p className="text-red-500 text-sm pt-1 pl-1">{locationErrors.country}</p>}
                                <div className="flex gap-4">
                                    <div className="w-1/2 max-w-full">
                                        <label htmlFor="province"
                                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                            Province
                                        </label>
                                        <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                            id="province"
                                            value={locations.province_id}
                                            onChange={(event) => handleLocationChange('province_id', event.target.value)}
                                        >
                                            <option value="">Select Province</option>
                                            {Array.isArray(provinces.data) &&
                                                provinces.data.map((province) => (
                                                    <option key={province.ID} value={province.ID}>
                                                        {province.province_name}
                                                    </option>
                                                ))}
                                        </select>
                                        {locationErrors.province_id && <p className="text-red-500 text-sm pt-1 pl-1">{locationErrors.province_id}</p>}
                                    </div>

                                    <div className="w-1/2 max-w-full">
                                        <label htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                            City
                                        </label>
                                        <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                            id="city"
                                            value={locations.city_id}
                                            onChange={(event) => handleLocationChange('city_id', event.target.value)}>
                                                <option value="">Select City</option>
                                            {Array.isArray(cities.data) &&
                                                cities.data.map((city) => (
                                                    <option key={city.ID} value={city.ID}>
                                                        {city.city_name}
                                                    </option>
                                                ))}
                                        </select>
                                        {locationErrors.city_id && <p className="text-red-500 text-sm pt-1 pl-1">{locationErrors.city_id}</p>}
                                    </div>

                                </div>

                                <label htmlFor="address"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="address"
                                    value={locations.address}
                                    onChange={(event) => handleLocationChange('address', event.target.value)}
                                    placeholder='Insert Address' />
                                {locationErrors.address && <p className="text-red-500 text-sm pt-1 pl-1">{locationErrors.address}</p>}
                                <label htmlFor="postcode"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="postcode"
                                    value={locations.postal_code}
                                    onChange={(event) => handleLocationChange('postal_code', event.target.value)}
                                    placeholder='Insert Postal Code' />
                                {locationErrors.postal_code && <p className="text-red-500 text-sm pt-1 pl-1">{locationErrors.postal_code}</p>}
                                <label htmlFor="geo"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Geo
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="geo"
                                    value={locations.geo}
                                    onChange={(event) => handleLocationChange('geo', event.target.value)}
                                    placeholder='Insert Geo' />
                                <div className="flex gap-5 w-full">
                                    <button type="button" onClick={handleAddLocation} className="mt-4 font-light bg-slate-600 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-slate-700 focus:outline-none">Add Location</button>
                                    <button type="button" onClick={handleClearForm} className="mt-4 font-light bg-red-800 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Clear</button>
                                    <button type="submit" onClick={handleSubmitLocation} className="mt-4 font-light bg-emerald-600 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-emerald-700 focus:outline-none">Submit & Exit</button>
                                </div>
                            </div>
                        </div>

                    </>
                )
        }
    }

    return (
        <section className="flex justify-center py-5">
            <div className="w-3/5 flex-col items-center content-center justify-center" style={{ userSelect: 'none' }}>
                <div className="px-7 py-1 text-left">
                    <h2 className="text-xl py-2 font-semibold leading-7 text-gray-900">Create new contact</h2>
                    <p className="text-base leading-6 text-gray-600">
                        Please insert data for the new contact.
                    </p>
                </div>
                <div className="px-6 py-4 justify-center items-center content-center flex">
                    <form onSubmit={handleSubmitLocation} className="w-full items-center content-center">
                        {renderFormStep()}
                        <Snackbar open={!!snackbarErrors} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}>
                            <Alert onClose={handleSnackbarClose} severity="error">
                                {snackbarErrors}
                            </Alert>
                        </Snackbar>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateContact