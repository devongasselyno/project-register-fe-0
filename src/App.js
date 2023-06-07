import './App.css';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import { Outlet } from 'react-router-dom';



function App() {
  return (
    <div className='flex'>
      <div className='w-[12%] fixed'>
        <Sidebar />
      </div>

      <div className='w-[88%] ml-auto'>
        <DashboardView />
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
