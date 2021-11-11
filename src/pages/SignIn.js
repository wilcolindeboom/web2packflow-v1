import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import axios from "axios";
import './SignIn.css';


function SignIn() {

    const {isAuth, logIn} = useContext(AuthContext);
    const { handleSubmit, register } = useForm();
    const history = useHistory();


    async  function postData(data) {

           try {
               const result = await axios.post('http://localhost:8080/api/v1/auth/signin',data,
                   {headers: {'Content-Type':'application/json'}
                   });
               console.log(result.data);
               logIn(result.data.accessToken);

           }
           catch (error) {
               if (error.response) {
                   console.log(error.response.data);
                   alert(error.response.data.message + '\n'+ error.response.data.error);
                   console.log(error.response.status);
                   console.log(error.response.headers);
               } else if (error.request) {
                   console.log(error.request);
                   alert("geen verbinding met de server mogelijk");
               } else {
                   console.log('Error', error.message);
                   alert(error.message);
               }
               console.log(error.config);
               console.log("error");

           }

       }

    function onSubmit(data) {
        console.log(data);
        console.log("submitted");
        postData(data);
    }


  return (


    <>
        {isAuth ? history.push('/buckets')  :
        <div>

            <h1>Inloggen</h1>
            <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="details-username">
                    loginnaam
                    <input
                        type="text"
                        id="details-username"
                        {...register("username", {required: true})}
                    />
                </label>

                <label htmlFor="details-password">
                    wachtwoord
                    <input
                        type="password"
                        id="details-password"
                        {...register("password", {required: true})}
                    />
                </label>

                <button type="submit"
                >
                    Inloggen
                </button>
            </form>
            <p>Heb je nog geen account? Vraag dit dan eerst <Link to="/signup">hier</Link> aan</p>

        </div>
        }
    </>


  );
}

export default SignIn;