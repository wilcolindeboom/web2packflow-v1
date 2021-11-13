import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from 'moment';
import './Orders.css';
import Button from "../components/Button";
import {RiFilter2Fill} from 'react-icons/ri';


function Users() {

    const JWT =  localStorage.getItem("token");
    const [users,setUsers] = useState([]);
    const [usersFiltered,setUsersFiltered] = useState([]);



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





    function filterOrders(event) {
        const filter = event.target.value;
        const filteredOrders = users.filter((order) => order.sourceOrderId.toLowerCase().includes(filter.toLowerCase()));
        if (filter) {
            setUsersFiltered(filteredOrders);
            console.log(`filtered: ${filter}`);
            console.log(`filteredOrders: ${filteredOrders}`);
        } else {
            setUsersFiltered(users);
        }

    }


    return (
        <>

            <h1>Overzicht gebruikers lijst</h1>

                <div className="menu-bar">
                       <div className="filter">
                        <RiFilter2Fill/>
                        <input
                            className="filter-field"
                            type="text"
                            name="search"
                            placeholder="filter op ordernummer..."
                            onChange={(event) => filterOrders(event)}
                        />
                    </div>
                </div>


                {users.length !== 0
                    ? usersFiltered.map(order =>

                    <div className="users-container" key={order.sourceOrderId}>
                        {/*<div className="order-attributes" id="left">*/}
                        {/*    <div>{order.sourceOrderId}</div>*/}
                        {/*    <button type="button" onClick={()=> console.log(`edit order ${order.sourceOrderId}`)}>*/}
                        {/*        edit*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {/*<div className="header"  id="header">*/}
                        {/*    <span> {order.orderItems.length === 1 ? order.orderItems.length + " orderregel" : order.orderItems.length  + " orderregels"}</span>*/}
                        {/*    <span>tekst</span>*/}
                        {/*</div>*/}

                        {/*<div className="order-lines"  id="content">*/}

                        {/*    {order.orderItems.length &&*/}

                        {/*    <table className="table">*/}
                        {/*        <thead>*/}
                        {/*        <tr>*/}
                        {/*            <th>item</th>*/}
                        {/*            <th>aantal</th>*/}
                        {/*            <th>product</th>*/}
                        {/*            <th>materiaal</th>*/}
                        {/*            <th>afwerking</th>*/}
                        {/*            <th>verzending</th>*/}
                        {/*        </tr>*/}
                        {/*        </thead>*/}
                        {/*        {order.orderItems.length && order.orderItems.map( orderItem =>*/}
                        {/*            <tbody>*/}

                        {/*            <tr onClick={() => console.log(`edit ${orderItem.sourceItemId}`)} id="order-line" key ={orderItem.sourceItemId}>*/}
                        {/*                <td>{orderItem.sourceItemId}</td>*/}
                        {/*                <td>{orderItem.quantity}</td>*/}
                        {/*                <td>{orderItem.productGroup.description}</td>*/}
                        {/*                <td>{orderItem.substrateId}</td>*/}
                        {/*                <td>{orderItem.finishName}</td>*/}
                        {/*                <td>{moment(orderItem.shippingDate).format('DD-MM-YYYY')}</td>*/}
                        {/*            </tr>*/}
                        {/*            </tbody>*/}
                        {/*        )}*/}
                        {/*    </table>*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>
                )
                    : <h2>Geen gebruikers om te tonen...</h2>
                }
        </>
    );
}

export default Users;