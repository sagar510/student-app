import React from 'react';
import { Outlet, useNavigate, Route} from 'react-router-dom'
import { isAuthenticated } from '../auth';
const Privateroute = () => {

    const navigate = useNavigate();

    return isAuthenticated() ? (
        <Outlet />
      ) : (
        navigate('/login')
      );
};

export default Privateroute;