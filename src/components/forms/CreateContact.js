import React, { useState } from 'react'
import { Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import api from '../../api/posts';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const CreateContact = () => {

    const birthDate = new Date().toISOString();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateString, setSelectedDateString] = useState('');
    const [dateStr, setDateStr] = useState('');
    const [rfc3339Date, setRFC3339Date] = useState('');

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
        contact_emails: [''],
        contact_phones: [''],
        contact_social_presence: {
            linkedin: "",
            facebook: "",
            twitter: "",
            github: "",
            other: [],
        },
        birth_date: birthDate,
        religion: "",
        interests: [''],
        skills: [''],
        educations: [''],
        notes: [''],
        locations: [],
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

        if (contact.gender != "P" || contact.gender != "L") {
            errors.gendertype = "Gender must be P or L";
        }

        if (!contact.birth_date.trim()) {
            errors.birth = message;
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await api.post('/prospect/create', contact);
        console.log('Data sent successfully:', response.contact);
    }

    const handleInputChange = (event, index, field) => {
        const { value } = event.target;
        const updatedValues = [...contact[field]];
        updatedValues[index] = value;
        setContact((prevContact) => ({
            ...prevContact,
            [field]: updatedValues,
        }));
    };

    const handleAddField = (field) => {
        setContact((prevContact) => ({
            ...prevContact,
            [field]: [...prevContact[field], ''],
        }));
    };

    const handleRemoveField = (index, field) => {
        const updatedValues = [...contact[field]];
        updatedValues.splice(index, 1);
        setContact((prevContact) => ({
            ...prevContact,
            [field]: updatedValues,
        }));
    };

    const handleChange = (field, values) => {
        if (field === "birth_date") {
            const formattedDate = moment(values, 'MM/DD/YYYY').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            setContact({ ...contact, [field]: formattedDate });
            setSelectedDateString(formattedDate);
        } else {
            setContact({ ...contact, [field]: values });
        }

    };

    return (
        <section className="flex flex-col justify-center content-center py-5">
            <div className="max-w-full items-center justify-center flex">
                <div className="px-7 py-1 text-center">
                    <h2 className="text-xl py-2 font-semibold leading-7 text-gray-900">Create new contact</h2>
                    <p className="text-base leading-6 text-gray-600">
                        Please insert data for the new contact.
                    </p>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Contact Name
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                            id="name"
                            value={contact.contact_name}
                            onChange={(event) => handleChange('contact_name', event.target.value)}
                            placeholder='Insert Contact Name' />
                        {errors.name && <p className="text-red-500 text-sm pt-1 pl-1">{errors.name}</p>}
                        <label
                            htmlFor="alias"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Alias
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                            id="alias"
                            value={contact.contact_alias}
                            onChange={(event) => handleChange('contact_alias', event.target.value)}
                            placeholder='Insert Contact Name' />
                        {errors.alias && <p className="text-red-500 text-sm pt-1 pl-1">{errors.alias}</p>}
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Gender
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                            id="gender"
                            value={contact.gender}
                            onChange={(event) => handleChange('gender', event.target.value)}
                            placeholder='Insert Contact Name' />
                        {errors.gender && <p className="text-red-500 text-sm pt-1 pl-1">{errors.gender}</p>}
                        <label
                            htmlFor="emails"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Emails
                        </label>
                        {contact.contact_emails.map((email, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                    value={email}
                                    onChange={(event) => handleInputChange(event, index, 'contact_emails')}
                                    placeholder="Insert email"
                                />
                                {index === contact.contact_emails.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500"
                                        onClick={() => handleAddField('contact_emails')}>
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => handleRemoveField(index, 'contact_emails')}>
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        {contact.contact_phones.map((phones, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5"
                                    value={phones}
                                    onChange={(event) => handleInputChange(event, index, 'contact_phones')}
                                    placeholder="Insert email"
                                />
                                {index === contact.contact_phones.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500"
                                        onClick={() => handleAddField('contact_phones')}>
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => handleRemoveField(index, 'contact_phones')}>
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <div class="relative max-w-sm">

                            {/* <input datepicker datepicker-autohide type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Select date" /> */}
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    const formattedDate = moment(date).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                                    handleChange('birth_date', formattedDate);
                                    setSelectedDate(date);
                                    setSelectedDateString(formattedDate);
                                }}
                                dateFormat="MM/dd/yyyy"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                placeholderText="Select date"
                            />
                            <div class="absolute text-red-700 inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                <CalendarTodayIcon />
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-2 bg-red-800 text-white text-base text-bold py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateContact