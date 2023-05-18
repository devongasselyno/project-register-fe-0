import React from 'react'
import { useState } from 'react'
import { FaCaretDown, FaCaretUp, FaEnvelope, FaRegBell, FaSearch, FaUser } from 'react-icons/fa'
import Clock from 'react-live-clock'

function DashboardView() {

    const [isOpen, setIsOpen] = useState(false)
    const current = new Date();
    const date = `${getDayName(current)}, ${current.getDate()} ${getMonthName(current.getMonth())} ${current.getFullYear()}`;

    function getDayName(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getUTCDay()];
    }

    function getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    // const fetchData = async () => {
    //     try {
    //         const {data} = await axios.get(`https://rickandmortyapi.com/api/character/`)
    //         setCharacters(data.results)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

  return (
    <div className='flex items-center justify-between h-[70px] shadow-lg px-6'>
        <div className='flex items-center rounded-md'>
            <input type='text' className='bg-[#F8F9FC] h-10 outline-none pl-3 w-[350px] rounded-md placeholder:text-sm leading-5 font-normal' placeholder='Search'/>
            <div className='bg-[#4E73DF] h-10 px-3 flex items-center justify-center cursor-pointer rounded-tr-md rounded-br-md'>
                <FaSearch color='white'/>
            </div>
        </div>
        <div className='flex items-center gap-4 relative'>
            <div className='items-center gap-6 border-r-2 pr-6'>
                <h1>{date}</h1>
                <Clock className='float-right' format={'HH:mm A'} ticking={true} timezone={'IND'} />
            </div>
            <div className='flex items-center gap-4 relative'>
                
                <div onClick={() => setIsOpen((prev) => !prev)} className='   cursor-pointer flex items-center justify-center relative'>
                    <p>James Bond</p>
                    {
                        !isOpen ? (
                            <FaCaretDown className='h-5'/>
                        ) : (
                            <FaCaretUp className='h-5' />
                        )
                    }
                </div>

                {
                    isOpen && <div className=' bg-slate-100 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
                        <div className='w-full justify-between cursor-pointer rounded-r-lg border-l-transparent'>
                        <div className='hover:bg-blue-300'>
                            <a href=''>Profile</a>
                        </div>
                        <div className='hover:bg-blue-300'>
                            <a href='/login'>Log out</a>
                        </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    </div>
  )
}

export default DashboardView