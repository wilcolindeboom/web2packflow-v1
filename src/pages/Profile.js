import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {


    const { username } = useParams();
    const JWT =  localStorage.getItem("token");
    const [user,setUser] = useState([]);


    useEffect( () => {

            getUser();

        }
        ,[]

    );



    async  function getUser() {

        try {
            const result = await axios.get(`http://localhost:8080/api/v1/users/${username}`,
                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            console.log(result.data);
            setUser(result.data);

        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data);
                alert("er gaat iets mis bij het ophalen van de data, neem contact op met de systeembeheerder");

                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
                alert("er gaat iets mis bij het ophalen van de data, neem contact op met de systeembeheerder");
            } else {
                console.log('Error', error.message);
                alert("er gaat iets mis bij het ophalen van de data, neem contact op met de systeembeheerder");
            }
            console.log(error.config);
        }
    }


    return (

    <div className="user-contaimner">
      <h1>Gebruiker {user.username}</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>
    </div>

  );
}

export default Profile;