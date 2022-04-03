import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './Navigation'
import AddSatellite from './AddSatellite';
import Satellites from './Satellites';
import EditSatellite from './EditSatellite';
import Profile from './Profile';

import EditProfile from './EditProfile';

const Home = () => {

    return (
        <div>
            <Navigation />
            <Routes>
                <Route path='/satellites' exact element={<Satellites />} />
                <Route path="/addsatellite" element={<AddSatellite />} />
                <Route path="/satellites/edit/:id" element={<EditSatellite />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/edit" element={<EditProfile />} />
            </Routes>
        </div>
    )
}

export default Home