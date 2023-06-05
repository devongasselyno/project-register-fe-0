import { useEffect, useState, React } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ContactDetail = () => {

    const { id } = useParams()
    const [contact, setContact] = useState({})

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
    </div>
    )
}

export default ContactDetail