import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className='flex'>
            <div className='w-[12%] fixed'>
                <Sidebar />
            </div>

            <div className='w-[88%] ml-auto'>
                <Navbar />
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default App;
