import React, { useEffect, useState } from 'react'
import { FaTimes, FaTrash, FaEdit } from 'react-icons/fa'
import { createLocation, updateLocation,  getLocationByClientID, getLocationByContactID, deleteLocation } from '../../api/services/Location'
import { useLocation, useParams } from 'react-router-dom'
import { getAllProvinces } from '../../api/services/Province'
import { getAllCities, getCityFiltered } from '../../api/services/City'
import { DataGrid } from '@mui/x-data-grid'

const LocationTable = () => {
    const { id } = useParams()
    const url = useLocation()

    const [locations, setLocations] = useState([])
    const [cities, setCities] = useState([])
    const [provinces, setProvinces] = useState([])

    const [locationData, setLocationData] = useState({
        address: "",
        city_id: 0,
        province_id: 0,
        postal_code: "",
        country: "",
        geo: "",
        contact_id: parseInt(id, 10)
    })

    const [showAddLocationForm, setShowAddLocationForm] = useState(false)
    const [locationUpdateData, setLocationUpdateData] = useState({
        address: "",
        city_id: 0,
        province_id: 0,
        postal_code: "",
        country: "",
        geo: "",
    })

    const [showLocationUpdateForm, setShowLocationUpdateForm] = useState(false)

    const handleAddLocationClick = () => {
        setShowAddLocationForm(true)
    }

    const handleAddLocationClose = () => {
        setShowAddLocationForm(false)
        setShowLocationUpdateForm(false)
    }

    const handleLocationUpdateClick = (location) => {
        setLocationUpdateData(location)
        setShowLocationUpdateForm(true)
    }

    const updateLocationData = async (id) => {
        try {
            await updateLocation(id, locationUpdateData)
            setLocationUpdateData({})
            handleAddLocationClose()
        } catch (error) {
            console.error(error)
        }


        fetchLocations()
    }

    const deleteContactLocation = async (id) => {
        try {
            await deleteLocation(id)
        } catch (error) {
            console.error(error)
        }
        fetchLocations()
    }

    const handleLocationChange = async (field, values) => {
        if (field === 'city_id' || field === 'province_id') {
            const sublocationId = parseInt(values, 10)
            if (field === 'province_id') {
                setLocationData({ ...locationData, [field]: sublocationId })
                try {
                    const response = await getCityFiltered(sublocationId)
                    setCities(response)
                } catch (error) {
                    console.error(error)
                }
            } else {
                setLocationData({ ...locationData, [field]: sublocationId })
            }
        } else {
            setLocationData({ ...locationData, [field]: values })
        }
    }

    const handleLocationUpdateChange = async (field, values) => {
        if (field === 'city_id' || field === 'province_id') {
            const sublocationId = parseInt(values, 10)
            if (field === 'province_id') {
                setLocationUpdateData({ ...locationUpdateData, [field]: sublocationId })
                try {
                    const response = await getCityFiltered(sublocationId)
                    setCities(response)
                } catch (error) {
                    console.error(error)
                }
            } else {
                setLocationUpdateData({ ...locationUpdateData, [field]: sublocationId })
            }
        } else {
            setLocationUpdateData({ ...locationUpdateData, [field]: values })
        }
    }

    const handleAddLocation = async () => {
        try {
            await createLocation(locationData)

            setLocationData({
                address: "",
                city_id: 0,
                province_id: 0,
                postal_code: "",
                country: "",
                geo: "",
                contact_id: parseInt(id, 10)
            })
            setShowAddLocationForm(false)
            fetchLocations()
        } catch (error) {
            console.error(error)
        }
    }

    const fetchProvinces = async () => {
        try {
            const response = await getAllProvinces()
            setProvinces(response)
            
        } catch (error) {
            console.error('Failed to fetch provinces:', error)
        }
    }

    const fetchCities = async () => {
        try {
            const response = await getAllCities()
            setCities(response)
        } catch (error) {
            console.error('Failed to fetch cities:', error)
        }
    }

    const fetchLocations = async () => {
        try {
            let res = ''
            if (url.pathname.includes('/client/')) {
                console.log("client")
                res = await getLocationByClientID(id)
            } else if (url.pathname.includes('/contact/')) {
                res = await getLocationByContactID(id)
                console.log("contact")
            }
            setLocations(res.data)
        } catch (error) {
            console.error("Failed to fetch locations")
        }
    }

    useEffect(() => {
        console.log(url.pathname)
        fetchCities()
        fetchProvinces()
        fetchLocations()
    }, [])
    
    const getRowId = (row) => row.ID
    const locationColumns = [
        { field: 'ID', headerName: 'ID', headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', align: 'center'},
        { field: 'address', headerName: 'Address', width: 300, headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', align: 'center'},
        { field: 'city_name', headerName: 'City', width: 150, valueGetter: (params) => params.row.city.city_name , headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', align: 'center'},
        { field: 'province_name', headerName: 'Province', width: 150, valueGetter: (params) => params.row.province.province_name, headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', align: 'center'},
        { field: 'postal_code', headerName: 'Postal Code', width: 120, headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', align: 'center'},
        { field: 'country', headerName: 'Country', width: 150, headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', align: 'center'},
        { field: 'geo', headerName: 'Geo', width: 150, headerClassName: 'bg-[#EE3E23] text-white', headerAlign: 'center', align: 'center' },
        {
            field: 'actions',
            headerName: 'Actions',
            headerClassName: 'bg-[#EE3E23] text-white',
            headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <div className="flex gap-3">
                    <button className="text-lg" onClick={() => deleteContactLocation(params.row.ID)}>
                        <FaTrash />
                    </button>
                    <button
                        className="text-lg" onClick={() => handleLocationUpdateClick(params.row)}
                    >
                        <FaEdit />
                    </button>
                </div>
            ),
        },
    ]

    return (
        <div>
            <DataGrid
                rows={locations}
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
            
            <button variant="contained" color="primary" className="bg-red-700 font-bold my-2 text-white text-base text-bold py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none"
                onClick={handleAddLocationClick}
            >
                Add Location
            </button>

            {showAddLocationForm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute text-center'>
                        <div>
                            <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleAddLocationClose} />
                        </div>
                        <h1 className="text-lg mb-2">
                            Add a location
                        </h1>
                        <div className="self-start flex text-left">
                            <div className="w-full self-start text-left">
                                <label htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className='bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5'
                                    id='country'
                                    value={locationData.country}
                                    onChange={(event) => handleLocationChange('country', event.target.value)}
                                    placeholder='Insert Country'
                                />
                                <div className="flex gap-4">
                                    <div className="w-1/2 max-w-full">
                                        <label htmlFor="province"
                                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                            Province
                                        </label>
                                        <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                            id="province"
                                            value={locationData.province_id}
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
                                    </div>
                                    <div className="w-1/2 max-w-full">
                                        <label htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                            City
                                        </label>
                                        <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                            id="city"
                                            value={locationData.city_id}
                                            onChange={(event) => handleLocationChange('city_id', event.target.value)}>
                                            <option value="">Select City</option>
                                            {Array.isArray(cities.data) &&
                                                cities.data.map((city) => (
                                                    <option key={city.ID} value={city.ID}>
                                                        {city.city_name}
                                                    </option>
                                                ))}
                                        </select>
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
                                    value={locationData.address}
                                    onChange={(event) => handleLocationChange('address', event.target.value)}
                                    placeholder='Insert Address'
                                />
                                <label htmlFor="postcode"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="postcode"
                                    value={locationData.postal_code}
                                    onChange={(event) => handleLocationChange('postal_code', event.target.value)}
                                    placeholder='Insert Postal Code'
                                />
                                <label htmlFor="geo"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Geo
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="geo"
                                    value={locationData.geo}
                                    onChange={(event) => handleLocationChange('geo', event.target.value)}
                                    placeholder='Insert Geo'
                                />
                                <div className="flex gap-5 w-full">
                                    <button type="button" onClick={handleAddLocationClose} className="mt-4 font-light bg-red-800 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Cancel</button>
                                    <button type="submit" onClick={handleAddLocation} className="mt-4 font-light bg-emerald-600 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-emerald-700 focus:outline-none">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showLocationUpdateForm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg py-6 px-10 w-1/3 absolute text-center'>
                        <div>
                            <FaTimes className='ml-auto hover:cursor-pointer' onClick={handleAddLocationClose} />
                        </div>
                        <h1 className="text-lg mb-2">
                            Add a location
                        </h1>
                        <div className="self-start flex text-left">
                            <div className="w-full self-start text-left">
                                <label htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className='bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5'
                                    id='country'
                                    value={locationUpdateData.country}
                                    onChange={(event) => handleLocationUpdateChange('country', event.target.value)}
                                    placeholder='Insert Country'
                                />
                                <div className="flex gap-4">
                                    <div className="w-1/2 max-w-full">
                                        <label htmlFor="province"
                                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                            Province
                                        </label>
                                        <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                            id="province"
                                            value={locationUpdateData.province_id}
                                            onChange={(event) => handleLocationUpdateChange('province_id', event.target.value)}
                                        >
                                            <option value="">Select Province</option>
                                            {Array.isArray(provinces.data) &&
                                                provinces.data.map((province) => (
                                                    <option key={province.ID} value={province.ID}>
                                                        {province.province_name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="w-1/2 max-w-full">
                                        <label htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                            City
                                        </label>
                                        <select type="number" className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                            id="city"
                                            value={locationUpdateData.city_id}
                                            onChange={(event) => handleLocationUpdateChange('city_id', event.target.value)}>
                                            <option value="">Select City</option>
                                            {Array.isArray(cities.data) &&
                                                cities.data.map((city) => (
                                                    <option key={city.ID} value={city.ID}>
                                                        {city.city_name}
                                                    </option>
                                                ))}
                                        </select>
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
                                    value={locationUpdateData.address}
                                    onChange={(event) => handleLocationUpdateChange('address', event.target.value)}
                                    placeholder='Insert Address'
                                />
                                <label htmlFor="postcode"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="postcode"
                                    value={locationUpdateData.postal_code}
                                    onChange={(event) => handleLocationUpdateChange('postal_code', event.target.value)}
                                    placeholder='Insert Postal Code'
                                />
                                <label htmlFor="geo"
                                    className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                                    Geo
                                </label>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="bg-gray-100 border w-full border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block pb-2 p-2.5"
                                    id="geo"
                                    value={locationUpdateData.geo}
                                    onChange={(event) => handleLocationUpdateChange('geo', event.target.value)}
                                    placeholder='Insert Geo'
                                />
                                <div className="flex gap-5 w-full">
                                    <button type="button" onClick={handleAddLocationClose} className="mt-4 font-light bg-red-800 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Cancel</button>
                                    <button type="submit" onClick={() => updateLocationData(locationUpdateData.ID)} className="mt-4 font-light bg-emerald-600 text-white text-base text-bold w-full py-2 px-4 max-w-full rounded-md hover:bg-emerald-700 focus:outline-none">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        

    )
}

export default LocationTable