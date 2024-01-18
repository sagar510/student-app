import {jwtDecode} from 'jwt-decode';

const TOKEN_KEY = "authToken";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY,token);

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

