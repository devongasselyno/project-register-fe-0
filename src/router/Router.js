import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Main from '../components/Main'
import SigninPage from '../components/forms/SingIn'
import CreateProspect from '../components/forms/CreateProspect'
import ProspectDetail from '../components/forms/ProspectDetail'
import CreateType from '../components/forms/CreateType'
import ProjectList from '../components/ProjectList'
import ProspectList from '../components/ProspectList'
import CreateClientContact from '../components/forms/CreateClientContact'
import CreateContact from '../components/forms/CreateContact'
import ClientList from '../components/ClientList'
import ContactList from '../components/ContactList'
import ClientDetail from '../components/ClientDetail'
import ContactDetail from '../components/ContactDetail'
import CreateClient from '../components/forms/CreateClient'
import DataTable from '../components/TableTest'
import UpdateClient from '../components/forms/UpdateClient'
import UpdateContact from '../components/forms/UpdateContact'
import UpdateProject from '../components/forms/UpdateProject'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<SigninPage />} />

                <Route path='/dashboard' element={<App />}>
                    <Route index element={<Main />} />
                </Route>

                <Route path='/prospect' element={<App />}>
                    <Route index element={<ProspectList />} />
                </Route>

                <Route path="/client" element={<App />}>
                    <Route index element={<ClientList />} />
                    <Route path="create" element={<CreateClient />} />
                    <Route path="read/:id" element={<ClientDetail />} />
                    <Route path="update/:id" element={<UpdateClient />} />
                </Route>

                <Route path="/contact" element={<App />}>
                    <Route index element={<ContactList />} />
                    <Route path='read/:id' element={<ContactDetail />} />
                    <Route path='create' element={<CreateContact />} />
                    <Route path='update/:id' element={<UpdateContact />} />
                </Route>

                <Route path='/prospect' element={<App />}>
                    <Route index element={<ProjectList />} />
                    <Route path='create' element={<CreateProspect />} />
                    <Route path='read/:id' element={<ProspectDetail />} />
                    <Route path='update/:id' element={<UpdateProject/>} />
                </Route>

                <Route path='/table' element={<App />}>
                    <Route index element={<DataTable />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router