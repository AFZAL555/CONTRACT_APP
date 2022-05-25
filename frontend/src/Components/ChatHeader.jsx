import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import "./chat.css";

const ChatHeader=({current}) =>
{
    const [user, setUser]=useState(null);
    const userId=localStorage.getItem("userID");
    useEffect(() =>
    {
        getUser();
    }, []);
    useEffect(() =>
    {
        getUser();
    }, [current]);

    const getUser=async () =>
    {
        try {
            const reciverId=current.members.find((member) => member!==userId);
            const url="http://localhost:8080/api/users/userdataonly/"+reciverId;
            const {data: res}=await axios.get(url);
            const {USERDATA}=res.data;
            setUser(USERDATA);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }
    };

    return (
        <>
            {user&&(<div className="col-lg-6">
                <Link to="#" data-toggle="modal" data-target="#view_info">
                    <img src={user.profilephoto[0].url} alt="avatar" style={{height: "40px", width: "40px"}} />
                </Link>
                <div className="chat-about">
                    <h6 className="m-b-0" style={{fontWeight: 400, marginTop: "15px"}}>{user.firstName}</h6>
                </div>
            </div>)}
        </>
    );
};

export default ChatHeader;