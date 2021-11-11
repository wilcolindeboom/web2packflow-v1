import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from 'axios';
import {AuthContext} from "../context/AuthContext";

function SignUp() {

    const { handleSubmit, register } = useForm();
    const {logIn} = useContext(AuthContext);


    function  onSubmit(data) {
        console.log(data);
        postData(data);
    };

   async  function postData(data) {

       try {
           const result = await axios.post('http://localhost:3000/register',data,
               {headers: {'Content-Type':'application/json'}
       });
           console.log(result.data);
           logIn(result.data.accessToken);
       }
       catch (error) {
           // console.error(e);
           // console.log(e.response.data);

           // Error
           if (error.response) {
               // The request was made and the server responded with a status code
               // that falls out of the range of 2xx
               console.log(error.response.data);
               alert(error.response.data.message);
               console.log(error.response.status);
               console.log(error.response.headers);
           } else if (error.request) {
               // The request was made but no response was received
               // `error.request` is an instance of XMLHttpRequest in the
               // browser and an instance of
               // http.ClientRequest in node.js
               console.log(error.request);
           } else {
               // Something happened in setting up the request that triggered an Error
               console.log('Error', error.message);
           }
           console.log(error.config);
       }

       }



  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="details-email">
          email
          <input
              type="email"
              id="details-email"
              {...register("email", {required: true})}
          />
      </label>

          <label htmlFor="details-password">
              password
              <input
                  type="password"
                  id="details-password"
                  {...register("password", {required: true})}
              />
          </label>


            <label htmlFor="details-username">
                username
                <input
                    type="text"
                    id="details-username"
                    {...register("username", {required: true})}
                />
            </label>


          <button
              type="submit"
          >
              Registreren
          </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;