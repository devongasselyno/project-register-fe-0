import React, { useState } from 'react'
import { FaCalendarCheck, FaChartLine, FaPaperPlane, FaTachometerAlt, FaCaretDown, FaCaretUp } from 'react-icons/fa'


const Sidebar = () => {
  const [dropdown, setDropdown] = useState(false)
  const handleDropdownClick = () => {
    setDropdown(!dropdown);
  }
  return (
    <div className='bg-black h-screen px-6 overflow-hidden w-44'>
      <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
        <a href="/dashboard">
          <img src='../soluix.png' />
        </a>
      </div>
      <div className='flex items-center gap-4 py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <FaTachometerAlt color='white' />
        <a href='/dashboard' className='text-[14px] leading-5 font-bold text-white'>Dashboard</a>
      </div>

      <div className='flex items-center gap-4 py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <FaPaperPlane color='white' />
        <a href='/prospect' className='text-[14px] leading-5 font-bold text-white'>Prospects</a>
      </div>
      <div className='flex items-center gap-4 py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <FaCalendarCheck color='white' />
        <a href='/project' className='text-[14px] leading-5 font-bold text-white'>Projects</a>
      </div>
      <div className='flex items-center gap-4 py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <FaChartLine color='white' />
        <a href='/sales' className='text-[14px] leading-5 font-bold text-white'>Sales Activity</a>
      </div>
      <div className='items-center py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <div className='flex gap-4 cursor-pointer' onClick={handleDropdownClick}>
          {dropdown ? (
            <FaCaretUp color='white' />
          ) : (
            <FaCaretDown color='white' />
          )}
          <p className='text-sm leading-5 font-bold text-white'>Other</p>
        </div>

        {dropdown && (
          <div className='pl-8 mt-3 gap-y-3 overflow-hidden transition-all duration-500 ease-in-out grid'>
            <a href='/client' className="text-sm leading-5 font-bold text-white transition-opacity delay-150">Clients</a>
            <a href='/contact' className="text-sm leading-5 font-bold text-white transition-opacity delay-300">Contacts</a>
            <a href='/clientcontact' className="text-sm leading-5 font-bold text-white transition-opacity delay-450">Client Contacts</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar