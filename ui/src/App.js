import logo from './logo.svg';
import {Link, Route, Routes, Router} from 'react-router-dom';
import './App.css';
import { Component } from 'react';
import { FetchUsers, StoreUser, UpdateUser,DeleteUser, ProfileLogin, UserRegistration, LogInUser, StoreContact, ShowContact } from './User';
import {Home} from './Home';
import { UserDashboard } from './components/UserDashboad';
import LoginComponent from './components/LoginComponent';
import { Dashboard } from './components/Dashboard';

function App() {
  return (<div>
    <Routes>
        <Route path = "/login" element = {<ProfileLogin />} />
        <Route path = "/*" element = {<ProfileLogin />} />
        <Route path = "/register" element = {<UserRegistration />} />
        <Route path = "/login/:id/" element = {<LogInUser />} />
        {/* <Route path = "/addcontact" element = {<StoreContact />} />
        <Route path = "/showcontact" element = {<ShowContact />} /> */}
    </Routes>  
  </div>)
 }


export default App;

