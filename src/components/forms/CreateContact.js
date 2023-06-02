import React, { useState, useEffect } from 'react'
import api from '../../api/posts';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { FaPlus, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateContact = () => {

    const birthDate = new Date().toISOString();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateString, setSelectedDateString] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const handlePrevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const convertToRFC3339 = (dateStr) => {
        const date = moment(dateStr, 'DD MMM YYYY');
        const rfc3339 = date.toISOString();
        return rfc3339;
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
        birth_date: birthDate,
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

        if (!locations.address.trim()) {
            errors.location = message;
        }

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
        setCurrentStep((prevStep) => prevStep + 1);
        if (currentStep === 2) {
            try {
                const response = await api.post('/contact/create', contact);
                console.log('Data sent successfully:', response.contact);
            } catch (error) {
                console.error('Failed to send data:', error);
            }
            fetchLatestContact()
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

        if (!contact.gender.trim()) {
            errors.gender = message;
        }

        if (contact.gender !== "P" || contact.gender !== "L") {
            errors.gendertype = "Gender must be P or L";
        }

        if (!contact.birth_date.trim()) {
            errors.birth = message;
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
                navigate('/dashboard');
            } catch (error) {
                console.error('Failed to create location', error);
            }
        } else {
            navigate('/dashboard');
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

    // const handleTagInputChange = (event, field) => {
    //     setInputValues((prevInputValues) => ({
    //         ...prevInputValues,
    //         [field]: event.target.value,
    //     }));
    // };
    // const handleKeyPress = (event, field) => {
    //     if (event.key === 'Enter' && inputValues[field].trim() !== '') {
    //         event.preventDefault()
    //         console.log(inputValues)
    //         console.log(contact)
    //         setContact((prevContact) => ({
    //             ...prevContact,
    //             [field]: [...prevContact[field], inputValues[field].trim()],
    //         }));
    //         setInputValues((prevInputValues) => ({
    //             ...prevInputValues,
    //             [field]: '',
    //         }));
    //     }
    // };

    // const handleRemoveTag = (field, tag) => {
    //     setContact((prevContact) => ({
    //         ...prevContact,
    //         [field]: prevContact[field].filter((t) => t !== tag),
    //     }));
    // };

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

    const handleOtherInputChange = (event, field, index) => {
        const { value } = event.target;
        setContact((prevContact) => ({
            ...prevContact,
            contact_social_presence: {
                ...prevContact.contact_social_presence,
                other: prevContact.contact_social_presence.other.map((item, idx) =>
                    idx === index ? value : item
                ),
            },
        }));
    };

    const handleOtherAddField = () => {
        setContact((prevContact) => ({
            ...prevContact,
            contact_social_presence: {
                ...prevContact.contact_social_presence,
                other: [...prevContact.contact_social_presence.other, ''],
            },
        }));
    };

    const handleOtherRemoveField = (index) => {
        setContact((prevContact) => ({
            ...prevContact,
            contact_social_presence: {
                ...prevContact.contact_social_presence,
                other: prevContact.contact_social_presence.other.filter(
                    (_, idx) => idx !== index
                ),
            },
        }));
    };

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
            setSelectedDateString(values);
        } else {
            setContact({ ...contact, [field]: values });
        }

    }

    const handleLocationChange = (field, values) => {
        if (field === 'city_id' || field === 'province_id') {
            const id = parseInt(values, 10)
            setLocations({ ...locations, [field]: id })
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
                                    placeholder='Insert Contact Name' />
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
                                    const selectedDate = new Date(event.target.value);
                                    const formattedDate = selectedDate.toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    }).split('/').reverse().join('/');
                                    handleChange('birth_date', formattedDate);
                                    setSelectedDateString(formattedDate);
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
                        <button type="button" onClick={handleNextStep} className="mt-4 bg-red-800 text-white text-base text-bold w-full py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                        <button type="button" onClick={printContact} className="mt-4 bg-red-800 text-white text-base text-bold w-full py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Print</button>
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
                            <button type="button" onClick={handlePrevStep} className="mt-4 bg-red-800 text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Prev</button>
                            <button type="submit" onClick={handleNextStep} className="mt-4 bg-red-800 text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="flex gap-8">
                            <div className="w-1/2">
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
                                    <button type="button" onClick={handleAddLocation} className="mt-4 bg-red-800 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Add Location</button>
                                    <button type="button" onClick={handleClearForm} className="mt-4 bg-red-800 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Clear</button>
                                    <button type="submit" onClick={handleSubmitLocation} className="mt-4 bg-red-800 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Submit & Exit</button>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="pl-1 py-1 text-left">
                                    <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Data</h2>
                                </div>
                            </div>
                        </div>

                    </>
                )
        }
    }

    return (
        <section className="flex items-center justify-center py-5">
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
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateContact