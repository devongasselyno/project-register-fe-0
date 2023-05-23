import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Main from '../components/Main'
import SigninPage from '../components/SingIn'
import CreateProspect from '../components/CreateProspect'
import ProspectDetail from '../components/ProspectDetail'
import CreateType from '../components/CreateType'
import ProjectList from '../components/ProjectList'
import ProspectList from '../components/ProspectList'

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

                    <Route path='/prospect/create' element={<App/>}>
                        <Route index element={<CreateProspect />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router