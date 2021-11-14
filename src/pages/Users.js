import React, {useEffect, useState} from 'react';
import { useHistory} from "react-router-dom";
import axios from "axios";
import './Users.css';
import Button from "../components/Button";
import {RiFilter2Fill} from 'react-icons/ri';


function Users() {

    const JWT =  localStorage.getItem("token");
    const [users,setUsers] = useState([]);
    const [usersFiltered,setUsersFiltered] = useState([]);
    const history = useHistory();



    useEffect( () => {

            getUsers();

        }
        ,[]

    );



    async  function getUsers() {

        try {
            const result = await axios.get('http://localhost:8080/api/v1/users',
                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            console.log(result.data);
            setUsers(result.data);
            setUsersFiltered(result.data);
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





    function filterUsers(event) {
        const filter = event.target.value;
        const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(filter.toLowerCase()));
        if (filter) {
            setUsersFiltered(filteredUsers);
            console.log(`filtered: ${filter}`);
            console.log(`filteredUsers: ${filteredUsers}`);
        } else {
            setUsersFiltered(users);
        }

    }


    return (
        <>

            <h1>Overzicht gebruikers lijst</h1>

                <div className="menu-bar">
                    <div className="hidden">
                        <Button  id="" onClick={() => console.log("menuitem clicked")}>
                            menuItem
                        </Button>
                    </div>
                       <div className="filter">
                        <RiFilter2Fill/>
                        <input
                            className="filter-field"
                            type="text"
                            name="search"
                            placeholder="filter op gebruikersnaam..."
                            onChange={(event) => filterUsers(event)}
                        />
                    </div>
                </div>

                {users.length !== 0 ?

                <table className="table-users">
                    <thead>
                    <tr>
                    <th>gebruikersnaam</th>
                    <th>email</th>
                        <th>type</th>
                    </tr>
                    </thead>
                    <tbody>

                    {usersFiltered.map(user =>
                     <tr onClick={() =>
                         history.push(`/profile/${user.username}`)} id="user" key ={user.id}>
                    <td id="username">{user.username}</td>
                    <td>{user.email}</td>
                    <td>{ user.roles.some((role) => role.name.includes("ROLE_ADMIN")) ? "administrator" : "gebruiker"}  </td>
                    </tr>
                        )}
                    </tbody>
                    </table>


                    : <h2>Geen gebruikers om te tonen...</h2>
                }
        </>
    );
}

export default Users;