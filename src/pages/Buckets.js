import React from 'react';
import axios from "axios";
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router'
import moment from 'moment';
import './Buckets.css';
import Button from "../components/Button";


function Buckets() {


    const history = useHistory();
    const location = useLocation();

    const JWT =  localStorage.getItem("token");
    const [buckets,setBuckets] = useState([]);


    useEffect( () => {
        getBuckets();

    },[location.key]);


    async function getBuckets() {
        try {
            const result = await axios.get(`http://localhost:8080/api/v1/buckets`,

                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            // console.log(result.data);
            setBuckets(result.data);
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


    async function closeBucket(id) {
        try {
            const result = await axios.put(`http://localhost:8080/api/v1/buckets/close/${id}`,[],

                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            console.log(result.data);
            getBuckets();
         }
        catch (error) {
            if (error.response) {
                console.log(error.response.data);
                alert("er gaat iets mis bij het verzenden van de data, neem contact op met de systeembeheerder");

                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
                alert("er gaat iets mis bij het verzenden van de data, neem contact op met de systeembeheerder");
            } else {
                console.log('Error', error.message);
                alert("er gaat iets mis bij het verzenden van de data, neem contact op met de systeembeheerder");
            }
            console.log(error.config);
        }
    }



    function releaseBucket(id) {
        console.log(`close bucket ${id}`);
        closeBucket(id);

    }

    return (
        <>
                     {buckets.length !== 0
                         ? buckets.map(bucket =>

                        <div className="buckets-container" key={bucket.id}>
                            <div className="batch-attributes" id="left">
                                <div className="product-group">{bucket.productGroup.description}</div>
                                <span >Materiaal: {bucket.substrateId}</span>
                                <span>Afwerking: {bucket.finishName}</span>
                                <Button onClick={()=> releaseBucket(bucket.id)}>
                                        sluiten
                                </Button>
                            </div>
                            <div className="header"  id="header">
                                <span> {bucket.orderItems.length === 1 ? bucket.orderItems.length + " orderregel" : bucket.orderItems.length  + " orderregels"}</span>
                                <span>Verzenddatum: { moment(bucket.shippingDate).format('DD-MM-YYYY')}</span>
                            </div>

                            <div className="order-lines"  id="content">

                                {bucket.orderItems.length &&

                                    <table className="table">
                                        <thead>
                                        <tr>
                                        <th>item</th>
                                        <th>aantal</th>
                                        </tr>
                                        </thead>
                                        {bucket.orderItems.length && bucket.orderItems.map( orderItem =>
                                        <tbody>

                                        <tr onClick={() => history.push(`/orderItem/${orderItem.sourceItemId}`)} id="order-line" key ={orderItem.sourceItemId}>
                                        <td>{orderItem.sourceItemId}</td>
                                        <td>{orderItem.quantity}</td>
                                        </tr>
                                        </tbody>
                                        )}
                                    </table>
                                    }
                            </div>
                        </div>
                            )
                         : <h2>Geen buckets om te tonen...</h2>
                     }
        </>
    );
}

export default Buckets;