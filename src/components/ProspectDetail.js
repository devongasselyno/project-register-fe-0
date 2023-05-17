import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProspectDetail = () => {
  const [prospect, setProspect] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8080/api/prospect/read');
        setProspect(res.data.data[0]);
      } catch (err) {
        console.error('Error fetching prospect data:', err);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Save the updated prospect data
    // You can make an API call here or update the data in any other way
  };

  return (
    <div className='p-6'>
      <div className='py-6'>
        <h1 className='text-2xl leading-8 font-normal'>Prospect Detail</h1>
      </div>

      {prospect && (
        <div>
          <div className='mb-4'>
            <label className='font-bold'>Prospect Name:</label>
            {editMode ? (
              <input
                type='text'
                className='rounded-lg'
                placeholder={prospect.prospect_name}
                readOnly={!editMode}
              />
            ) : (
              <span>{prospect.prospect_name}</span>
            )}
          </div>

          <div className='mb-4'>
            <label className='font-bold'>Type ID:</label>
            {editMode ? (
              <input
                type='text'
                className='rounded-lg'
                placeholder={prospect.type_id}
                readOnly={!editMode}
              />
            ) : (
              <span>{prospect.type_id}</span>
            )}
          </div>

          {/* Add more fields here based on the prospect object */}
        </div>
      )}

      {editMode ? (
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSaveClick}>
          Save
        </button>
      ) : (
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};

export default ProspectDetail;
