import React, {useState} from 'react';
import {createContext} from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import {useEffect} from 'react';

export const AuthContext = createContext({});


function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState(
        {
            isAuth:false,
            isAdmin:false,
            IsUser:false,
            user: {
                email: null,
                username: null,
                id: null,
                roles: [],
            },
            status:"pending",
        });

    function toggleAdminMode(checked) {
        localStorage.setItem('adminMode', (checked).toString());
        toggleIsAuth({...isAuth,
            adminMode: checked,
                    });
    }


    const history = useHistory();


    useEffect( () => {

        const JWT = localStorage.getItem('token');
        const adminMode = localStorage.getItem('adminMode') === 'true' ;
        if(JWT) {
            const decodedToken = jwt_decode(JWT);
            const {sub} = decodedToken;

            getUserData(JWT,sub, adminMode);
        } else {
            toggleIsAuth({
                ...isAuth,
                status: 'done'
            });
        }
    } ,[]);

   function logOff() {
       toggleIsAuth({
               ...isAuth,
            isAuth: false
    });
       console.log("user logged off!");
       localStorage.clear();
       history.push('/');
    }

    function logIn(JWT) {
        localStorage.setItem('token',JWT);
        const decodedToken = jwt_decode(JWT);
        const {sub} = decodedToken;
        loginUser(JWT,sub);

        async  function loginUser(JWT,id) {
            try {
                const result = await axios.get(`http://localhost:8080/api/v1/users/${id}`,
                    {headers: {'Authorization': `Bearer ${JWT}`}
                    });
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    isAdmin:  result.data.roles.some((role) => role.name.includes("ROLE_ADMIN")),
                    isUser: result.data.roles.some((role) => role.name.includes("ROLE_USER")),
                    adminMode: result.data.roles.some((role) => role.name.includes("ROLE_ADMIN")),
                    user: {
                        email: result.data.email,
                        username: result.data.username,
                        roles: result.data.roles,
                        id: result.data.id
                    },
                    });
                history.push('/buckets');
            }
            catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
                toggleIsAuth({
                    ...isAuth,
                    isAuth: false,
                    status: 'done'
                });
            }
        }
    }

    const authData = {
        isAuth: isAuth.isAuth,
        logOff:logOff,
        userName: isAuth.user.username,
        isAdmin: isAuth.isAdmin,
        isUser: isAuth.isUser,
        adminMode: isAuth.adminMode,
        toggleAdminMode: toggleAdminMode,
        logIn:logIn
    };


    async  function getUserData(JWT,id, adminMode) {
        try {
            const result = await axios.get(`http://localhost:8080/api/v1/users/${id}`,
                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                isAdmin:  result.data.roles.some((role) => role.name.includes("ROLE_ADMIN")),
                isUser: result.data.roles.some((role) => role.name.includes("ROLE_USER")),
                adminMode: result.data.roles.some((role) => role.name.includes("ROLE_ADMIN")) && adminMode,
                user: {
                    email: result.data.email,
                    username: result.data.username,
                    roles: result.data.roles,
                    id: result.data.id
                },
               status: 'done'
            });
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            toggleIsAuth({
                ...isAuth,
                isAuth: false,
                status: 'done'
            });
        }

    }

    return (
        <AuthContext.Provider value= {authData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;