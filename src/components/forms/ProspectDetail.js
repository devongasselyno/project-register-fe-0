    import React, { useEffect, useState } from "react";
    import api from "../../api/posts";
    import axios from "axios";
    import { useNavigate, useParams } from "react-router-dom";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    // import { Navigate } from "react-router-dom"
    // import { type } from "@testing-library/user-event/dist/type"
    import Popup from "reactjs-popup";
    import { deleteProspect, getProspect } from "../../api/services/Prospect";
    import { getAllProjectTypes } from "../../api/services/Type"

    const ProspectDetail = () => {
    const { id } = useParams()
    const [prospect, setProspect] = useState("")
    const [errors, setErrors] = useState("")

    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState({
        type_id: 0,
        prospect_id: "",
        prospect_name: "",
        year: 0,
        manager: "",
        status: "",
        amount: 0,
        company_id: 0,
        client_id: 0,
        clockify: false,
        jira: false,
        pcs: false,
        pms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let fieldValue;

        if (name === "type_id" || name === "company_id" || name === "client_id") {
        fieldValue = parseInt(value, 10);
        } else if (type === "number") {
        fieldValue = parseInt(value, 10);
        } else if (type === "checkbox") {
        fieldValue = checked;
        } else {
        fieldValue = value;
        }

        console.log(fieldValue);
    };

    const fetchData = async () => {
        try {
            const response = await getProspect(id)
            setProspect(response)
            console.log(prospect)
        } catch (err) {
            console.error("Error fetching project data:", err)
        }
    }

    const fetchTypes = async () => {
        try {
            const response = await getAllProjectTypes()
            setTypes(response)
        } catch (error) {
            console.error("Failed to fetch types:", error)
        }
    }

    useEffect(() => {     
        fetchTypes()
    }, [])

    useEffect(() => { 
        fetchData()
    }, {})

    const navigate = useNavigate();
    const handleDelete = async (prospectId) => {
        try {
            await deleteProspect(prospectId);
            console.log("Prospect deleted successfully");
            navigate("/dashboard")
        } catch (err) {
            console.error("Error deleting prospect:", err);
        }
    };
   
   const handleConvertProspect = async (selectedType) => {
        const responseData = {
        prospect_id: prospect.project_id,
        type_id: selectedType,
        };

        try {
        if (selectedType === 0) {
            const msg = "Please select a type";
            setErrors(msg);
            return;
        }
        await api.post("/project/convert", responseData);
        try {
            await axios.delete("http://localhost:8080/api/project/delete", {
            data: {
                prospect_id: prospect.prospect_id,
            },
            });
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            navigate("/dashboard")
        }, 2000);
        convertNotify()
        } catch (error) {
            console.error(error)
        }
    }

    const notify = () => {
        toast.success("Prospect Updated!", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    };

    const convertNotify = () => {
        toast.success("Prospect Converted!", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    };

    const deleteNotify = () => {
        toast.success("Prospect Deleted!", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    };

    const handleSalesEnter = (event, field) => {
        if (event.key === "Enter" && salesInputValue[field].trim() !== "") {
        event.preventDefault();
        setSalesActivity((prevSalesActivity) => {
            return {
            ...prevSalesActivity,
            [field]: [...prevSalesActivity[field], salesInputValue[field]],
            };
        });
        setSalesInputValue((prevSalesInputValue) => ({
            ...prevSalesInputValue,
            [field]: "",
        }));
        }
    };

    const handleSalesChange = (event, field) => {
        setSalesInputValue((prevSalesInputValue) => ({
        ...prevSalesInputValue,
        [field]: event.target.value,
        }));
    };

    const [salesActivity, setSalesActivity] = useState({
        activity: [],
    });

    const [salesInputValue, setSalesInputValue] = useState({
        activity: "",
    });

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
                            <label className="font-bold w-32 inline-block">
                                Prospect ID
                            </label>
                            <span className="mr-2">:</span>
                            <span>{prospect.project_id}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">
                                Prospect Name
                            </label>
                            <span className="mr-2">:</span>
                            <span>{prospect.project_name}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold inline-block w-32">
                                Type Name
                            </label>
                            <span className="mr-2">:</span>
                            <span>{prospect.project_type.project_name}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">Year</label>
                            <span className="mr-2">:</span>
                            <span>{prospect.year}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">Manager</label>
                            <span className="mr-2">:</span>
                            <span>{prospect.manager}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">Status</label>
                            <span className="mr-2">:</span>
                            <span>{prospect.status}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">Amount:</label>
                            <span className="mr-2">:</span>
                            <span>Rp. {prospect.amount.toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 0 }).replace(/,/g, '.')}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">
                                Company Name
                            </label>
                            <span className="mr-2">:</span>
                            <span>{prospect.company.company_name}</span>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">
                                Client Name
                            </label>
                            <span className="mr-2">:</span>
                            <span>{prospect.client.client_name}</span>
                        </div>
                    </div>

                    {/* CHECKBOXES */}
                    <div className="ml-14">
                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">Jira</label>
                            <span className="mr-2">:</span>
                            <input type="checkbox" checked={prospect.jira} disabled />
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">
                                Clockify
                            </label>
                            <span className="mr-2">:</span>
                            <input type="checkbox" checked={prospect.clockify} disabled />
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">Pcs</label>
                            <span className="mr-2">:</span>
                            <input type="checkbox" checked={prospect.pcs} disabled />
                        </div>

                        <div className="mb-4">
                            <label className="font-bold w-32 inline-block">Pms</label>
                            <span className="mr-2">:</span>
                            <input type="checkbox" checked={prospect.pms} disabled />
                        </div>
                    </div>
                    </div>
                )}

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`/prospect/update/${id}`)}
                >
                    Edit
                </button>
                <button
                    className="ml-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(prospect.prospect_id)}
                >
                    Delete
                </button>

                <Popup
                    trigger={
                    <button className="ml-8 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                        {" "}
                        Convert Prospect{" "}
                    </button>
                    }
                    modal
                    nested
                >
                    {(close) => (
                    <div className="modal bg-slate-100 p-6 rounded-xl backdrop-blur-sm">
                        <div class="flex items-center justify-between border-b rounded-t">
                        <h3 class="text-xl font-medium text-gray-900">
                            Convert Prospect to Project
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 text-2xl bg-transparent hover:bg-gray-200 hover:text-gray-900 outline-none rounded-lg p-1.5 ml-auto inline-flex items-center"
                            data-modal-hide="medium-modal"
                            onClick={close}
                        >
                            &times;
                        </button>
                        </div>
                        <div className="p-6 space-y-6 block items-center">
                        <label className="font-bold w-32 inline-block">
                            Select Type Name
                        </label>
                        <span className="mr-2">:</span>
                        <select
                            className="rounded-lg"
                            name="type_id"
                            value={prospect.type_id}
                            onChange={handleChange}
                        >
                            <option value="">Select Type</option>
                            {Array.isArray(types.data) &&
                            types.data.map((type) => {
                                // Exclude the specific name you want to eliminate
                                if (type.project_type_code !== "PRP") {
                                return (
                                    <option key={type.ID} value={type.ID}>
                                    {type.project_name}
                                    </option>
                                );
                                }
                                return null;
                            })}
                        </select>
                        {errors && (
                            <p className="error-message text-sm text-red-700">
                            {errors}
                            </p>
                        )}
                        </div>
                        <div className="actions flex items-center gap-4 flex-wrap justify-between">
                        <button
                            className="bg-orange-500 mx-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                            console.log("modal closed ");
                            close();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 mx-4 hover:bg-green-700 text-white font-bold py-2 px-4 m-4 rounded"
                            onClick={async () => {
                            await handleConvertProspect(formData.type_id);
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
                    className="block text-lg font-medium leading-6 text-gray-900 py-1 pl-1"
                >
                    Sales Activity
                </label>
                <input
                    type="text"
                    className="rounded-lg my-2 w-full"
                    name="activity"
                    value={salesInputValue.activity}
                    onChange={(event) => handleSalesChange(event, "activity")}
                    onKeyDown={(event) => handleSalesEnter(event, "activity")}
                />
                <div>
                    {salesActivity.activity.map((list, index) => (
                    <span
                        key={list}
                        className="block text-base font-normal text-black"
                    >
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
    );
    };

    export default ProspectDetail;