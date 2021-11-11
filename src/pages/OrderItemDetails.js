import React, {useState, useEffect} from "react";
import { useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import moment from 'moment';
import "./OrderItemDetails.css";


function OrderItemDetails() {

    const { item } = useParams();
    const history = useHistory();



    const JWT =  localStorage.getItem("token");
    const [orderItemDetail,setOrderItemDetail] = useState([]);
    const { handleSubmit, formState: { errors }, register , watch , reset } = useForm({mode:"onTouched"});



    useEffect( () => {
        getOrderItemDetail(item);


    },[]);

    useEffect(() => {
        if (orderItemDetail) {
            reset(orderItemDetail);
        }
    }, [orderItemDetail]);


    async function getOrderItemDetail(item) {
        try {
            const result = await axios.get(`http://localhost:8080/api/v1/orders/orderitem/${item}`,

                {headers: {'Authorization': `Bearer ${JWT}`}
                });
            console.log(result.data);
            setOrderItemDetail({...result.data,
                shippingDateConverted: moment(result.data.shippingDate).format('DD-MM-YYYY')
            });
         } catch (error) {
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

        }
    }

    async function submitOrderItemDetail(data) {
        try {
            const result = await axios.put(`http://localhost:8080/api/v1/orders/orderitem`
                ,data
                ,{headers: {'Authorization': `Bearer ${JWT}` ,'Content-Type':'application/json' }
                });
            console.log(result.data);
            setOrderItemDetail(result.data);
            history.goBack();
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

        }
    }


    function onFormSubmit(data) {
        console.log(data);
        submitOrderItemDetail(data);
        console.log("submitted");
    }

    return (
        <>
            <h1>Pas de gegevens aan voor {item}</h1>

            {orderItemDetail &&

                <div className="order-item-detail-container" key={orderItemDetail.sourceItemId}>
                    <div className="order-item-attributes" id="left">
                        <div>{orderItemDetail.sourceItemId}</div>
                        <button type="button" onClick={()=> history.goBack()}>
                            annuleer
                        </button>
                    </div>
                    <div className="header"  id="header">
                        <span>tekst</span>
                        <span>tekst</span>
                    </div>
                    <div className="order-item-details"  id="content">
                        {orderItemDetail.productGroup &&

                        <form className="form" onSubmit={handleSubmit(onFormSubmit)}>

                            <fieldset disabled>
                                <legend>vaste gegevens</legend>
                                <label htmlFor="sourceItemId">
                                    item
                                    <input type="input" id="sourceItemId"
                                           {...register("sourceItemId",
                                               { required: true }
                                               )} />
                                </label>
                                <label htmlFor="shippingDateConverted">
                                    verzenddatum
                                    <input type="input" id="shippingDateConverted"
                                           {...register("shippingDateConverted",
                                               { required: true }
                                           )} />
                                </label>
                                <label htmlFor="productGroup.description">
                                    product
                                    <input type="input" id="productGroup.description"
                                           {...register("productGroup.description",
                                               { required: true }
                                           )} />
                                </label>
                            </fieldset>
                            <fieldset>
                                <legend>aanpasbaar</legend>
                            <label htmlFor="substrateId">
                                materiaal
                                <input type="input" id="substrateId"
                                       {...register("substrateId",
                                           { required: true }
                                       )} />
                            </label>
                            <label htmlFor="finishName">
                                afwerking
                                <input type="input" id="finishName"
                                       {...register("finishName",
                                           { required: true }
                                       )} />
                            </label>
                            <label htmlFor="quantity">
                                aantal
                                <input type="input" id="quantity"
                                       {...register("quantity",
                                           { required: true }
                                       )} />
                            </label>
                            </fieldset>
                            <button type="submit">
                                opslaan
                            </button>
                        </form>
                        }
                    </div>
                </div>
            }
            </>
    );
}

export default OrderItemDetails;
