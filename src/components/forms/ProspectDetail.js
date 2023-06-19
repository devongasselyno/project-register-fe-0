import React, { useEffect, useState } from "react"
import api from '../../api/posts'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { Navigate } from "react-router-dom"
// import { type } from "@testing-library/user-event/dist/type"
import Popup from "reactjs-popup"

const ProspectDetail = () => {
  const { id } = useParams()
  const [prospect, setProspect] = useState('')
  const [editMode, setEditMode] = useState(false)

  const [types, setTypes] = useState([])
  const [companies, setCompanies] = useState([])
  const [clients, setClients] = useState([])

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
    clockify: false,
    jira: false,
    pcs: false,
    pms: false
  })


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

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/api/prospect/read/${id}`)
      const prospectData = res?.data?.data
      setProspect(prospectData)
    } catch (err) {
      console.error("Error fetching prospect data:", err)
    }
  }

  useEffect(() => {
    fetchData()
    fetchCompanies()
    fetchClients()
    fetchTypes()
  }, [])

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
      updatedFormData.clockify = formData.clockify
      updatedFormData.jira = formData.jira
      updatedFormData.pcs = formData.pcs
      updatedFormData.pms = formData.pms

      const response = await axios.patch(`http://localhost:8080/api/prospect/update`, updatedFormData)
      console.log(response.data)
      setEditMode(false)
      notify()

      setTimeout(() => {
        fetchData()
      }, 2000);



    } catch (err) {
      console.error(err)
    }
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const navigate = useNavigate()
  const handleDelete = async (prospectId) => {
    try {
      await axios.delete('http://localhost:8080/api/prospect/delete', {
        data: {
          prospect_id: prospectId,
        },
      });
      console.log('Prospect deleted successfully');
      deleteNotify()

      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);

    } catch (err) {
      console.error('Error deleting prospect:', err);
    }
  };
  const [errors, setErrors] = useState('')

  const handleConvertProspect = async (selectedType) => {

    const responseData = {
      prospect_id: prospect.prospect_id,
      type_id: selectedType
    }

    try {
      if (selectedType === 0) {
        const msg = "Please select a type"
        setErrors(msg)
        return
      }
      await api.post('/prospect/convert', responseData)
      try {
        await axios.delete('http://localhost:8080/api/prospect/delete', {
          data: {
            prospect_id: prospect.prospect_id,
          },
        });
      } catch (error) {
        console.error(error)
      }

      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);
      convertNotify()
    } catch (error) {
      console.error(error)
    }
  }

  const notify = () => {
    toast.success('Prospect Updated!', {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  const convertNotify = () => {
    toast.success('Prospect Converted!', {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  const deleteNotify = () => {
    toast.success('Prospect Deleted!', {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  const handleSalesEnter = (event, field) => {
    if (event.key === 'Enter' && salesInputValue[field].trim() !== '') {
      event.preventDefault()
      setSalesActivity((prevSalesActivity) => {
        return {
          ...prevSalesActivity,
          [field]: [...prevSalesActivity[field], salesInputValue[field]]
        }
      })
      setSalesInputValue((prevSalesInputValue) => ({
        ...prevSalesInputValue,
        [field]: '',
      }))
    }
  }

  const handleSalesChange = (event, field) => {
    setSalesInputValue((prevSalesInputValue) => ({
      ...prevSalesInputValue,
      [field]: event.target.value
    }))
  }

  const [salesActivity, setSalesActivity] = useState({
    activity: [],
  })

  const [salesInputValue, setSalesInputValue] = useState({
    activity: '',
  })

  return (
    // ------------------------------------------------------------------------
    <div className="py-6 px-20">
      <div className="py-6">
        <h1 className="text-5xl leading-8 font-bold py-5">Prospect Detail</h1>
      </div>


      <div>
        <div>
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
                  <label className="font-bold inline-block w-32">Type Name</label>
                  <span className="mr-2">:</span>
                  {editMode ? (
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
                    <span>{prospect.project_type.project_name}</span>
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
                  <label className="font-bold w-32 inline-block">Company Name</label>
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
                    <span>{prospect.company.company_name}</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-bold w-32 inline-block">Client Name</label>
                  <span className="mr-2">:</span>
                  {editMode ? (
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
                    <span>{prospect.client.client_name}</span>
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
                      name="jira"
                      value={formData.jira}
                      // checked={prospect.Jira}
                      onChange={handleChange}
                    />
                  ) : (
                    <input type="checkbox" checked={prospect.jira} disabled />
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-bold w-32 inline-block">Clockify</label>
                  <span className="mr-2">:</span>
                  {editMode ? (
                    <input
                      type="checkbox"
                      name="clockify"
                      value={formData.clockify}
                      // checked={prospect.Clockify}
                      onChange={handleChange}
                    />
                  ) : (
                    <input type="checkbox" checked={prospect.clockify} disabled />
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-bold w-32 inline-block">Pcs</label>
                  <span className="mr-2">:</span>
                  {editMode ? (
                    <input
                      type="checkbox"
                      name="pcs"
                      value={formData.pcs}
                      // checked={prospect.Pcs}
                      onChange={handleChange}
                    />
                  ) : (
                    <input type="checkbox" checked={prospect.pcs} disabled />
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-bold w-32 inline-block">Pms</label>
                  <span className="mr-2">:</span>
                  {editMode ? (
                    <input
                      type="checkbox"
                      name="pms"
                      Value={formData.pms}
                      // checked={prospect.Pms}
                      onChange={handleChange}
                    />
                  ) : (
                    <input type="checkbox" checked={prospect.pms} disabled />
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

          <Popup
            trigger={<button className="ml-8 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"> Convert Prospect </button>}
            modal
            nested
          >
            {close => (
              <div className="modal bg-slate-100 p-6 rounded-xl backdrop-blur-sm">
                <div class="flex items-center justify-between border-b rounded-t">
                  <h3 class="text-xl font-medium text-gray-900">
                    Convert Prospect to Project
                  </h3>
                  <button type="button" class="text-gray-400 text-2xl bg-transparent hover:bg-gray-200 hover:text-gray-900 outline-none rounded-lg p-1.5 ml-auto inline-flex items-center" data-modal-hide="medium-modal" onClick={close}>
                    &times;
                  </button>
                </div>
                <div className="p-6 space-y-6 block items-center">
                  <label className="font-bold w-32 inline-block">Select Type Name</label>
                  <span className="mr-2">:</span>
                  <select
                    className="rounded-lg"
                    name="type_id"
                    value={formData.type_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    {Array.isArray(types.data) &&
                      types.data.map((type) => {
                        // Exclude the specific name you want to eliminate
                        if (type.project_type_code !== 'PRP') {
                          return (
                            <option key={type.ID} value={type.ID}>
                              {type.project_name}
                            </option>
                          );
                        }
                        return null;
                      })}
                  </select>
                  {errors && <p className="error-message text-sm text-red-700">{errors}</p>}
                </div>
                <div className="actions flex items-center gap-4 flex-wrap justify-between">
                  <button
                    className="bg-orange-500 mx-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      console.log('modal closed ');
                      close();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 mx-4 hover:bg-green-700 text-white font-bold py-2 px-4 m-4 rounded"
                    onClick={async () => {
                      await handleConvertProspect(formData.type_id)
                    }}
                  >
                    Convert Prospect
                  </button>

                </div>
              </div>
            )}
          </Popup>
        </div>
        <div className="bg-slate-100 drop-shadow-xl rounded-lg py-2 px-4 mt-4">
          <label
            htmlFor="activity"
            className="block text-lg font-medium leading-6 text-gray-900 py-1 pl-1">
            Sales Activity
          </label>
          <input
            type="text"
            className="rounded-lg my-2 w-full"
            name="activity"
            value={salesInputValue.activity}
            onChange={(event) => handleSalesChange(event, 'activity')}
            onKeyDown={(event) => handleSalesEnter(event, 'activity')}
          />
          <div>
            {salesActivity.activity.map((list, index) => (
              <span key={list} className="block text-base font-normal text-black">
                {`${index + 1}. ${list}`}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1200}
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