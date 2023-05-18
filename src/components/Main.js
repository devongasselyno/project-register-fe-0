import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProspectDetail from './ProspectDetail';
import axios from 'axios';

const Main = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading]  = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(5)

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = posts.slice(firstIndex, lastIndex)
  const npage = Math.ceil(posts.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const navigate = useNavigate()

  const handleProspectClick = (id) => {
    navigate(`/prospect/read/${id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get('http://127.0.0.1:8080/api/prospect/read')
      setPosts(res.data.data)
      setLoading(false)
    }
    fetchPosts();
  }, [])

  if (loading && posts.length === 0){
    return <h2>Loading...</h2>
  }

  return (
    <div className='pt-6 px-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl leading-8 font-normal'>Dashboard</h1>
      </div>
  
      <div className='py-6'>
        <table className='table-auto border-collapse'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>ID</th>
              <th className='border px-4 py-2'>Company</th>
              <th className='border px-4 py-2'>Client</th>
              <th className='border px-4 py-2'>Unique No</th>
              <th className='border px-4 py-2'>Year</th>
              <th className='border px-4 py-2'>Prospect ID</th>
              <th className='border px-4 py-2'>Prospect Name</th>
              <th className='border px-4 py-2'>Sales/Project Manager</th>
              <th className='border px-4 py-2'>Status</th>
              <th className='border px-4 py-2'>Prospect Title</th>
              <th className='border px-4 py-2'>Prospect Amount</th>
              <th className='border px-4 py-2'>Jira</th>
              <th className='border px-4 py-2'>Clockify</th>
              <th className='border px-4 py-2'>PCS</th>
              <th className='border px-4 py-2'>PMS</th>
            </tr>
          </thead>

          <tbody>
            {records.map(row => 
              <tr key={row.ID} className='cursor-pointer hover:bg-blue-200' onClick={() => handleProspectClick(row.ID)}>
                <td className='border px-4 py-2'>{row.ID}</td>
                <td className='border px-4 py-2'>{row.company.company_name}</td>
                <td className='border px-4 py-2'>{row.client.client_name}</td>
                <td className='border px-4 py-2'>{row.no}</td>
                <td className='border px-4 py-2'>{row.year}</td>
                <td className='border px-4 py-2'>{row.prospect_id}</td>
                <td className='border px-4 py-2'>{row.prospect_name}</td>
                <td className='border px-4 py-2'>{row.manager}</td>
                <td className='border px-4 py-2'>{row.status}</td>
                <td className='border px-4 py-2'>{row.title}</td>
                <td className='border px-4 py-2'>{row.amount}</td>
                <td className='border px-4 py-2'>{row.jira ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                <td className='border px-4 py-2'>{row.clockify ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                <td className='border px-4 py-2'>{row.pcs ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                <td className='border px-4 py-2'>{row.pms ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
              </tr>
            )}
          </tbody>
        </table>
        
        
        <nav aria-label="Page navigation example" className='pagination py-7'>
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <a onClick={prevPage} href="#" className="flex items-center justify-center h-8 w-8 rounded border border-gray-300 bg-white text-gray-900 rtl:rotate-180 hover:bg-[#4E73DF] hover:text-white">
                <span class="sr-only">Previous</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              </a>
            </li>
            
            {
              numbers.map((n, i ) => (
                <li className={`page-item ${currentPage === n ? 'active:' : ''}`} key={i}>
                  <a onClick={() => changeCPage(n)} href="#" className={`block h-8 w-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900 hover:bg-[#4E73DF] hover:text-white ${currentPage === n ? 'bg-[#4E73DF]' : ''}`}>
                    {n}
                  </a>
                </li>
              ))
            }
  
            <li>
              <a onClick={nextPage} href="#" class="flex items-center justify-center h-8 w-8 rounded border border-gray-300 bg-white text-gray-900 rtl:rotate-180 hover:bg-[#4E73DF] hover:text-white">
                <span class="sr-only">Next</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              </a>
            </li>
          </ul>
        </nav>
        
        <a href='/prospect/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
          Add Prospect
        </a>
        
      </div>
    </div>
  );  

  function prevPage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
}

export default Main