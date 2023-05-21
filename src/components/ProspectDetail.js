import React, { useEffect, useState } from "react"
import api from '../api/posts'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { type } from "@testing-library/user-event/dist/type"

const ProspectDetail = () => {
  const { id } = useParams()
  const [prospect, setProspect] = useState('')

  const [formData, setFormData] = useState({
    type_id: 0,
    prospect_id: '',
    prospect_name: '',
    year: 0,
    manager: '',
    status: '',
    amount: 0,
    company_id: 0,
    client_id: 0,
    clockify: '',
    jira: '',
    pcs: '',
    pms: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8080/api/prospect/read/${id}`)
        const prospectData = res.data.data
        setProspect(prospectData)
      } catch (err) {
        console.error("Error fetching prospect data:", err)
      }
    }
  
    fetchData()
  }, [id])
  

  // UPDATE FORM DATA----------------------------------------------------------------------------------------------------------------------
  const [types, setTypes] = useState([])
  const [companies, setCompanies] = useState([])
  const [clients, setClients] = useState([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/company/read')
        setCompanies(response.data)
      } catch (error) {
        console.error('Failed to fetch companies:', error)
      }
    }

    const fetchClients = async () => {
      try {
        const response = await api.get('/client/read', {
          params: {
            limit: 100,
          },
        })
        setClients(response.data)
      } catch (error) {
        console.error('Failed to fetch clients:', error)
      }
    }

    const fetchTypes = async () => {
      try {
        const response = await api.get('/type/read')
        setTypes(response.data)
      } catch (error) {
        console.error('Failed to fetch types:', error)
      }
    }

    fetchCompanies()
    fetchClients()
    fetchTypes()
  }, [])

  const [editMode, setEditMode] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    let fieldValue

    if (name === 'type_id' || name === 'company_id' || name === 'client_id') {
      fieldValue = parseInt(value, 10);
    } else if (type === 'number') {
      fieldValue = parseInt(value, 10);
    } else if (type === 'checkbox') {
      fieldValue = checked;
    } else {
      fieldValue = value;
    }

    console.log(fieldValue)
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }))
  }
  
  
  const handleUpdateProspect = async () => {
    try {
      let updatedFormData = { ...formData }

      updatedFormData.prospect_id = prospect.prospect_id
      
      if (formData.prospect_name === '') {
        updatedFormData.prospect_name = prospect.prospect_name
      }
      if (formData.year === 0) {
        updatedFormData.year = prospect.year
      }
      if (formData.manager === '') {
        updatedFormData.manager = prospect.manager
      }
      if (formData.status === '') {
        updatedFormData.status = prospect.status
      }
      if (formData.amount === 0) {
        updatedFormData.amount = prospect.amount
      }
      if (formData.company_id === 0) {
        updatedFormData.company_id = prospect.company_id
      }
      if (formData.client_id === 0) {
        updatedFormData.client_id = prospect.client_id
      }
      if (formData.type_id === 0) {
        updatedFormData.type_id = prospect.type_id
      }
      if (formData.clockify === false) {
        updatedFormData.clockify = prospect.clockify
      }
      if (formData.jira === false) {
        updatedFormData.jira = prospect.jira
      }
      if (formData.pcs === false) {
        updatedFormData.pcs = prospect.pcs
      }
      if (formData.pms === false) {
        updatedFormData.pms = prospect.pms
      }

      const response = await axios.patch(`http://localhost:8080/api/prospect/update`, updatedFormData)
      console.log(response.data)
      setEditMode(false)
      window.location.reload()

    } catch (err) {
      console.error(err)
    }
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleDelete = async (prospectId) => {
    try {
      await axios.delete('http://localhost:8080/api/prospect/delete', {
        data: {
          prospect_id: prospectId,
        },
      });
      console.log('Prospect deleted successfully');
    } catch (err) {
      console.error('Error deleting prospect:', err);
    }
  };

  const requestData = {
    prospect_id: prospect.prospect_id
  }

  const handleConvertProspect = async () => {
    try {
      const response = await api.post('/prospect/convert', requestData)
    } catch (error) {
      console.error(error)
    }
  }

  const notify = () => {
      toast.success('Prospect Created!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      })
  }

    return (
      // ------------------------------------------------------------------------
      <div className="py-6 px-20">
        <div className="py-6">
          <h1 className="text-5xl leading-8 font-bold py-5">Prospect Detail</h1>
        </div>

        {prospect && (
          <div className="flex">
            <div className="">
              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Prospect ID</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="text"
                    name="ID"
                    value={formData.prospect_id}
                    className="rounded-lg"
                    placeholder={prospect.prospect_id}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{prospect.prospect_id}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Prospect Name</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="text"
                    name="prospect_name"
                    value={formData.prospect_name}
                    className="rounded-lg"
                    placeholder={prospect.prospect_name} 
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{prospect.prospect_name}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Company Name</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    className="rounded-lg"
                    placeholder={prospect.company.company_name}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{prospect.company.company_name}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block w-32 inline-block">Type ID</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  // <input
                  //   type="number"
                  //   className="rounded-lg"
                  //   name="type_id"
                  //   value={formData.type_id}
                  //   placeholder={prospect.type_id}
                  //   readOnly={!editMode}
                  //   onChange={handleChange}
                  // />
                  <select
                  type="number"
                  className="rounded-lg"
                  name="type_id"
                  value={formData.type_id}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  {Array.isArray(types.data) &&
                      types.data.map((type) => (
                        <option key={type.ID} value={type.ID}>
                            {type.project_name}
                        </option>
                  ))}
                </select>
                ) : (
                  <span>{prospect.type_id}</span>
                )}
                
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Year</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="number"
                    className="rounded-lg"
                    name="year"
                    value={formData.year}
                    placeholder={prospect.year}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{prospect.year}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Manager</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="text"
                    className="rounded-lg"
                    name="manager"
                    value={formData.manager}
                    placeholder={prospect.manager}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{prospect.manager}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Status</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="text"
                    className="rounded-lg"
                    name="status"
                    value={formData.status}
                    placeholder={prospect.status}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{prospect.status}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Amount:</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="number"
                    className="rounded-lg"
                    name="amount"
                    value={formData.amount}
                    placeholder={prospect.amount}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{prospect.amount}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Company ID</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  // <input
                  //   type="number"
                  //   className="rounded-lg"
                  //   name="company_id"
                  //   value={formData.company_id}
                  //   placeholder={prospect.company_id}
                  //   readOnly={!editMode}
                  //   onChange={handleChange}
                  // />
                  <select
                    type="number"
                    className="rounded-lg"
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Company</option>
                    {Array.isArray(companies.data) &&
                        companies.data.map((company) => (
                          <option key={company.ID} value={company.ID}>
                              {company.company_name}
                          </option>
                    ))}
                  </select>
                ) : (
                  <span>{prospect.company_id}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Client ID</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  // <input
                  //   type="number"
                  //   className="rounded-lg"
                  //   name="client_id"
                  //   value={formData.client_id}
                  //   placeholder={prospect.client_id}
                  //   readOnly={!editMode}
                  //   onChange={handleChange}
                  // />
                  <select
                    type="number"
                    className="rounded-lg"
                    name="client_id"
                    value={formData.client_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Company</option>
                    {Array.isArray(clients.data) &&
                        clients.data.map((client) => (
                          <option key={client.ID} value={client.ID}>
                              {client.client_name}
                          </option>
                    ))}
                  </select>
                ) : (
                  <span>{prospect.client_id}</span>
                )}
              </div>
            </div>

            {/* CHECKBOXES */}
            <div className="ml-14">
              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Jira</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="checkbox"
                    value={formData.jira}
                    checked={prospect.Jira}
                    onChange={handleChange}
                  />
                ) : (
                  <input type="checkbox" checked={prospect.Jira} disabled />
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Clockify</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="checkbox"
                    value={formData.clockify}
                    checked={prospect.Clockify}
                    onChange={handleChange}
                  />
                ) : (
                  <input type="checkbox" checked={prospect.Clockify} disabled />
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Pcs</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="checkbox"
                    value={formData.pcs}
                    checked={prospect.Pcs}
                    onChange={handleChange}
                  />
                ) : (
                  <input type="checkbox" checked={prospect.Pcs} disabled />
                )}
              </div>

              <div className="mb-4">
                <label className="font-bold w-32 inline-block">Pms</label>
                <span className="mr-2">:</span>
                {editMode ? (
                  <input
                    type="checkbox"
                    Value={formData.pms}
                    checked={prospect.Pms}
                    onChange={handleChange}
                  />
                ) : (
                  <input type="checkbox" checked={prospect.Pms} disabled />
                )}
              </div>
            </div>

          </div>
        )}

        {editMode ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpdateProspect}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}

        <button
          className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(prospect.prospect_id)}
        >
          Delete
        </button>

        <button
          type="submit"
          className="ml-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleConvertProspect}
        >
          Convert Prospect
        </button>

        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
      </div>
    )
  }

  export default ProspectDetail
// -----------------------------------------------------------------------------------------------------------------