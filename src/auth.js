import {jwtDecode} from 'jwt-decode';
import { useState,useEffect } from 'react';

const TOKEN_KEY = null;
//const [data, setdata] = useState({});
const roleID = 0;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY,token);

export const setRoleID = (roleIDp) => localStorage.setItem(roleID,roleIDp); 

export const getRoleID = () => localStorage.getItem(roleID);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const isAuthenticated = () => !!getToken();

export const getCurrentUser = () => {
    const token = getToken();

    try{
        const decodedToken = jwtDecode(token);

        const {user_id} = decodedToken;
        const {role} = decodedToken;
        const {email} = decodedToken;

        return {user_id,email,role};
    }
    catch{
        
    }
}
/*
export const setUserdata = () =>{
   

   useEffect(() => {
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
  }, [logIn==true]);
}
*/
