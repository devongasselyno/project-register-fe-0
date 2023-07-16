import React from 'react'
import { useState , useEffect} from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import Clock from 'react-live-clock'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom'
import "../index"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { getAllProjects } from '../api/services/Project'
import { getAllProspects } from '../api/services/Prospect'


function Navbar() {

    const [isOpen, setIsOpen] = useState(false)
    const current = new Date();
    const date = `${getDayName(current)}, ${current.getDate()} ${getMonthName(current.getMonth())} ${current.getFullYear()}`;

    function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }
    
    function getDayName(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getUTCDay()]
    }

    function getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month]
    }

    const navigate = useNavigate()
    const handleProjectClick = (id, project_type) => {
        if (project_type === "Prospect") {
            navigate(`/prospect/read/${id}`)
        } else {
            navigate(`/project/read/${id}`)
        }
    }

    const handleSignout = async() =>  {
        sessionStorage.clear()
        navigate('/login')
    }

    const [prospects, setProspects] = useState([])
    const [projects, setProjects] = useState([])

    const fetchProjects = async () => {
        try {
            const res = await getAllProjects()
            const projects = res.data.data.map(project => ({
                ...project,
                name: project.project_name
            }));
            setProjects(projects);
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    }

    const fetchProspects = async () => {
        try {
            const res = await getAllProspects()
            const prospects = res.data.data.map(prospect => ({
                ...prospect,
                name: prospect.project_name
            }))
            setProspects(prospects)
        } catch (error) {
            console.error('Error fetching project data:', error)
        }
    }

    useEffect(() => {
        fetchProjects()
        fetchProspects()
    }, [])
    

    const handleOnSearch = (string, results) => {
        console.log(string, results)
    }
    
    const handleOnHover = (result) => {
        console.log(result)
    }
    
    const handleOnSelect = (result) => {
        handleProjectClick(result.ID, result.project_type.project_name)
    }
      
    const handleOnFocus = () => {
        console.log("Focused")
    }

    const handleOnClear = () => {
        console.log("Cleared")
    }

    const formatResult = (result) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left', fontWeight: 'bold' }}>{result.project_type.project_name}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>{result.project_name}</span>
            </>
        )
    }

return (
        <div className='flex items-center justify-between h-[70px] shadow-lg px-6'>
    
            <div className='w-96 ml-16 z-10'>
                <ReactSearchAutocomplete
                    items={[...prospects, ...projects]}
                    fuseOptions={{ keys: ["project_name"] }}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    onClear={handleOnClear}
                    formatResult={formatResult}
                    autoFocus
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
                            onClick={handleSignout}
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

export default Navbar