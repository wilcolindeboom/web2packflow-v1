import React from 'react';
import axios from "axios";
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './Batches.css';



function Batches() {

    const history = useHistory();

    const JWT =  localStorage.getItem("token");
    const [batches,setBatches] = useState([]);


    useEffect( () => {
        getBatches();


    },[]);


    async function getBatches() {
        try {
            const result = await axios.get(`http://localhost:8080/api/v1/batches`,

                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            console.log(result.data);
            setBatches(result.data);
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

    function addLeadingZeros(id) {
       return id <= 9999 ? `000${id}`.slice(-4) : id;
    }


    return (
        <>
            {batches.length !== 0
                ? batches.map(batch =>

                <div className="batch-container" key={batch.id}>
                    <div className="batch-attributes" id="batch-left">
                        <div id="batch-number">{addLeadingZeros(batch.id)}</div>
                        <div className="product-group">{batch.productGroup.description}</div>
                        <span >Materiaal: {batch.substrateId}</span>
                        <span>Afwerking: {batch.finishName}</span>
                    </div>
                    <div className="header"  id="batch-header">
                        <span> {batch.orderItems.length === 1 ? batch.orderItems.length + " orderregel" : batch.orderItems.length  + " orderregels"}</span>
                        <span>Verzenddatum: { moment(batch.shippingDate).format('DD-MM-YYYY')}</span>
                    </div>

                    <div className="order-lines"  id="batch-content">

                        {batch.orderItems.length &&

                        <table className="table">
                            <thead>
                            <tr>
                                <th>item</th>
                                <th>aantal</th>
                            </tr>
                            </thead>
                            {batch.orderItems.length && batch.orderItems.map( orderItem =>
                                <tbody>

                                <tr  id="batch-order-line" key ={orderItem.sourceItemId}>
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
            : <h2>Geen batches om te tonen...</h2>
            }
        </>
    );
}

export default Batches;