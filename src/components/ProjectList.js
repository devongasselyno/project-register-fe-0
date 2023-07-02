import React from 'react'
import ProjectTable from './tables/ProjectTable'

const ProjectList = () => {
    return (
        <div className='pt-10 px-20'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Projects</h1>
            </div>

            <ProjectTable />
        </div>
    )
}

export default ProjectList