import React, { useEffect, useState } from "react";
import api from '../api/posts';
import axios from "axios";
import { useParams } from 'react-router-dom';
import api from "../api/posts"
import { async } from "q";

const ProspectDetail = () => {
  const { id } = useParams();
  console.log("aaaaaaaaaaaaaaaa",{id})
  const [prospect, setProspect] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8080/api/prospect/read/${id}`);
        setProspect(res.data.data);
      } catch (err) {
        console.error("Error fetching prospect data:", err);
      }
    };

    fetchData();
  }, [id]);

  const [types, setTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
      const fetchCompanies = async () => {
          try {
              const response = await api.get('/company/read');
              setCompanies(response.data);
          } catch (error) {
              console.error('Failed to fetch companies:', error);
          }
      };

      const fetchClients = async () => {
          try {
              const response = await api.get('/client/read', {
                  params: {
                      limit: 100,
                  },
              });
              setClients(response.data);
          } catch (error) {
              console.error('Failed to fetch clients:', error);
          }
      };

      const fetchTypes = async () => {
          try {
              const response = await api.get('/type/read');
              setTypes(response.data)
          } catch (error) {
              console.error('Failed to fetch types:', error);
          }
      };

      fetchCompanies();
      fetchClients();
      fetchTypes();
  }, []);

  const [editMode, setEditMode] = useState(false);
  

  const [formData, setFormData] = useState({
    type_id: 0,
    ID: '',
    prospect_name: '',
    year: 0,
    manager: '',
    status:'',
    amount: 0,
    company_id: 0,
    client_id: 0,
    clockify: false,
    jira: false,
    pcs: 0,
    pms: 0
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

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

  const [prospectID, setProspectID] = useState('');
  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:8080/api/prospect/delete/', {
        data: {
          ID: prospectID,
        },
      });
      // Delete request successful
      console.log('Prospect deleted successfully');
    } catch (error) {
      // Error handling
      console.error('Error deleting prospect:', error);
    }
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
                  name="ID"
                  value={formData.ID}
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
