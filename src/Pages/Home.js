
import '../App.css';
import Base from '../Components/Base.js';
import { getCurrentUser } from '../auth.js';
import { isAuthenticated, getToken,setRoleID,getRoleID } from '../auth.js';
import { useState,useEffect } from 'react';
import Login from './Login.js';

function Home() {

   const curruser = getCurrentUser(); 
   const logIn = isAuthenticated();

   const [data, setdata] = useState({});

   useEffect(() => {
    if(logIn){
    fetch(
      `http://localhost:3000/viewprofile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      });
    }
  }, []);

  if(logIn){
    if(data.role=='admin'){
      setRoleID(data.admin && data.admin.id)
      console.log(getRoleID())
    }
    if(data.role=='teacher'){
      setRoleID(data.teacher && data.teacher.id)
      console.log(getRoleID())
    }
    if(data.role=='student'){
      setRoleID(data.student && data.student.id)
      console.log(getRoleID())
    }
  }

  return (
    <Base>
      <div className="App">
      
        {logIn?
          <h1>Hello {data.role}, {data.email}</h1>
          :
          <h1>Hello, User</h1>
        }

        <img src='https://media-public.canva.com/sAoQk/MAEvNosAoQk/1/tl.png' />
      
    </div>
    </Base>
  );
}

export default Home;
