import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProspectDetail = () => {
    const [prospect, setProspect] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8080/api/prospect/read')
                setProspect(res.data.data)
            } catch (err) {
                console.error('Error fetching prospect data:', err)
            }
        };

        fetchData();
    },[])

    return (
        <div>
            {prospect.map((prospect) => (
                <h3>{prospect.prospect_name}</h3>    
            ))}   
        </div>
    )
}

export default ProspectDetail