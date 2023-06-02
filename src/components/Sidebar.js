import React from 'react'
import {FaCalendarCheck, FaChartLine, FaPaperPlane, FaTachometerAlt} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='bg-black h-screen px-6'>
        <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
            <img src='../soluix.png'/>
        </div>
        <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
            <FaTachometerAlt color='white'/>
            <a href='/dashboard' className='text-[14px] leading-5 font-bold text-white'>Dashboard</a>
        </div>

        <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <FaPaperPlane color='white'/>
          <a href='/prospect' className='text-[14px] leading-5 font-bold text-white'>Prospects</a>
        </div>
        <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
            <FaCalendarCheck color='white'/>
            <a href='/project' className='text-[14px] leading-5 font-bold text-white'>Projects</a>
        </div>
        <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
            <FaChartLine color='white'/>
            <a href='/sales' className='text-[14px] leading-5 font-bold text-white'>Sales Activity</a>
        </div>
    </div>
  )
}

export default Sidebar