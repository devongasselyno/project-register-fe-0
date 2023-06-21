// string method payload
import axios from "axios"

const UseApi = async(props) => {
    let response

    if (props.method === "GET") {
        try {
            response = await axios.get(props.url)
            console.log("data", response)
        } catch (error) {
            console.log("Error fetching data", error)
        }
    } else if (props.method === "POST") {

    } else if (props.method === "PUT") {
        
    } else if (props.method === "PATCH") {
        
    } else if (props.method === "DELETE") {
        
    }
    
    return response
}

// VOTE DISINI GAES!!