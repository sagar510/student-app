import '../App.css';
import { Link } from 'react-router-dom';
import { getCurrentUser,isAuthenticated } from '../auth';
import { useState,useEffect } from 'react';
import { NavLink as ReactLink, useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';



const NavBar = ()=> {

  const [islogin,setLogin] = useState(false);
  const role = getCurrentUser()?.role;

  useEffect(()=>{
    setLogin(isAuthenticated());
  },[islogin]);

    return (
      <AppBar position='static' className="app-bar">
        <Toolbar>
        <Button component={Link} color='inherit' className="eachlink" to="/">Home</Button>
        <Button component={Link} color='inherit' to="/About">About</Button>
        <Button component={Link} color='inherit' to="/Contact">Contact</Button>

        {(islogin&&role=='admin')?
        <>
        <Button component={Link} color='inherit' to="/AddMember">AddMember</Button>
        <Button component={Link} color='inherit' to="/Members">Members</Button>
        </>
        :null
        }

        {(islogin&&role=='teacher')?
        <>
        <Button component={Link} color='inherit' to="/AddCourse">Add Course</Button>
        <Button component={Link} color='inherit' to="/teach">New</Button>
        </>
        :null
        }

        {islogin?
        <>
        <Button component={Link} color='inherit' to="/profile">Profile</Button>
        <Button component={Link} color='inherit' to="/logout">Logout</Button>
        </>
        :
        <Button component={Link} color='inherit' to="/login" >Login</Button>
        }
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;