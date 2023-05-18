import React, { useEffect, useState } from "react";
import axios from "axios";

const ProspectDetail = () => {
 
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    ID: '',
    prospect_name: '',
    type:0,
    manager: '',
    amount: 0,
    clockify: false,
    jira: false,
    type_id: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };


  const [prospect, setProspect] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8080/api/prospect/read", prospect);
        setProspect(res.data.data[0]);
      } catch (err) {
        console.error("Error fetching prospect data:", err);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProspect = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/prospect/update`, formData);
      console.log(response.data);
      setEditMode(false); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
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
              <label className="font-bold w-32 inline-block w-32 inline-block">Type ID</label>
              <span className="mr-2">:</span>
              {editMode ? (
                <input
                  type="text"
                  className="rounded-lg"
                  placeholder={prospect.type_id}
                  readOnly={!editMode}
                  onChange={handleChange}
                />
              ) : (
                <span>{prospect.type_id}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="font-bold w-32 inline-block">Year</label>
              <span className="mr-2">:</span>
              {editMode ? (
                <input
                  type="text"
                  className="rounded-lg"
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
                  type="text"
                  className="rounded-lg"
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
                <input
                  type="text"
                  className="rounded-lg"
                  placeholder={prospect.company_id}
                  readOnly={!editMode}
                  onChange={handleChange}
                />
              ) : (
                <span>{prospect.company_id}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="font-bold w-32 inline-block">Client ID</label>
              <span className="mr-2">:</span>
              {editMode ? (
                <input
                  type="text"
                  className="rounded-lg"
                  placeholder={prospect.client_id}
                  readOnly={!editMode}
                  onChange={handleChange}
                />
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
                  checked={prospect.jira}
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
                  checked={prospect.clockify}
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
          onClick={handleSaveClick}
        >
          Delete
        </button>
    </div>
  );
};

export default ProspectDetail;
