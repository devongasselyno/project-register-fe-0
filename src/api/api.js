import axios from "axios"

const  API_BASE_URL = process.env.REACT_APP_API_URL

const baseURL = axios.create({
    baseURL: API_BASE_URL,
})

// User routes
export const createUser = (userData) => axios.post(`${baseURL}/user/create`, userData)
export const loginUser = (loginData) => axios.post(`${baseURL}/user/login`, loginData)
export const getAllUsers = () => axios.get(`${baseURL}/user/read`)

// Company routes
export const createCompany = (companyData) => axios.post(`${baseURL}/company/create`, companyData)
export const getAllCompanies = () => axios.get(`${baseURL}/company/read`)
export const getCompanyById = (companyId) => axios.get(`${baseURL}/company/read/${companyId}`)
export const searchCompany = (searchParams) => axios.get(`${baseURL}/company/search`, { params: searchParams })
export const updateCompany = (companyId, companyData) => axios.put(`${baseURL}/company/${companyId}`, companyData)
export const deleteCompany = (companyId) => axios.delete(`${baseURL}/company/${companyId}`)
export const hardDeleteCompany = (companyId) => axios.delete(`${baseURL}/company/hard/${companyId}`)
export const recoverCompany = () => axios.post(`${baseURL}/company/recover`)

// Client routes
export const createClient = (clientData) => axios.post(`${baseURL}/client/create`, clientData)
export const getAllClients = () => axios.get(`${baseURL}/client/read`)
export const getLatestClient = () => axios.get(`${baseURL}/client/latest`)
export const getClientById = (clientId) => axios.get(`${baseURL}/client/read/${clientId}`)
export const searchClient = (searchParams) => axios.get(`${baseURL}/client/search`, { params: searchParams })
export const updateClient = (clientId, clientData) => axios.patch(`${baseURL}/client/${clientId}`, clientData)
export const deleteClient = (clientId) => axios.delete(`${baseURL}/client/${clientId}`)
export const hardDeleteClient = (clientId) => axios.delete(`${baseURL}/client/hard/${clientId}`)
// export const recoverClient = () => axios.post(`${api}/client/recover`)

// Type routes
export const createType = (typeData) => axios.post(`${baseURL}/type/create`, typeData)
export const getAllProjectTypes = () => axios.get(`${baseURL}/type/read`)
export const getProjectTypeById = (typeId) => axios.get(`${baseURL}/type/read/${typeId}`)
export const searchProjectType = (searchParams) => axios.get(`${baseURL}/type/search`, { params: searchParams })
export const updateProjectType = (typeId, typeData) => axios.put(`${baseURL}/type/update/${typeId}`, typeData)
export const deleteProjectType = (typeId) => axios.delete(`${baseURL}/type/${typeId}`)
export const hardDeleteProjectType = (typeId) => axios.delete(`${baseURL}/type/hard/${typeId}`)
export const recoverProjectType = () => axios.post(`${baseURL}/type/recover`)

// Project routes
export const createProject = (projectData) => axios.post(`${baseURL}/project/create`, projectData)
export const getAllProjects = () => axios.get(`${baseURL}/project/read`)
export const getProject = (projectId) => axios.get(`${baseURL}/project/read/${projectId}`)
export const updateProject = (projectId, projectData) => axios.patch(`${baseURL}/project/update/${projectId}`, projectData)
export const deleteProject = (projectId) => axios.delete(`${baseURL}/project/delete/${projectId}`)
export const hardDeleteProject = (projectId) => axios.delete(`${baseURL}/project/hard/${projectId}`)
export const convertToProject = (projectId) => axios.post(`${baseURL}/project/convert/${projectId}`)
export const recoverProject = (projectId) => axios.post(`${baseURL}/project/recover/${projectId}`)
export const searchProjects = (searchParams) => axios.get(`${baseURL}/project/search`, { params: searchParams })
export const filterAllProjects = () => axios.get(`${baseURL}/project/filter`)

// Locations routes
export const createLocation = (locationData) => axios.post(`${baseURL}/locations/create`, locationData)
export const getAllLocations = () => axios.get(`${baseURL}/locations/read`)
export const getLocationById = (locationId) => axios.get(`${baseURL}/locations/read/${locationId}`)
export const searchLocation = (searchParams) => axios.get(`${baseURL}/locations/search`, { params: searchParams })
export const updateLocation = (locationId, locationData) => axios.put(`${baseURL}/locations/${locationId}`, locationData)
export const deleteLocation = (locationId) => axios.delete(`${baseURL}/locations/${locationId}`)
export const hardDeleteLocation = (locationId) => axios.delete(`${baseURL}/locations/hard/${locationId}`)
export const recoverLocation = () => axios.post(`${baseURL}/locations/recover`)

// City routes
export const createCity = (cityData) => axios.post(`${baseURL}/city/create`, cityData)
export const getAllCities = () => axios.get(`${baseURL}/city/read`)
export const getCityById = (cityId) => axios.get(`${baseURL}/city/read/${cityId}`)
export const searchCity = (searchParams) => axios.get(`${baseURL}/city/search`, { params: searchParams })
export const updateCity = (cityId, cityData) => axios.put(`${baseURL}/city/${cityId}`, cityData)
export const deleteCity = (cityId) => axios.delete(`${baseURL}/city/${cityId}`)
export const hardDeleteCity = (cityId) => axios.delete(`${baseURL}/city/hard/${cityId}`)
export const recoverCity = () => axios.post(`${baseURL}/city/recover`)
export const getCityFiltered = (id) => axios.get(`${baseURL}/city/filter/${id}`)

// Province routes
export const createProvince = (provinceData) => axios.post(`${baseURL}/province/create`, provinceData)
export const getAllProvinces = () => axios.get(`${baseURL}/province/read`)
export const getProvinceById = (provinceId) => axios.get(`${baseURL}/province/read/${provinceId}`)
export const searchProvince = (searchParams) => axios.get(`${baseURL}/province/search`, { params: searchParams })
export const updateProvince = (provinceId, provinceData) => axios.put(`${baseURL}/province/${provinceId}`, provinceData)
export const deleteProvince = (provinceId) => axios.delete(`${baseURL}/province/${provinceId}`)
export const hardDeleteProvince = (provinceId) => axios.delete(`${baseURL}/province/hard/${provinceId}`)
export const recoverProvince = () => axios.post(`${baseURL}/province/recover`)

// Contact routes
export const createContact = (contactData) => axios.post(`${baseURL}/contact/create`, contactData)
export const getLatestContact = () => axios.get(`${baseURL}/contact/latest`)
export const getAllContacts = () => axios.get(`${baseURL}/contact/read`)
export const getContactById = (contactId) => axios.get(`${baseURL}/contact/read/${contactId}`)
export const updateContact = (contactId, contactData) => axios.patch(`${baseURL}/contact/update/${contactId}`, contactData)
export const softDeleteContact = (contactId) => axios.delete(`${baseURL}/contact/delete/soft/${contactId}`)
export const getLocationByContactId = (contactId) => axios.get(`${baseURL}/contact/locations/${contactId}`)

// Client Contact routes
export const createClientContact = (clientContactData) => axios.post(`${baseURL}/clientcontact/create`, clientContactData)
export const getAllClientContacts = () => axios.get(`${baseURL}/clientcontact/read`)

// Employment routes
export const createEmployment = (employmentData) => axios.post(`${baseURL}/employments/create`, employmentData)
export const getAllEmployments = () => axios.get(`${baseURL}/employments/read`)
export const getEmploymentsByContactId = (contactId) => axios.get(`${baseURL}/employments/read/${contactId}`)
export const deleteEmployment = () => axios.delete(`${baseURL}/employments/delete`)

export default baseURL