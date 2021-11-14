import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import './Orders.css';
import Button from "../components/Button";
import {RiFilter2Fill} from 'react-icons/ri';


function Orders() {

    const JWT =  localStorage.getItem("token");
    const [orders,setOrders] = useState([]);
    const [ordersFiltered,setOrdersFiltered] = useState([]);
    const history = useHistory();


    useEffect( () => {
         getOrders();


    },[]);


    async function getOrders() {
        try {
            const result = await axios.get(`http://localhost:8080/api/v1/orders`,

                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            console.log(result.data);
            setOrders(result.data);
            setOrdersFiltered(result.data);
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
        const filteredOrders = orders.filter((order) => order.sourceOrderId.toLowerCase().includes(filter.toLowerCase()));
        if (filter) {
            setOrdersFiltered(filteredOrders);
            console.log(`filtered: ${filter}`);
            console.log(`filteredOrders: ${filteredOrders}`);
        } else {
            setOrdersFiltered(orders);
        }

    }


    return (
        <>
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
                            placeholder="filter op ordernummer..."
                            onChange={(event) => filterOrders(event)}
                        />
                    </div>
                </div>


                {orders.length !== 0
                    ? ordersFiltered.map(order =>

                    <div className="orders-container" key={order.sourceOrderId}>
                        <div className="order-attributes" id="left">
                            <div>{order.sourceOrderId}</div>
                            <button  className="hidden" type="button" onClick={()=> console.log(`edit order ${order.sourceOrderId}`)}>
                                edit
                            </button>
                        </div>
                        <div className="header"  id="header">
                            <span> {order.orderItems.length === 1 ? order.orderItems.length + " orderregel" : order.orderItems.length  + " orderregels"}</span>
                        </div>

                        <div className="order-lines"  id="content">

                            {order.orderItems.length &&

                            <table className="table">
                                <thead>
                                <tr>
                                    <th>item</th>
                                    <th>aantal</th>
                                    <th>product</th>
                                    <th>materiaal</th>
                                    <th>afwerking</th>
                                    <th>verzending</th>
                                </tr>
                                </thead>
                                {order.orderItems.length && order.orderItems.map( orderItem =>
                                    <tbody>

                                    <tr onClick={() => history.push(`/orderItem/${orderItem.sourceItemId}`)} id="order-line" key ={orderItem.sourceItemId}>
                                        <td>{orderItem.sourceItemId}</td>
                                        <td>{orderItem.quantity}</td>
                                        <td>{orderItem.productGroup.description}</td>
                                        <td>{orderItem.substrateId}</td>
                                        <td>{orderItem.finishName}</td>
                                        <td>{moment(orderItem.shippingDate).format('DD-MM-YYYY')}</td>
                                    </tr>
                                    </tbody>
                                )}
                            </table>
                            }
                        </div>
                    </div>
                )
                    : <h2>Geen orders om te tonen...</h2>
                }
        </>
    );
}

export default Orders;