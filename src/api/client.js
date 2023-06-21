import baseURL from "./api"

export const createClient = async (clientData) => {
    try {
        const response = await baseURL.createClient(clientData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}