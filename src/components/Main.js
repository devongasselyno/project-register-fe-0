import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProspectDetail from './forms/ProspectDetail';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import LineChart from './charts/LineChart';
import CurveLineChart from './charts/CurveLineChart';
import BarChart from './charts/BarChart';
import FilledLineChart from './charts/FilledLineChart';
import { getAllProjects } from '../api/services/Project';
import { getAllProspects } from '../api/services/Prospect';
import ProjectTable from './tables/ProjectTable';

const Main = () => {
const [posts, setPosts] = useState([])
const [loading, setLoading]  = useState(false)

const navigate = useNavigate()

const handleProspectClick = (id) => {
    navigate(`/prospect/read/${id}`);
}

useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true)
        const res1 = await getAllProjects()
        const res2 = await getAllProspects()

        const data = [...res1, ...res2];
        setPosts(data)
        setLoading(false)
    }
    fetchPosts();
}, [])

if (loading && posts.length === 0){
    return <h2>Loading...</h2>
}

ChartJS.register(ArcElement, Tooltip, Legend);
const getChartData = () => {
    const type1Count = posts.filter((post) => post.type_id === 1).length;
    const type2Count = posts.filter((post) => post.type_id !== 1).length;

    return {
    labels: ['Prospect', 'Project'],
    datasets: [
        {
        data: [type1Count, type2Count],
        backgroundColor: ['#FF6384', '#36A2EB'],
        },
    ],
    }
}


return (
        <div className='pt-10 px-20'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl leading-8 font-normal'>Dashboard</h1>
            </div>

            <div className='py-6'>

                <div className='flex justify-between'>
                    <div className='bg-[#321FDB] rounded-md p-5 text-white'>
                        <div className='pb-3'>
                            <h1 >Total Revenue</h1>
                            <div className='flex items-baseline gap-2'>
                                <h3 className='text-2xl'>300$ </h3>
                                <span className='text-md'>(-12.4 %)</span>
                            </div>
                        </div>

                        <CurveLineChart />
                        </div>

                        <div className='bg-[#3399FF] rounded-md p-5 text-white'>
                        <div className='pb-3'>
                        <h1 >Total Revenue</h1>
                            <div className ='flex items-baseline gap-2'>
                                <h3 className ='text-2xl'>300$ </h3>
                                <span className ='text-md'>(-12.4 %)</span>
                            </div>
                        </div>
                        <LineChart />
                        </div>
                        <div className='bg-[#F9B115] rounded-md p-5 text-white'>
                        <div className='pb-3'>
                            <h1 >Total Revenue</h1>
                            <div className='flex items-baseline gap-2'>
                                <h3 className='text-2xl'>300$ </h3>
                                <span className='text-md'>(-12.4 %)</span>
                            </div>
                        </div>
                        <FilledLineChart />
                        </div>

                    <div className='bg-[#E55353] rounded-md p-5 text-white'>
                        <div className='pb-3'>
                            <h1 >Total Revenue</h1>
                            <div className='flex items-baseline gap-2'>
                                <h3 className='text-2xl'>300$ </h3>
                                <span className='text-md'>(-12.4 %)</span>
                            </div>
                        </div>
                        
                        <BarChart />
                    </div>
                </div>
                
                <div className='my-10' style={{ maxWidth: '800px', maxHeight: '700px', overflow: 'auto' }}>
                    <Doughnut
                    data={getChartData()}
                    options={{
                        responsive: false,
                        maintainAspectRatio: true,
                    }}
                    />
                </div>

                <ProjectTable />
            </div>
        </div>
    )  
}

export default Main