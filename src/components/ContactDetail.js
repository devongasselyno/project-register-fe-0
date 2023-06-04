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
                        <p>ID: {contact.ID}</p>
                        <p>Contact Name: {contact.contact_name || '-'}</p>
                        <p>Alias: {contact.contact_alias || '-'}</p>
                        <p>Gender: {contact.gender === "1" ? "Male" : contact.gender === "0" ? "Female" : "-"}</p>
                        <p>Birth Date: {contact.birth_date || '-'}</p>
                        <p>Religion: {contact.religion || '-'}</p>
                    </div>


                    <div className='py-5'>
                        <p className='font-bold'>Locations</p>
                        {contact.locations && contact.locations.map(location => (
                            <div className='pb-3' key={location.ID}>
                                <p>Address: {location.address || '-'}</p>
                                <p>City: {location.city.city_name || '-'}</p>
                                <p>Province: {location.province.province_name || '-'}</p>
                                <p>Postal Code: {location.postal_code || '-'}</p>
                                <p>Country: {location.country || '-'}</p>
                                <p>Geo: {location.geo || '-'}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className='py-5'>
                        <p className='font-bold'>Contact Social Presence</p>
                        {contact.contact_social_presence && (
                        <div>
                            <p>LinkedIn: {contact.contact_social_presence.linkedin || '-'}</p>
                            <p>Facebook: {contact.contact_social_presence.facebook || '-'}</p>
                            <p>Twitter: {contact.contact_social_presence.twitter || '-'}</p>
                            <p>Github: {contact.contact_social_presence.github || '-'}</p>
                            <p>
                            Other Social Media: {contact.contact_social_presence.other?.join(', ') || '-'}
                            </p>
                        </div>
                        )}
                    </div>

                    <div className='space-y-3'>
                        <div>
                            <p>Contact Emails:</p>
                            <p>{contact.contact_emails?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p>Contact Phones:</p>
                            <p>{contact.contact_phones?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p>Interests:</p>
                            <p>{contact.interests?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p>Skills:</p>
                            <p>{contact.skills?.join(', ') || '-'}</p>
                        </div>

                        <div>
                            <p>Educations:</p>
                            <p>{contact.educations?.join(', ') || '-'}</p>
                        </div>

                        
                        <div>
                            <p>Notes:</p>
                            <p>{contact.notes || '-'}</p>
                        </div>
                    </div>
                </div>
            </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
        <button className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" > Delete </button>
    </div>
    )
}

export default ContactDetail