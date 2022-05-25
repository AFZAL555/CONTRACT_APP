import React from 'react'
import './plan.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const loadScript = ( src ) =>
{
    return new Promise( ( resolve ) =>
    {
        const script = document.createElement( "script" );
        script.src = src;
        document.body.appendChild( script );
        script.onload = () =>
        {
            resolve( true );
        };
        script.onerror = () =>
        {
            resolve( false );
        };
        document.body.appendChild( script );
    } );
};



const Plan = () =>
{
    const navigate = useNavigate();
    const userid = localStorage.getItem( "userID" );
    const productid = localStorage.getItem( "proid" );
    const USERTOKEN = localStorage.getItem( "userToken" );

    const initPayment = async ( data ) =>
    {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if ( !res )
        {
            alert(
                "Razorpay SDK is failed to load.Please check your internet connection"
            );
            return;
        }
        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            order_id: data.id,
            handler: async ( response ) =>
            {
                try
                {
                    const planrate = data.amount/100;
                    const verifyUrl = "http://localhost:8080/api/users/verifyrazorpay";
                    const { data: res } = await axios.post( verifyUrl, { response, userid, planrate } );
                    navigate(`/viewpost/${productid}`);
                    localStorage.removeItem("proid");

                } catch ( error )
                {
                    console.log( error );
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay( options );
        rzp1.open();
    };

    const handleplaceorder = async ( planrate ) =>
    {
        try
        {

            const url = "http://localhost:8080/api/users/newplanrazorpay";
            const { data: res } = await axios.post( url, { userid, planrate } );
            initPayment( res.data );

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } finally
        {
            console.log( "plan payment completed" )
        }
    };

    return (

        <section >
            <ul className="pricing p-green">
                <div style={ { display: "flex", justifyContent: "center ", backgroundColor: "white", height: "83vh" } }>
                    <div className="box1">
                        <li>
                            <big style={ { color: "#f9068b" } }>3 Months Plan</big>
                        </li>
                        <li>Unlimited Post</li>
                        <li>Unlimited Chat</li>
                        <li>Unlimited Biding</li>
                        <li>Unlimited Contracts</li>
                        <li>
                            <div className="wrap">
                                <button className="button" onClick={ () => handleplaceorder( 249 ) }>₹ 249</button>
                            </div>
                        </li>
                    </div>
                    <div className="box1">
                        <li>
                            <big style={ { color: "#317a14" } }>6 Months Plan</big>
                        </li>
                        <li>Unlimited Post</li>
                        <li>Unlimited Chat</li>
                        <li>Unlimited Biding</li>
                        <li>Unlimited Contracts</li>
                        <li>
                            <div className="wrap">
                                <button className="button" onClick={ () => handleplaceorder( 449 ) }>₹ 449</button>
                            </div>
                        </li>
                    </div>

                    <div className="box1">
                        <li>
                            <big style={ { color: "red" } }>1 Year Plan</big>
                        </li>
                        <li>Unlimited Post</li>
                        <li>Unlimited Chat</li>
                        <li>Unlimited Biding</li>
                        <li>Unlimited Contracts</li>
                        <li>
                            <div className="wrap">
                                <button className="button" onClick={ () => handleplaceorder( 999 ) }>₹ 999</button>
                            </div>
                        </li>
                    </div>
                </div>
            </ul>
        </section >

    );
};

export default Plan
