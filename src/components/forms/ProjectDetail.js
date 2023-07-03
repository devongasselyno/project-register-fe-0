import React, { useEffect, useState } from "react"
import api from '../../api/posts'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Popup from "reactjs-popup"
import { deleteProject, getProject } from "../../api/services/Project"

const ProjectDetail = () => {
const { id } = useParams()
const [project, setProject] = useState('')

const [types, setTypes] = useState([])

const [formData, setFormData] = useState({
    type_id: 0,
    project_id: '',
    project_name: '',
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
        const response = await getProject(id)
        setProject(response.data.data)
    } catch (err) {
        console.error("Error fetching project data:", err)
    }
}

const fetchTypes = async () => {
    try {
        const response = await api.get('/type/read')
        setTypes(response.data)
        console.log("types",types)
    } catch (error) {
        console.error('Failed to fetch types:', error)
    }
}

useEffect(() => {
    fetchData()
    fetchTypes()
}, [])

const navigate = useNavigate()
const handleDelete = async () => {
    try {
        await deleteProject(id)
        console.log('project deleted successfully');
        navigate('/dashboard')
    } catch (err) {
        console.error('Error deleting project:', err)
    }
}
const [errors, setErrors] = useState('')

const handleConvertproject = async (selectedType) => {

    const responseData = {
        project_id: project.project_id,
        type_id: selectedType
    }

    try {
    if (selectedType === 0) {
        const msg = "Please select a type"
        setErrors(msg)
        return
    }
    await api.post('/project/convert', responseData)
    try {
        await deleteProject(id)
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

const convertNotify = () => {
    toast.success('project Converted!', {
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
    toast.success('project Deleted!', {
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
        <h1 className="text-5xl leading-8 font-bold py-5">Project Detail</h1>
    </div>


    <div>
        <div>
        {project && (
            <div className="flex">
            <div className="">
                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Project ID</label>
                <span className="mr-2">:</span>
                <span>{project.project_id}</span>
                
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Project Name</label>
                <span className="mr-2">:</span>
                <span>{project.project_name}</span>
                </div>

                <div className="mb-4">
                <label className="font-bold inline-block w-32">Type Name</label>
                <span className="mr-2">:</span>
                <span>{project.project_type.project_name}</span>
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Year</label>
                <span className="mr-2">:</span>
                    <span>{project.year}</span>
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Manager</label>
                <span className="mr-2">:</span>
                <span>{project.manager}</span>
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Status</label>
                <span className="mr-2">:</span>
                <span>{project.status}</span>
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Amount:</label>
                <span className="mr-2">:</span>
                <span>Rp. {project.amount.toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 0 }).replace(/,/g, '.')}</span>
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Company Name</label>
                <span className="mr-2">:</span>
                <span>{project.company.company_name}</span>
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Client Name</label>
                <span className="mr-2">:</span>
                <span>{project.client.client_name}</span>  
                </div>
            </div>

            {/* CHECKBOXES */}
            <div className="ml-14">
                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Jira</label>
                <span className="mr-2">:</span>
                <input type="checkbox" checked={project.jira} disabled />
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Clockify</label>
                <span className="mr-2">:</span>
                <input type="checkbox" checked={project.clockify} disabled />
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Pcs</label>
                <span className="mr-2">:</span>
                <input type="checkbox" checked={project.pcs} disabled />
                </div>

                <div className="mb-4">
                <label className="font-bold w-32 inline-block">Pms</label>
                <span className="mr-2">:</span>
                <input type="checkbox" checked={project.pms} disabled />
                </div>
            </div>

            </div>
        )}


        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(`/project/update/${id}`)}>Edit</button>
        <button className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"onClick={() => handleDelete(project.project_id)}>Delete</button>

        <Popup
            trigger={<button className="ml-8 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"> Convert project </button>}
            modal
            nested
        >
            {close => (
            <div className="modal bg-slate-100 p-6 rounded-xl backdrop-blur-sm">
                <div class="flex items-center justify-between border-b rounded-t">
                <h3 class="text-xl font-medium text-gray-900">
                    Convert project to Project
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
                    {types.data && types.data.map((type) => {
                        if (type.project_type_code !== 'PRP') {
                            return (
                                <option key={type.ID} value={type.ID}>
                                    {type.project_name}
                                </option>
                            )
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
                    await handleConvertproject(formData.type_id)
                    }}
                >
                    Convert project
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

export default ProjectDetail