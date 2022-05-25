import {CircularProgress} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {format} from "timeago.js";
import "./chat.css";
import Loader from './User/Loader';
const Message=({message, userpic, senderPic}) =>
{
    const SenderId=localStorage.getItem("userID");
    const [senderside, setsenderside]=useState(false);
    useEffect(() =>
    {
        if(message.sender===SenderId) {
            setsenderside(true);
        };
    }, []);

    return (
        <>
            {senderside? (<div className="message own">
                <div className="messageTop">
                    <p className="messageText">{message.text}</p>
                    {senderPic? (<img
                        className="messageImg"
                        style={{marginLeft: '10px', marginRight: '0px'}}
                        src={senderPic}
                        alt="pic"
                    />):(<CircularProgress color="secondary" />)}
                </div>
                <div className="messageBottom">{format(message.createdAt)}</div>
            </div>):
                (<div className="message">
                    <div className="messageTop">
                        {userpic? (<img
                            className="messageImg"
                            src={userpic}
                            alt="pic"
                        />):(<CircularProgress color="secondary" />)}
                        <p className="messageText">{message.text}</p>
                    </div>
                    <div className="messageBottom">{format(message.createdAt)}</div>
                </div>)}
        </>
    );
};

export default Message;