import {Button} from '@mui/material';
import React, {forwardRef, useImperativeHandle} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';

const ButtonChat=forwardRef(({ML, BML}, ref) =>
{
    useImperativeHandle(ref, () => ({
        async handleChatActivate (senderId, receverId)
        {
            try {
                const url="http://localhost:8080/api/users/newconversation";
                const {data: res}=await axios.post(url, {senderId, receverId}, {headers: {"Authorization": USERTOKEN}});
                navigate('/chat');

            } catch(error) {
                if(error.response&&error.response.status>=400&&error.response.status<=500) {
                    console.log(error.response.data.message);
                }
            }


        },
    }));
    const USERTOKEN=localStorage.getItem("userToken");
    const navigate=useNavigate();
    return (
        <div>
            <div style={{textDecoration: "none", marginLeft: {ML}}}>
                <Button
                    variant="contained"
                    sx={{mb: 2, mr: 3, }}
                    style={{backgroundColor: "orange ", width: "140px", height: "47px", fontSize: "20px", marginLeft: {BML}}}
                >
                    <ChatIcon />CHAT
                </Button>
            </div>
        </div>
    );
});

export default ButtonChat;