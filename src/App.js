import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className='flex'>
      <div className='basis-[12%] h-[100vh]'>
        <Sidebar />
      </div>
      <div className='basis-[88%] border'>
        <DashboardView />
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
