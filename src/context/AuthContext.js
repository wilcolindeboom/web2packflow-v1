import React, {useState} from 'react';
import {createContext} from 'react';
import { useHistory, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import {useEffect} from 'react';

export const AuthContext = createContext({});


function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState(
        {
            isAuth:false,
            user: {
                email: null,
                username: null,
                id: null,
                roles: [],
            },
            status:"pending",
        });

    const history = useHistory();


    useEffect( () => {

        const JWT = localStorage.getItem('token');
        if(JWT) {
            console.log(`token found: ${JWT}`);
            const decodedToken = jwt_decode(JWT);
            const {sub} = decodedToken;

            getUserData(JWT,sub);
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
        console.log(decodedToken);
        const {sub} = decodedToken;
        loginUser(JWT,sub);

        async  function loginUser(JWT,id) {

            console.log("token:" + JWT);
            console.log("id:" + id);

            try {
                const result = await axios.get(`http://localhost:8080/api/v1/users/${id}`,
                // const result = await axios.get(`http://localhost:3000/600/users/${id}`,
                    {headers: {'Authorization': `Bearer ${JWT}`}
                    });
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: {
                        email: result.data.email,
                        username: result.data.username,
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
        logIn:logIn
    };



    async  function getUserData(JWT,id) {

        console.log("token:" + JWT);
        console.log("id:" + id);

        try {
            const result = await axios.get(`http://localhost:8080/api/v1/users/${id}`,
            // const result = await axios.get(`http://localhost:3000/600/users/${id}`,
                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    email: result.data.email,
                    username: result.data.username,
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