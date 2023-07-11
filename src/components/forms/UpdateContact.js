import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getAllContacts, getContactById, updateContact } from '../../api/services/Contact'

const UpdateContact = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        contact_name: '',
        contact_alias: '',
        gender: '',
        birth_date: '',
        religion: '',
        contact_emails: [],
        contact_phones: [],
        interests: [],
        skills: [],
        educations: [],
        notes: '',
        contact_social_presence: {
            linkedin: '',
            facebook: '',
            twitter: '',
            github: '',
            other: []
        },
    })

    const [inputValues, setInputValues] = useState({
        other: '',
        contact_emails: '',
        contact_phones: '',
        interests: '',
        skills: '',
        educations: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData }
    
        const propertyNames = name.split('.')
    
        let currentProperty = updatedFormData;
        for (let i = 0; i < propertyNames.length - 1; i++) {
        const propertyName = propertyNames[i]
        currentProperty = currentProperty[propertyName]
        }
        currentProperty[propertyNames[propertyNames.length - 1]] = value
    
        setFormData(updatedFormData)
    }


    const handleTagInputChange = (event, field) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [field]: event.target.value,
        }))
    }

    const handleKeyPress = (event, field) => {
        if (event.key === 'Enter' && inputValues[field].trim() !== '') {
          event.preventDefault();
          setFormData((prevFormData) => {
            if (Array.isArray(prevFormData[field])) {
              return {
                ...prevFormData,
                [field]: [...prevFormData[field], inputValues[field].trim()],
              };
            } else {
              return prevFormData;
            }
          });
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [field]: '',
          }));
        }
      };
      
      const handleRemoveTag = (field, tag) => {
        setFormData((prevFormData) => {
          if (Array.isArray(prevFormData[field])) {
            return {
              ...prevFormData,
              [field]: prevFormData[field].filter((t) => t !== tag),
            };
          } else {
            return prevFormData;
          }
        })
      }
        

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("formData:", formData)
        try {
            await updateContact(id, formData)
            navigate(`/contact/read/${id}`);
        } catch (error) {
            console.error('Failed to update contact: ', error)
        }
    }

    useEffect(() => {
        const fetchcontact = async () => {
            try {
                const response = await getContactById(id)
                const contactData = response.data.data;
        
                setFormData((prevData) => ({
                    ...prevData,
                    contact_name: contactData.contact_name || '',
                    contact_alias: contactData.contact_alias || '',
                    gender: contactData.gender || '',
                    birth_date: contactData.birth_date || '',
                    religion: contactData.religion || '',
                    contact_emails: contactData.contact_emails || [],
                    contact_phones: contactData.contact_phones || [],
                    interests: contactData.interests || [],
                    skills: contactData.skills || [],
                    educations: contactData.educations || [],
                    notes: contactData.notes || '',
                    contact_social_presence: {
                        linkedin: contactData.contact_social_presence.linkedin || '',
                        facebook: contactData.contact_social_presence.facebook || '',
                        twitter: contactData.contact_social_presence.twitter || '',
                        github: contactData.contact_social_presence.github || '',
                        other: contactData.contact_social_presence.other || [],
                    },
                }))
        
                setLoading(false)
            } catch (error) {
                console.error('Failed to fetch contact: ', error)
            }
        }
    
        fetchcontact()
    }, [id])
      

    return (
        <div className='py-10 mx-auto max-w-xl flex-col items-center'>
            <h1 className='text-3xl leading-8 font-bold py-5'>Update Contact</h1>

            <form onSubmit={handleSubmit}>
                <div className='pb-2'>
                    <label htmlFor="contact_name" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Contact Name</label>
                    <input id='contact_name' name='contact_name' type="text" value={formData.contact_name}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.contact_name && <p className="text-red-500">{errors.contact_name}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="contact_alias" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Contact Alias</label>
                    <input id='contact_alias' name='contact_alias' type="text" value={formData.contact_alias}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.contact_alias && <p className="text-red-500">{errors.contact_alias}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="gender" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Gender</label>
                    <input id='gender' name='gender' type="text" value={formData.gender}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="birth_date" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Birth Date</label>
                    <input id='birth_date' name='birth_date' type="text" value={formData.birth_date}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.birth_date && <p className="text-red-500">{errors.birth_date}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="religion" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Religion</label>
                    <input id='religion' name='religion' type="text" value={formData.religion}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.religion && <p className="text-red-500">{errors.religion}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="contact_emails" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Contact Emails</label>
                    <div className="mt-1">
                        {formData.contact_emails.map((tag) => (
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
                    <div>
                        <input
                            type="text"
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            value={inputValues.contact_emails}
                            onChange={(event) => handleTagInputChange(event, 'contact_emails')}
                            placeholder='Insert contact emails'
                            onKeyDown={(event) => handleKeyPress(event, 'contact_emails')}
                        />
                    </div>
                    {errors.contact_phones && <p className="text-red-500">{errors.contact_emails}</p>}
                </div>
                
                <div className='pb-2'>
                    <label htmlFor="contact_phones" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Contact Phones</label>
                    <div className="mt-1">
                        {formData.contact_phones.map((tag) => (
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
                    <div>
                        <input
                            type="text"
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            value={inputValues.contact_phones}
                            onChange={(event) => handleTagInputChange(event, 'contact_phones')}
                            placeholder='Insert contact phones'
                            onKeyDown={(event) => handleKeyPress(event, 'contact_phones')}
                        />
                    </div>
                    {errors.contact_phones && <p className="text-red-500">{errors.contact_phones}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="interests" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Interests</label>
                    <div className="mt-1">
                        {formData.interests.map((tag) => (
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
                    <div>
                        <input
                            type="text"
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            value={inputValues.interests}
                            onChange={(event) => handleTagInputChange(event, 'interests')}
                            placeholder='Insert interests'
                            onKeyDown={(event) => handleKeyPress(event, 'interests')}
                        />
                    </div>
                    {errors.interests && <p className="text-red-500">{errors.interests}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="skills" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Skills</label>
                    <div className="mt-1">
                        {formData.skills.map((tag) => (
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
                    <div>
                        <input
                            type="text"
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            value={inputValues.skills}
                            onChange={(event) => handleTagInputChange(event, 'skills')}
                            placeholder='Insert skills'
                            onKeyDown={(event) => handleKeyPress(event, 'skills')}
                        />
                    </div>
                    {errors.skills && <p className="text-red-500">{errors.skills}</p>}
                </div>

                
                <div className='pb-2'>
                    <label htmlFor="educations" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Educations</label>
                    <div className="mt-1">
                        {formData.educations.map((tag) => (
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
                    <div>
                        <input
                            type="text"
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            value={inputValues.educations}
                            onChange={(event) => handleTagInputChange(event, 'educations')}
                            placeholder='Insert educations'
                            onKeyDown={(event) => handleKeyPress(event, 'educations')}
                        />
                    </div>
                    {errors.educations && <p className="text-red-500">{errors.educations}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="notes" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Notes</label>
                    <input id='notes' name='notes' type="text" value={formData.notes}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.notes && <p className="text-red-500">{errors.notes}</p>}
                </div>

                <h1 className='text-xl font-bold mt-5'>Contact Social Presence</h1>
                <div className='pb-2'>
                    <label htmlFor="linkedin" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Linkedin</label>
                    <input id='linkedin' name='contact_social_presence.linkedin' type="text" value={formData.contact_social_presence.linkedin}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.linkedin && <p className="text-red-500">{errors.linkedin}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="facebook" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Facebook</label>
                    <input id='facebook' name='contact_social_presence.facebook' type="text" value={formData.contact_social_presence.facebook}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.facebook && <p className="text-red-500">{errors.facebook}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="twitter" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Twitter</label>
                    <input id='twitter' name='contact_social_presence.twitter' type="text" value={formData.contact_social_presence.twitter}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.twitter && <p className="text-red-500">{errors.twitter}</p>}
                </div>


                <div className='pb-2'>
                    <label htmlFor="github" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Github</label>
                    <input id='github' name='contact_social_presence.github' type="text" value={formData.contact_social_presence.github}  onChange={handleChange} className='w-full bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 w-1/5'/>
                    {errors.github && <p className="text-red-500">{errors.github}</p>}
                </div>

                <div className='pb-2'>
                    <label htmlFor="other" className='block text-sm font-medium leading-6 text-gray-900 py-1'>Other Social Media</label>
                    <div className="mt-1">
                        {formData.contact_social_presence.other.map((tag) => (
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
                    <div>
                        <input
                            type="text"
                            className="bg-gray-100 border border-zinc-400 text-gray-900 text-sm rounded focus:ring-orange-700 focus:border-orange-700 block w-full pb-2 p-2.5"
                            value={inputValues.other}
                            onChange={(event) => handleTagInputChange(event, 'other')}
                            placeholder='Insert other'
                            onKeyDown={(event) => handleKeyPress(event, 'other')}
                        />
                    </div>
                    {errors.other && <p className="text-red-500">{errors.other}</p>}
                </div>

                <div className='float-right'>
                    <button onClick={() => navigate(`/contact/read/${id}`)} className='my-5 mr-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Cancel</button>
                    <button type='submit' className=' my-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateContact