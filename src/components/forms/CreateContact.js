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
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = async () => {
        setCurrentStep((prevStep) => prevStep + 1);
        if (currentStep === 2) {
            const response = await api.post('/prospect/create', contact);
            console.log('Data sent successfully:', response.contact);
        }
    };

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
        contact_emails: [''],
        contact_phones: [''],
        contact_social_presence: {
            linkedin: "",
            facebook: "",
            twitter: "",
            github: "",
            other: [''],
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

        if (contact.gender !== "P" || contact.gender !== "L") {
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
        }))
    }

    const handleAddField = (field) => {
        setContact((prevContact) => ({
            ...prevContact,
            [field]: [...prevContact[field], ''],
        }))
    }

    const handleRemoveField = (index, field) => {
        const updatedValues = [...contact[field]];
        updatedValues.splice(index, 1);
        setContact((prevContact) => ({
            ...prevContact,
            [field]: updatedValues,
        }))
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

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="pl-1 py-1 text-left">
                            <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Contact Info</h2>
                        </div>
                        <label htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Contact Name
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
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
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                            id="alias"
                            value={contact.contact_alias}
                            onChange={(event) => handleChange('contact_alias', event.target.value)}
                            placeholder='Insert Contact Name' />
                        {errors.alias && <p className="text-red-500 text-sm pt-1 pl-1">{errors.alias}</p>}
                        <label htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Gender
                        </label>
                        <select
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
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
                        <label htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Religion
                        </label>
                        <select
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
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
                        <label
                            htmlFor="emails"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Birth Date
                        </label>
                        <div class="relative max-w-sm" className="w-full">
                            <input
                                type="date"
                                class="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 p-2.5"
                                placeholder="Select date"
                                onChange={(event) => {
                                    const selectedDate = new Date(event.target.value);
                                    const formattedDate = selectedDate.toISOString();
                                    handleChange('birth_date', formattedDate);
                                    setSelectedDateString(formattedDate);
                                }} />
                        </div>
                        <label
                            htmlFor="emails"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Emails
                        </label>
                        {contact.contact_emails.map((email, index) => (
                            <div key={index} className="flex items-center pb-2">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                                    value={email}
                                    onChange={(event) => handleInputChange(event, index, 'contact_emails')}
                                    placeholder="Insert email"
                                />
                                {index === contact.contact_emails.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500 mx-1"
                                        onClick={() => handleAddField('contact_emails')}>
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500 mx-1"
                                        onClick={() => handleRemoveField(index, 'contact_emails')}>
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <label
                            htmlFor="contact_numbers"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Phone Numbers
                        </label>
                        {contact.contact_phones.map((phones, index) => (
                            <div key={index} className="flex items-center pb-2">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                                    value={phones}
                                    onChange={(event) => handleInputChange(event, index, 'contact_phones')}
                                    placeholder="Insert phone numbers"
                                />
                                {index === contact.contact_phones.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500 mx-1"
                                        onClick={() => handleAddField('contact_phones')}>
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500 mx-1"
                                        onClick={() => handleRemoveField(index, 'contact_phones')}>
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <label
                            htmlFor="interests"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Interests
                        </label>
                        {contact.interests.map((interests, index) => (
                            <div key={index} className="flex items-center pb-2">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                                    value={interests}
                                    onChange={(event) => handleInputChange(event, index, 'interests')}
                                    placeholder="Insert interest"
                                />
                                {index === contact.interests.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500 mx-1"
                                        onClick={() => handleAddField('interests')}>
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500 mx-1"
                                        onClick={() => handleRemoveField(index, 'interests')}>
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <label
                            htmlFor="skills"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Skills
                        </label>
                        {contact.skills.map((skills, index) => (
                            <div key={index} className="flex items-center pb-2">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                                    value={skills}
                                    onChange={(event) => handleInputChange(event, index, 'skills')}
                                    placeholder="Insert skill"
                                />
                                {index === contact.skills.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500 mx-1"
                                        onClick={() => handleAddField('skills')}>
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500 mx-1"
                                        onClick={() => handleRemoveField(index, 'skills')}>
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <label
                            htmlFor="educations"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Educations
                        </label>
                        {contact.educations.map((educations, index) => (
                            <div key={index} className="flex items-center pb-2">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                                    value={educations}
                                    onChange={(event) => handleInputChange(event, index, 'educations')}
                                    placeholder="Insert education"
                                />
                                {index === contact.educations.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500 mx-1"
                                        onClick={() => handleAddField('educations')}>
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500 mx-1"
                                        onClick={() => handleRemoveField(index, 'educations')}>
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <label htmlFor="notes"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Notes
                        </label>
                        <textarea
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5 resize-none"
                            id="notes"
                            value={contact.notes}
                            onChange={(event) => handleChange('notes', event.target.value)} />
                        <button type="button" onClick={handleNextStep} className="mt-4 bg-red-800 text-white text-base text-bold w-10/12 py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                    </>
                )
            case 2:
                return (
                    <>
                        <div className="pl-1 py-1 text-left">
                            <h2 className="text-lg py-2 font-semibold leading-7 text-gray-900">Social Presence</h2>
                        </div>
                        <label htmlFor="linkedin"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            LinkedIn
                        </label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
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
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
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
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
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
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                            id="github"
                            value={contact.contact_social_presence.github}
                            onChange={(event) => handleChange('github', event.target.value)}
                            placeholder='Insert Github url' />
                        <label
                            htmlFor="others"
                            className="block text-sm font-medium leading-6 text-gray-900 py-1 pl-1">
                            Other
                        </label>
                        {contact.contact_social_presence.other.map((value, index) => (
                            <div key={index} className="flex items-center pb-2">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-10/12 pb-2 p-2.5"
                                    value={value}
                                    onChange={(event) => handleOtherInputChange(event, 'other', index)}
                                    placeholder="Insert other urls"
                                />
                                {index === contact.contact_social_presence.other.length - 1 && (
                                    <button
                                        type="button"
                                        className="text-green-500 mx-1"
                                        onClick={handleOtherAddField}
                                    >
                                        <AddIcon />
                                    </button>
                                )}
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="text-red-500 mx-1"
                                        onClick={() => handleOtherRemoveField(index)}
                                    >
                                        <RemoveIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex gap-5 w-10/12">
                            <button type="button" onClick={handlePrevStep} className="mt-4 bg-red-800 text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Prev</button>
                            <button type="submit" onClick={handleNextStep} className="mt-4 bg-red-800 text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Next</button>
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <button type="submit" onClick={handleSubmit} className="mt-4 bg-red-800 text-white text-base text-bold py-2 px-4 w-1/2 max-w-full rounded-md hover:bg-amber-700 focus:outline-none">Submit</button>
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
                    <form onSubmit={handleSubmit} className="w-full items-center content-center">
                        {renderFormStep()}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateContact