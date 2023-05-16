import Data from './Data.json'
import api from '../api/posts'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const Main = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading]  = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(7)

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentPosts = posts.slice(firstIndex, lastIndex)
  const npage = Math.ceil(Data.length / recordsPerPage)


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
        <h1 className='text-2xl leading-8 font-normal cursor-pointer'>Dashboard</h1>
      </div>
  
      <div>
        <table className='table-auto border-collapse border'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>ID</th>
              <th className='border px-4 py-2'>Name</th>
              <th className='border px-4 py-2'>Email</th>
            </tr>
          </thead>
          
          <tbody>
            {currentPosts.map(row => 
              <tr key={row.ID}>
                <td className='border px-4 py-2'>{row.ID}</td>
                <td className='border px-4 py-2'>{row.prospect_id}</td>
                <td className='border px-4 py-2'>{row.type_id}</td>
                <td className='border px-4 py-2'>{row.project_type.project_type_code}</td>
                <td className='border px-4 py-2'>{row.manager}</td>
                <td className='border px-4 py-2'>{row.status}</td>
                <td className='border px-4 py-2'>{row.amount}</td>
                <td className='border px-4 py-2'>{row.client_id}</td>
                <td className='border px-4 py-2'>{row.clockify}</td>
                <td className='border px-4 py-2'>{row.pcs}</td>
                <td className='border px-4 py-2'>{row.pms}</td>
              </tr>
            )}
          </tbody>
        </table>
  
        <Pagination pages={npage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );  
}

export default Main