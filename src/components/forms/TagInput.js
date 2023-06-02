// import React, { useState } from 'react';

// const TagInputForm = () => {
//   const [tags, setTags] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter' && inputValue.trim() !== '') {
//       setTags((prevTags) => [...prevTags, inputValue.trim()]);
//       setInputValue('');
//       console.log(tags)
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setTags((prevTags) => prevTags.filter((t) => t !== tag));
//   };

//   return (
//     <div>
//       <div>
//         {tags.map((tag) => (
//           <span
//             key={tag}
//             className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
//           >
//             {tag}
//             <button
//               className="ml-2 text-red-500 hover:text-red-700"
//               onClick={() => handleRemoveTag(tag)}
//             >
//               &times;
//             </button>
//           </span>
//         ))}
//       </div>
//       <input
//         type="text"
//         className="border border-gray-300 rounded px-3 py-2 mt-2"
//         placeholder="Enter a tag and press Enter"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//       />
//     </div>
//   );
// };

// export default TagInputForm;

import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const TagInputForm = () => {
  const [contact, setContact] = useState({
    contact_name: "",
    contact_alias: "",
    gender: "",
    contact_emails: [''],
    contact_phones: [''],
    contact_social_presence: {
      linkedin: "",
      facebook: "",
      twitter: "",
      github: "",
      other: [''],
    },
    birth_date: "",
    religion: "",
    interests: [],
    skills: [],
    educations: [],
    notes: "",
  });
  const [inputValues, setInputValues] = useState({
    contact_emails: '',
    contact_phones: '',
    interests: '',
    skills: '',
    educations: '',
    other: '',
  });

  // const handleInputChange = (event) => {
  //   setInputValues(event.target.value);
  // };

  // const handleKeyPress = (event, field) => {
  //   if (event.key === 'Enter' && inputValues.trim() !== '') {
  //     setContact((prevContact) => ({
  //       ...prevContact,
  //       [field]: [...prevContact[field], inputValues.trim()],
  //     }));
  //     setInputValues({
  //       contact_emails: '',
  //       contact_phones: '',
  //       interests: '',
  //       skills: '',
  //       educations: '',
  //       other: '',
  //     });
  //     console.log(contact)
  //   }
  // };

  // const handleRemoveTag = (field, tag) => {
  //   setContact((prevContact) => ({
  //     ...prevContact,
  //     [field]: prevContact[field].filter((t) => t !== tag),
  //   }));
  // };

  const handleInputChange = (event, field) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [field]: event.target.value,
    }));
  };

  const handleKeyPress = (event, field) => {
    if (event.key === 'Enter' && inputValues[field].trim() !== '') {
      setContact((prevContact) => ({
        ...prevContact,
        [field]: [...prevContact[field], inputValues[field].trim()],
      }));
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [field]: '',
      }));
    }
  };

  const handleRemoveTag = (field, tag) => {
    setContact((prevContact) => ({
      ...prevContact,
      [field]: prevContact[field].filter((t) => t !== tag),
    }));
  };

  const printContact = () => {
    console.log(contact)
  }

  return (
    <div>
      <div>
        {contact.interests.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag}
            <button
              className="ml-2 text-slate-900 hover:text-slate-500"
              onClick={() => handleRemoveTag('interests', tag)}
            >
              <FaTimesCircle />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 mt-2"
        placeholder="Enter a tag and press Enter"
        value={inputValues.interests}
        onChange={(event) => handleInputChange(event, 'interests')}
        onKeyPress={(event) => handleKeyPress(event, 'interests')}
      />
      <div>
        {contact.contact_emails.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag}
            <button
              className="ml-2 text-slate-900 hover:text-slate-500"
              onClick={() => handleRemoveTag('contact_emails', tag)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 mt-2"
        placeholder="Enter a tag and press Enter"
        value={inputValues.contact_emails}
        onChange={(event) => handleInputChange(event, 'contact_emails')}
        onKeyPress={(event) => handleKeyPress(event, 'contact_emails')}
      />
      <div>
        <button type='button' onClick={printContact}>Show Contact</button>
      </div>
    </div>
  );
};

export default TagInputForm;