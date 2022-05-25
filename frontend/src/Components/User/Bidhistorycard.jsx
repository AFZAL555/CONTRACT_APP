import {Avatar, CardHeader, CardMedia} from '@mui/material';
import {Link} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import "./plan.css";
import Loader from './Loader';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonChat from './ButtonChat';
import {format} from "timeago.js";


const Bidhistorycard=() =>
{
    const [bidHistory, setbidHistory]=useState([]);
    const [Loading, setLoading]=useState(false);
    const chatActivate=useRef();
    const userid=localStorage.getItem("userID");
    const USERTOKEN=localStorage.getItem("userToken");
    useEffect(() =>
    {
        getBidHistory();

    }, []);

    const handleOnClick=(senderId, receverId) =>
    {
        if(chatActivate.current) {
            chatActivate.current.handleChatActivate(senderId, receverId);
        }
    };


    const getBidHistory=async () =>
    {
        try {
            setLoading(true);
            const url="http://localhost:8080/api/users/bidhistory/"+userid;
            const {data: res}=await axios.get(url, {headers: {"Authorization": USERTOKEN}});
            const {bidhistorydata}=res.data;
            console.log(bidhistorydata);
            setbidHistory(bidhistorydata);
            setLoading(false);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }
    };

    if(Loading) {
        return (
            <>
                <Loader />
            </>);
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>

            {bidHistory.length!==0? (bidHistory.map((bid) => (<div className="box8" style={{height: "325px", width: "89%", marginLeft: "64px", boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}>
                <div style={{display: "flex", }}>
                    <div>
                        <CardHeader
                            sx={{width: 212}}
                            avatar={
                                <Avatar
                                    alt="ProfilePic"
                                    src={bid.profilephoto[0].url}
                                />
                            }
                            title={bid.userName}
                        />
                        <CardMedia
                            sx={{width: 150, marginLeft: "31px", marginTop: "13px"}}
                            component="img"
                            height="150"
                            width='150'
                            image={bid.projectImage[0].url}
                            alt="Paella dish"
                        />
                    </div>
                    <div style={{width: "51%"}}>
                        <div style={{marginTop: "87px", marginLeft: "5px"}}>
                            <p style={{fontSize: "27px", fontFamily: "monospace"}}>{bid.projectname}</p>
                            <div style={{display: "flex", marginTop: "39px"}}>
                                <p style={{fontSize: "23px", fontFamily: "monospace"}}>Bid AMOUNT :</p>
                                <p style={{fontSize: "26px", fontFamily: "monospace", color: "green"}}>{bid.bidAmount}</p>
                            </div>
                            <div style={{marginTop: '11px'}}
                                onClick={() =>
                                {
                                    let receverId=bid.userId;
                                    let senderId=bid.biduser;
                                    handleOnClick(senderId, receverId);
                                }}>
                                <ButtonChat ML={"81%"} BML={"-192px"} ref={chatActivate} />
                            </div>
                        </div>
                    </div>
                    <div >

                        {(bid.confirmed===true)? (<p style={{textDecoration: "none", marginTop: "11px", marginLeft: "76% "}}>
                            <Button
                                sx={{mt: 3, mb: 2, mr: 3}}
                                style={{backgroundColor: "white "}}
                                color="primary"
                            >
                            </Button>
                        </p>):(<Link to={`/viewpost/${bid.postId}`} style={{textDecoration: "none", marginTop: "11px", marginLeft: "77% "}}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3, mb: 2, mr: 3}}
                                style={{backgroundColor: "#dd7217 "}}
                                color="primary"
                            >
                                Details
                            </Button>
                        </Link>)}

                        {(bid.confirmed===true)? (<Button
                            variant="contained"
                            disabled
                            sx={{mb: 2, mr: 3}}
                            style={{alignItems: "inherit", backgroundColor: "white ", width: "206px", height: "47px", fontSize: "15px", marginTop: "10%", marginLeft: "410px", }}
                        >
                            <b><p style={{color: "green"}}>Contract Confirmed</p></b>
                        </Button>)
                            :
                            (<Button
                                variant="contained"
                                disabled
                                sx={{mb: 2, mr: 3}}
                                style={{alignItems: "inherit", backgroundColor: "white ", width: "184px", height: "47px", fontSize: "15px", marginTop: "10%", marginLeft: "410px", }}
                            >
                                <p style={{color: "red"}}></p>
                            </Button>)}
                        <div className='date' style={{display: "flex"}}>
                            <p style={{color: "black"}}>Bid Date :</p>
                            <p style={{color: "navy"}}>{format(bid.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>))):(<h3 className='history'>No Bid History Available....!</h3>)};

        </div >
    );
};

export default Bidhistorycard;