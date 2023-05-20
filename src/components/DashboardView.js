import React from 'react'
import { useState , useEffect} from 'react'
import { FaCaretDown, FaCaretUp, FaEnvelope, FaRegBell, FaSearch, FaUser } from 'react-icons/fa'
import Clock from 'react-live-clock'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios'

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

    const [prospects, setProspects] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`http://127.0.0.1:8080/api/prospect/read`)
            setProspects(res.data.data)
          } catch (err) {
            console.error("Error fetching prospect data:", err)
          }
        }
        fetchData()
     }, [])

    // const fetchData = async () => {
    //     try {
    //         const {data} = await axios.get(`https://rickandmortyapi.com/api/character/`)
    //         setCharacters(data.results)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (prospects) => {
        // the item selected
        console.log(prospects)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }

      const handleOnClear = () => {
        console.log("Cleared");
      };
    
      const formatResult = (prospects) => {
        return (
          <>
            {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {prospects.id}</span> */}
            <span style={{ display: 'block', textAlign: 'left' }}>{prospects.prospect_name}</span>
          </>
        )
      }

  return (
    <div className='flex items-center justify-between h-[70px] shadow-lg px-6'>
            {/* Search ------------------- */}
        <div className='w-96 ml-16'>
            <ReactSearchAutocomplete
                items={prospects}
                fuseOptions={{ keys: ["prospect_id", "prospect_name"] }}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                onClear={handleOnClear}
                autoFocus
                // styling={}
                formatResult={formatResult}
            />
        </div>

        <div className='flex items-center gap-4 relative'>
            <div className='items-center gap-6 border-r-2 pr-6'>
                <h1>{date}</h1>
                <Clock className='float-right' format={'HH:mm A'} ticking={true}  />
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