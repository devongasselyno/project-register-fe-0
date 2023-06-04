import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<SigninPage />} />

                    <Route path='/dashboard' element={<App />}>
                        <Route index element={<Main />} />
                    </Route>

                    <Route path='/prospect' element={<App />}>
                        <Route index element={<ProspectList />} />
                    </Route>


                    <Route path='/project' element={<App />}>
                        <Route index element={<ProjectList />} />
                    </Route>

                    <Route path="/prospect/read/:id" element={<App />}>
                        <Route index element={<ProspectDetail />} />
                    </Route>

                    <Route path="/client/read/:id" element={<App />}>
                        <Route index element={<ClientDetail />} />
                    </Route>

                    <Route path="/contact/read/:id" element={<App />}>
                        <Route index element={<ContactDetail />} />
                    </Route>

                    <Route path='/prospect/create' element={<App/>}>
                        <Route index element={<CreateProspect />} />
                    </Route>

                    <Route path='/clientcontact/create' element={<App/>}>
                        <Route index element={<CreateClientContact />} />
                    </Route>

                    <Route path='/contact/create' element={<App/>}>
                        <Route index element={<CreateContact />} />
                    </Route>

                    <Route path='/client' element={<App/>}>
                        <Route index element={<ClientList />} />
                    </Route>

                    <Route path='/contact' element={<App/>}>
                        <Route index element={<ContactList />} />
                    </Route>

                    <Route path='/client/create' element={<App/>}>
                        <Route index element={<CreateClient />} />
                    </Route>
                    {/* <Route path='/clientcontact' element={<App/>}>
                        <Route index element={<ClientContactList />} />
                    </Route> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router