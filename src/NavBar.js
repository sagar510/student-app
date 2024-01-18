//import './App.css';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './auth';
import { getCurrentUser } from './auth';
import { useState,useEffect } from 'react';
import { NavLink as ReactLink, useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
//import './NavBar.css';

const NavBar = ()=> {

  const [islogin,setLogin] = useState(false);
  const navigate = useNavigate();
  const role = getCurrentUser()?.role;

  useEffect(()=>{
    setLogin(isAuthenticated());
  },[islogin]);

    return (
      <AppBar position='static' className="app-bar">
        <Toolbar>
        <Button component={Link} color='inherit' to="/">Home</Button>
        <Button></Button>
        <Link className="eachlink" to="/About">About</Link>
        <Link className="eachlink" to="/Contact">Contact</Link>

        {(islogin&&role=='admin')?
        <>
        <Link className="eachlink" to="/AddMember">AddMember</Link>
        <Link className="eachlink" to="/Members">Members</Link>
        </>
        :null
        }

        {islogin?
        <>
        <Link className="eachlink" to="/profile">Profile</Link>
        <Link className="eachlink" to="/logout">Logout</Link>
        </>
        :
        <Link className="eachlink" to="/login" >Login</Link>
        }
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;