import axios from 'axios';
import React, {useEffect, useState} from 'react';
import "./chat.css";
const ChatList=({conversation}) =>
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
    }, [conversation]);

    const getUser=async () =>
    {
        try {
            const reciverId=conversation.members.find((member) => member!==userId);
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
            {user&&(<div>
                <img src={user.profilephoto[0].url} alt="avatar" style={{height: "30px", width: "30px"}} />
                <div className="about">
                    <div className="name">{user.firstName}</div>
                </div>
            </div>)}
        </>
    );
};

export default ChatList;