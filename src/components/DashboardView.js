import React from 'react'
import { useState , useEffect} from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import Clock from 'react-live-clock'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../index"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'


function DashboardView() {

    const [isOpen, setIsOpen] = useState(false)
    const current = new Date();
    const date = `${getDayName(current)}, ${current.getDate()} ${getMonthName(current.getMonth())} ${current.getFullYear()}`;

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    
    function getDayName(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getUTCDay()];
    }

    function getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    const navigate = useNavigate();

    const handleProspectClick = (id) => {
      navigate(`/prospect/read/${id}`)
    }

    const [prospects, setProspects] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('http://127.0.0.1:8080/api/prospect/read');
          const modifiedProspects = res?.data?.data.map((prospect) => {
            const { prospect_name, ...rest } = prospect;
            return { name: prospect_name, ...rest };
          });
          setProspects(modifiedProspects);
        } catch (err) {
          console.error('Error fetching prospect data:', err);
        }
      };
      fetchData();
    }, []);
    

      const handleOnSearch = (string, results) => {
         console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        console.log(result)
      }
    
      const handleOnSelect = (prospects) => {
        console.log(prospects)
        handleProspectClick(prospects.ID)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }

      const handleOnClear = () => {
        console.log("Cleared");
      };
   
      const formatResult = (result) => {
        return (
          <>
            <span onClick={() => handleProspectClick(result.ID)} style={{ display: 'block', textAlign: 'left' }}>{result.name}</span>
          </>
        )
      }
      
      // const formatResult = (result) => {
      //   console.log("idDDDDDDDDDDDD", result.id)
      //   if (result?.type_id === 1) {
      //     return (
      //       <>
      //         <span style={{ display: 'block', textAlign: 'left', fontWeight: 'bold' }}>Projects</span>
      //         <span onClick={() => handleProspectClick(result?.id)} style={{ display: 'block', textAlign: 'left' }}>{result?.name}</span>
      //       </>
      //     );
      //   } else if (result?.type_id === 2) {
      //     return (
      //       <>
      //         <span style={{ display: 'block', textAlign: 'left', fontWeight: 'bold' }}>Prospects</span>
      //         <span onClick={() => handleProspectClick(result?.id)} style={{ display: 'block', textAlign: 'left' }}>{result?.name}</span>
      //       </>
      //     );
      //   } else {
      //     return (
      //       <>
      //         <span onClick={() => handleProspectClick(result?.id)} style={{ display: 'block', textAlign: 'left' }}>{result?.name}</span>
      //       </>
      //     );
      //   }
      // };


  const name = [...prospects, prospects.name]
  return (
    <div className='flex items-center justify-between h-[70px] shadow-lg px-6'>
            {/* Search ------------------- */}
        <div className='w-96 ml-16'>
            <ReactSearchAutocomplete
                items={prospects}
                fuseOptions={{ keys: ["name"] }}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                onClear={handleOnClear}
                autoFocus
                formatResult={formatResult}
            />
        </div>

        <div className='flex items-center gap-4 relative'>
            <div className='items-center gap-6 border-r-2 pr-6'>
                <h1>{date}</h1>
                <Clock className='float-right' format={'HH:mm A'} ticking={true}  />
            </div>

    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button onClick={() => setIsOpen((prev) => !prev)} className="items-center inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900">
          User
          {!isOpen ? (
            <FaCaretUp className="-mr-1 h-4 w-4" aria-hidden="true" />
          ) : (
            <FaCaretDown className="-mr-1 h-4 w-4" aria-hidden="true" />
          )}
          
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                        href='login'
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
            
        </div>
    </div>
  )
}

export default DashboardView