import React from 'react'
import { FaEnvelope, FaRegBell, FaSearch, FaUser } from 'react-icons/fa'

function DashboardView() {
  return (
    <div className='flex items-center justify-between h-[70px] shadow-lg px-6'>
        <div className='flex items-center rounded-md'>
            <input type='text' className='bg-[#F8F9FC] h-10 outline-none pl-3 w-[350px] rounded-md placeholder:text-sm leading-5 font-normal' placeholder='Search'/>
            <div className='bg-[#4E73DF] h-10 px-3 flex items-center justify-center cursor-pointer rounded-tr-md rounded-br-md'>
                <FaSearch color='white'/>
            </div>
        </div>
        <div className='flex items-center gap-4 relative'>
            <div className='flex items-center gap-6 border-r-2 pr-6'>
                <FaRegBell/>
                <FaEnvelope/>
            </div>
            <div className='flex items-center gap-4 relative'>
                <p>James Bond</p>
                <div className='h-[50px] w-[50px] rounded-full border-2 cursor-pointer flex items-center justify-center relative'>
                    <FaUser />
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardView