import React from 'react'
import {FaCalendarCheck, FaTachometerAlt} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='bg-black h-screen px-6'>
        <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
            <img src='soluix.png'/>
        </div>
        <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
            <FaTachometerAlt color='white'/>
            <a href='/dashboard' className='text-[14px] leading-5 font-bold text-white'>Dashboard</a>
        </div>
        <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
            <FaCalendarCheck color='white'/>
            <p className='text-[14px] leading-5 font-bold text-white'>Projects</p>
        </div>
        <div>

        </div>
    </div>
  )
}

export default Sidebar