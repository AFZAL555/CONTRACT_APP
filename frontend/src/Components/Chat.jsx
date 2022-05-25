import React, {useEffect, useRef, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import './chat.css';
import ChatList from './ChatList';
import Navbar from "./User/Navbar";
import axios from 'axios';
import Loader from './User/Loader';
import {Button} from '@mui/material';
import Message from './Message';
import ChatHeader from './ChatHeader';
import {io} from 'socket.io-client';

const Chat=() =>
{
    const [chatContactList, setChatContactList]=useState([]);
    const [currentChat, setCurrentChat]=useState(null);
    const [user, setUser]=useState(null);
    const [userSender, setuserSender]=useState(null);
    const [messages, setMessages]=useState([]);
    const [newMessages, setNewMessages]=useState('');
    const [arrivedMessages, setArrivedMessages]=useState(null);
    const [Loading, setLoading]=useState(false);
    const SenderId=localStorage.getItem("userID");
    const USERTOKEN=localStorage.getItem("userToken");
    const scrollRef=useRef();
    const socket=useRef();

    useEffect(() =>
    {
        getChatData();
        getUserSender();
        socket.current=io("ws://localhost:8080");
        socket.current.emit("addUser", SenderId);
        if(socket.current) {
            socket.current.on("getmessages", (data) =>
            {
                setArrivedMessages({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                });
            });
        };
    }, [socket]);

    useEffect(() =>
    {
        if(socket.current) {
            socket.current.on("getmessages", (data) =>
            {
                setArrivedMessages({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                });
            });
        };
    }, [messages]);




    useEffect(() =>
    {
        getChatMessages();
        getUser();

    }, [currentChat]);

    useEffect(() =>
    {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});

    }, [messages]);

    useEffect(() =>
    {
        arrivedMessages&&currentChat?.members.includes(arrivedMessages.sender)&&setMessages((prev) => [...prev, arrivedMessages]);

    }, [arrivedMessages, currentChat]);

    const getChatData=async () =>
    {
        try {
            setLoading(true);
            const url="http://localhost:8080/api/users/fetchconversation/"+SenderId;
            const {data: res}=await axios.get(url);
            const {chatContactData}=res.data;
            setChatContactList(chatContactData);
            setLoading(false);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }
    };


    const handleSendMessage=async (e) =>
    {
        try {
            e.preventDefault();
            const data={
                conversationId: currentChat._id,
                sender: SenderId,
                text: newMessages,
            };

            const reciverId=currentChat.members.find((member) => member!==SenderId);
            socket.current.emit("sendmessages", {
                senderId: SenderId,
                reciverId: reciverId,
                text: newMessages,
            });
            const url="http://localhost:8080/api/users/newmessages";
            const {data: res}=await axios.post(url, {data}, {headers: {"Authorization": USERTOKEN}});
            setNewMessages("");
            getChatMessages();
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }
    };
    const getChatMessages=async () =>
    {
        try {
            const url="http://localhost:8080/api/users/fetchMessages/"+currentChat._id;
            const {data: res}=await axios.get(url);
            const {MESSAGES}=res.data;
            setMessages(MESSAGES);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }
    };

    const getUser=async () =>
    {
        try {
            const reciverId=currentChat.members.find((member) => member!==SenderId);
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
    const getUserSender=async () =>
    {
        try {

            const url="http://localhost:8080/api/users/userdataonly/"+SenderId;
            const {data: res}=await axios.get(url);
            const {USERDATA}=res.data;
            setuserSender(USERDATA);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }
    };

    return (
        <>
            <Navbar />
            {!Loading? (<div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12" style={{marginTop: "10px", width: "100%"}}>
                        <div style={{width: '100%', background: "transperent ", display: "flex", flexDirection: "row"}} >

                            <div id="plist" className="people-list" style={{boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px", width: "24%", borderRadius: "12px", height: "fit-content", marginLeft: "4px", marginTop: "6px", }}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    </div>
                                </div>
                                {chatContactList.length!==0? chatContactList.map((contact) => (
                                    <ul className="list-unstyled chat-list mt-2 mb-0">
                                        <li className="clearfix" onClick={() =>
                                        {
                                            setCurrentChat(contact);
                                        }} >
                                            <div  >
                                                {contact&&(<ChatList conversation={contact} />)}
                                            </div>
                                        </li>
                                    </ul>)):
                                    (<ul className="list-unstyled chat-list mt-2 mb-0">
                                        <li className="clearfix" >
                                            <div className="about">
                                                <div className="name">No Chat !</div>
                                            </div>
                                        </li>
                                    </ul>)}
                            </div>

                            {currentChat? (<div className="chat" style={{minHeight: "77vh", maxHeight: "77vh", border: "0.1px solid #aba8a8", boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px", marginLeft: "20px", width: "100%", borderRadius: "19px"}}>

                                <div className="chat-header clearfix" style={{marginLeft: "3px"}}>
                                    <div className="row">
                                        <ChatHeader current={currentChat} />
                                    </div>
                                </div>

                                <div className="chat-history" style={{boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px", marginBottom: "3px", height: "69%"}}>
                                    <ul className="m-b-0">
                                        {messages&&messages.map((message) => (<li className="chatBoxTop">
                                            <div ref={scrollRef}>
                                                <Message message={message} userpic={user?.profilephoto[0].url} senderPic={userSender?.profilephoto[0].url} />
                                            </div>

                                        </li>))}

                                    </ul>
                                </div>

                                <div className="chat-message clearfix" style={{width: "100%", boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px", marginTop: "6px", marginBottom: "3px", position: "relative", borderBottomLeftRadius: "19px", borderBottomRightRadius: "19px"}}>
                                    <div className="input-group mb-0">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Message..."
                                            style={{borderRadius: "6px"}}
                                            onChange={(e) => {setNewMessages(e.target.value);}}
                                            value={newMessages}
                                        />
                                        <div className="input-group-prepend" >
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{marginLeft: "3px"}}
                                                color="success"
                                                onClick={handleSendMessage}
                                            >
                                                <SendIcon style={{color: "white"}} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </div>)
                                :
                                (<div className="chatnoconversation" style={{maxHeight: "77vh", border: "0.1px solid #aba8a8", boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px", marginLeft: "20px", width: "100%", borderRadius: "19px"}}><span className="noConversation">Let's Start Chat !</span></div>)}

                        </div>
                    </div>
                </div>
            </div>
            ):(<Loader />)}
        </>
    );
};

export default Chat;