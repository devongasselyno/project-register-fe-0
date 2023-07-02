import ProspectTable from './tables/ProspectTable';

const ProspectList = () => {
    return (
        <div className='py-10 px-20'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-4xl leading-8 font-bold py-5'>Prospect</h1>
                <a href='/prospect/create' class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                    Add Prospect
                </a>
            </div>

            <ProspectTable />
        </div> 
    )
}

export default ProspectList