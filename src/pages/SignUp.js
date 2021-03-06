import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from 'axios';
import {AuthContext} from "../context/AuthContext";
import './Signup.css';

function SignUp() {

    const { handleSubmit, register,  formState: { errors }  } = useForm({mode:"onTouched"});
    const {logIn} = useContext(AuthContext);
    const JWT =  localStorage.getItem("token");


    function  onSubmit(data) {
        console.log(data);
        postData(data);
    };

   async  function postData(data) {

       try {
           const result = await axios.post('http://localhost:8080/api/v1/auth/signup',data,
               {headers: {'Content-Type':'application/json' , 'Authorization': `Bearer ${JWT}`}
       });
           console.log(result.data);
           alert(result.data.message);
       }
       catch (error) {
           if (error.response) {
               console.log(error.response.data);
               error.response.data.error ? alert(error.response.data.error) : alert(error.response.data.message);
               console.log(error.response.status);
               console.log(error.response.headers);
           } else if (error.request) {
                 console.log(error.request);
           } else {
               console.log('Error', error.message);
           }
           console.log(error.config);
       }

   }



  return (
    <>
      <h1>Gebruiker registreren</h1>

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
              <p> <strong>gebruikersgegevens</strong></p>
          <label htmlFor="details-username">
              gebruikersnaam:
              <input
                  type="text"
                  id="details-username"
                  {...register("username", {required: true})}
              />
              {errors.username && errors.username.type === "required" && (
                  <span class="error">gebruikersnaam ontbreekt!</span>
              )}
          </label>
          <label htmlFor="details-password">
              wachtwoord:
              <input
                  type="password"
                  id="details-password"
                  {...register("password", {required: true})}
              />
              {errors.password && errors.password.type === "required" && (
                  <span class="error">wachtwoord ontbreekt!</span>
              )}
          </label>
          <label htmlFor="details-email">
              email:
              <input
                  type="email"
                  id="details-email"
                  {...register("email", {required: true})}
              />
              {errors.email && errors.email.type === "required" && (
                  <span class="error">emailadres ontbreekt!</span>
              )}
          </label>
          </fieldset>

          <fieldset>
              <p> <strong>gebruikersrollen</strong></p>
          <label htmlFor="details-role">
              <input
                  type="checkbox"
                  id="details-role"
                  value="user"
                  {...register("role", {required: true})}
              />
              gebruiker
          </label>
          <label htmlFor="details-role">
              <input
                  type="checkbox"
                  id="details-role"
                  value="admin"
                 {...register("role", {required: true})}
              />
              administrator
          </label>
              {errors.role && errors.role.type === "required" && (
                  <p class="error">geen rol gekozen!</p>
              )}

          </fieldset>
          <button
              type="submit"
          >
              Registreren
          </button>
      </form>
    </>
  );
}

export default SignUp;