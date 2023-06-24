import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { getLatestClient, createClient } from '../../api/services/Client';
import api from '../../api'

const CreateClient = () => {

    const [client, setClient] = useState({
        client_code: "",
        client_name: "",
        alias: "",
        website: "",
        client_social_presence: {
            linkedin: "",
            facebook: "",
            twitter: "",
            github: "",
            other: [],
        },
        subsidiary: {
            subsidiaries: [],
            immidiate_parents: [],
            ultimate_parents: [],
        },
        date: "",
        locations: [],
    })

    const [inputValues, setInputValues] = useState({
        other: '',
        subsidiaries: '',
        immidiate_parents: '',
        ultimate_parents: '',
    })

    const handleChange = (field, values) => {
        if (["linkedin", "facebook", "twitter", "github"].includes(field)) {
            setClient((prevClient) => ({
                ...prevClient,
                client_social_presence: {
                    ...prevClient.client_social_presence,
                    [field]: values,
                }
            }))
        } else {
            setClient({ ...client, [field]: values })
        }
    }

    const [locations, setLocations] = useState({
        address: "",
        city_id: 0,
        province_id: 0,
        postal_code: "",
        country: "",
        geo: "",
        client_id: 0
    })

    const [currentStep, setCurrentStep] = useState(1)

    const [cities, setCities] = useState([])
    const [provinces, setProvinces] = useState([])

    const [showConfirmation, setShowConfirmation] = useState(false)

    const [latestClient, setLatestClient] = useState(0)

    const handlePrevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleNextStep = async () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleTagInputChange = (event, field) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [field]: event.target.value,
        }));
    };

    const handleKeyPress = (event, field) => {
        if (event.key === 'Enter' && inputValues[field].trim() !== '') {
            event.preventDefault();
            setClient((prevClient) => {
                if (field === 'other') {
                    return {
                        ...prevClient,
                        client_social_presence: {
                            ...prevClient.client_social_presence,
                            other: [...prevClient.client_social_presence.other, inputValues[field].trim()],
                        },
                    };
                } else if (["subsidiaries", "immidiate_parents", "ultimate_parents"].includes(field)) {
                    return {
                        ...prevClient,
                        subsidiary: {
                            ...prevClient.subsidiary,
                            [field]: [...prevClient.subsidiary[field], inputValues[field].trim()],
                        },
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
        setClient((prevClient) => {
            if (field === 'other') {
                return {
                    ...prevClient,
                    client_social_presence: {
                        ...prevClient.client_social_presence,
                        other: prevClient.client_social_presence.other.filter((t) => t !== tag),
                    },
                };
            } else if (["subsidiaries", "immidiate_parents", "ultimate_parents"].includes(field)) {
                return {
                    ...prevClient,
                    subsidiary: {
                        ...prevClient.subsidiary,
                        [field]: prevClient.subsidiary[field].filter((t) => t !== tag),
                    },
                };
            }
        });
    };

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

    const fetchLatestClient = async () => {
        try {
            const response = await getLatestClient()
            setLatestClient(response.data)
            setLocations((prevLocations) => ({
                ...prevLocations,
                client_id: response.data.data.ID
            }))
        } catch (error) {
            console.error('Failed to fetch data:', error)
        }
    }

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

    const navigate = useNavigate()

    const handleSubmitLocation = async (event) => {
        event.preventDefault();
        const { client_id, ...fieldsWithoutClienttId } = locations;

        const isFieldsEmpty = Object.values(fieldsWithoutClienttId).every((value) => {
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
                const id = locations.client_id
                console.log(id)
                navigate(`/contact/read/${id}`);
            } catch (error) {
                console.error('Failed to create location', error);
            }
        }
    }

    const printClient = () => {
        console.log(client)
    }

    const handleConfirmationClick = (event) => {
        event.preventDefault()
        setShowConfirmation(true)
    }

    const handleConfirmationClose = () => {
        setShowConfirmation(false)
    }

    const handleConfirmationSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await createClient(client)
            console.log('Data sent successfully:', response.client)
            fetchLatestClient()
            console.log(locations)
            handleNextStep()
        } catch (error) {
            console.error('Failed to send data:', error)
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
                    client_id: 0
                });

                fetchLatestClient()
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

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="py-1 text-center">
                            <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Client Info</h2>
                        </div>
                        <div>
                            <label htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Client Name
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                id="name"
                                value={client.client_name}
                                onChange={(event) => handleChange('client_name', event.target.value)}
                                placeholder='Insert Client Name' />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="alias"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Client Alias
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                    id="alias"
                                    value={client.alias}
                                    onChange={(event) => handleChange('alias', event.target.value)}
                                    placeholder='Insert Client Alias' />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="code"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Client Code
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                    id="code"
                                    value={client.client_code}
                                    onChange={(event) => handleChange('client_code', event.target.value)}
                                    placeholder='Insert Client Code' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="website"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Client Website
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                id="website"
                                value={client.website}
                                onChange={(event) => handleChange('website', event.target.value)}
                                placeholder='Insert Client Website' />
                        </div>
                        <div>
                            <label htmlFor="estdate"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Establish Date
                            </label>
                            <input
                                type="date"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                id="date"
                                value={client.date}
                                onChange={(event) => handleChange('date', event.target.value)}
                                placeholder='Insert Client Establish Date' />
                        </div>
                        <div>
                            <label htmlFor="linkedin"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                LinkedIn
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                id="linkedin"
                                value={client.client_social_presence.linkedin}
                                onChange={(event) => handleChange('linkedin', event.target.value)}
                                placeholder='Insert LinkedIn url' />
                        </div>
                        <div>
                            <label htmlFor="facebook"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Facebook
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                id="facebook"
                                value={client.client_social_presence.facebook}
                                onChange={(event) => handleChange('facebook', event.target.value)}
                                placeholder='Insert Facebook url' />
                        </div>
                        <div>
                            <label htmlFor="facebook"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Twitter
                            </label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-full block pb-2 mb-2 p-2.5"
                                id="facebook"
                                value={client.client_social_presence.twitter}
                                onChange={(event) => handleChange('twitter', event.target.value)}
                                placeholder='Insert Twitter url' />
                        </div>
                        <div className="flex gap-4">
                            <label
                                htmlFor="others"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Other
                            </label>
                            <div className="mt-1">
                                {client.client_social_presence.other.map((tag) => (
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
                        <button type="button" onClick={handleNextStep} className="mt-4 bg-red-800 font-light text-white text-base text-bold w-full py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                    </>
                )
            case 2:
                return (
                    <>
                        <div className="py-1 text-center">
                            <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Subsidiary</h2>
                        </div>
                        <div className="flex gap-4">
                            <label
                                htmlFor="subsidiaries"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Subsidiaries
                            </label>
                            <div className="mt-1">
                                {client.subsidiary.subsidiaries.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('subsidiaries', tag)}
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
                                value={inputValues.subsidiaries}
                                onChange={(event) => handleTagInputChange(event, 'subsidiaries')}
                                placeholder="Insert subsidiary"
                                onKeyDown={(event) => handleKeyPress(event, 'subsidiaries')}
                            />
                        </div>

                        <div className="flex gap-4">
                            <label
                                htmlFor="immiparents"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Immidiate Parents
                            </label>
                            <div className="mt-1">
                                {client.subsidiary.immidiate_parents.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('immidiate_parents', tag)}
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
                                value={inputValues.immidiate_parents}
                                onChange={(event) => handleTagInputChange(event, 'immidiate_parents')}
                                placeholder="Insert immidiate parents"
                                onKeyDown={(event) => handleKeyPress(event, 'immidiate_parents')}
                            />
                        </div>

                        <div className="flex gap-4">
                            <label
                                htmlFor="ultiparents"
                                className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                Ultimate Parents
                            </label>
                            <div className="mt-1">
                                {client.subsidiary.ultimate_parents.map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">
                                        {tag}
                                        <button
                                            className="ml-2 text-slate-900 hover:text-red-600"
                                            onClick={() => handleRemoveTag('ultimate_parents', tag)}
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
                                value={inputValues.ultimate_parents}
                                onChange={(event) => handleTagInputChange(event, 'ultimate_parents')}
                                placeholder="Insert immidiate parents"
                                onKeyDown={(event) => handleKeyPress(event, 'ultimate_parents')}
                            />
                        </div>
                        <div className="flex gap-5 w-full">
                            <button type="button" onClick={handlePrevStep} className="mt-4 bg-red-800 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Prev</button>
                            <button type="button" onClick={handleConfirmationClick} className="mt-4 bg-red-800 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                            <button type="button" onClick={printClient} className="mt-4 bg-red-800 font-light text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Print</button>
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
                                    <button type="submit" onClick={handleSubmitLocation} className="mt-4 font-light bg-emerald-700 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-emerald-700 focus:outline-none">Submit & Exit</button>
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
                    <h2 className="text-xl py-2 font-semibold leading-7 text-gray-900">Create new client</h2>
                    <p className="text-base leading-6 text-gray-600">
                        Please insert data for the new client.
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

export default CreateClient