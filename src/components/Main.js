import React, { useState } from 'react'
import Data from './Data.json'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex)
  const npage = Math.ceil(Data.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  return (
    <div className='pt-6 px-6 bg-slate-50'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl leading-8 font-normal cursor-pointer'>Dashboard</h1>
        </div>

        <div>
          <table className='table'>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </thead>
            <tbody>
              {records.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav> 
            <ul className='pagination flex items-center gap-5'>
              <li className='page-item flex items-center gap-1 bg-slate-600 px-6 py-2 rounded-lg'>
                <FaArrowLeft color='white'/>  
                <a href='#' className='page-link text-white' onClick={prevPage}>Prev</a>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a href='#' className='page-link'
                    onClick={()=> changeCPage(n)} >{n}</a>
                  </li>
                ))
              }
              <li className='page-item page-item flex items-center gap-1 bg-slate-600 px-6 py-2 rounded-lg'>
                
                <a href='#' className='page-link text-white' onClick={nextPage}>
                  Next
                </a>
                <FaArrowRight color='white'/>
              </li>
            </ul>
          </nav>
        </div>
    </div>
  )
  
  function prevPage() {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }
  }
}

export default Main