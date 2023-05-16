import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Main from '../components/Main'
import SigninPage from '../components/SingIn'

const Router = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard' element={<App />}>
                <Route index element={<Main />} />
                <Route path="/signin" element={<SigninPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default Router