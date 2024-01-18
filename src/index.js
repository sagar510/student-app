import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Home from './Pages/Home.js';
import NavBar from './NavBar';
import About from './Pages/About.js';
import Contact from './Pages/Contact.js';
import Members from './Pages/Members.js';
import Login from './Pages/Login.js';
import AddMember from './Pages/AddMember.js';
import Logout from './Pages/Logout.js';
import Profile from './Pages/profile.js';
import AllTeachers from './AllTeachers';
import reportWebVitals from './reportWebVitals';
import { isAuthenticated,getCurrentUser } from './auth.js';
import Privateroute from './Components/PrivateRoute.js';
import PasswordChange from './Pages/changePassword.js';
import AddCourse from './Pages/AddCourse.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const islogin = isAuthenticated();
const role = getCurrentUser()?.role;

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/About' element={<About />} />
      <Route path='/Contact' element={<Contact />} />

      <Route path="/" element={<Privateroute />}> 
        <Route path='AddMember' element={<AddMember />} />
        <Route path='Members' element={<Members/>}/>
        <Route path='profile' element={<Profile />} />
        <Route path='/change_password' element={<PasswordChange />} />
        <Route path='AddCourse' element={<AddCourse />} />
      </Route>
      
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
