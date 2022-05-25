import {Avatar, CardHeader, CardMedia} from '@mui/material';
import {Link} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import "./plan.css";
import ButtonChat from './ButtonChat';
import Loader from './Loader';
import axios from "axios";
import Button from '@mui/material/Button';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {format} from "timeago.js";

const ContractHistory=() =>
{
    const [contractHistory, setcontractHistory]=useState([]);
    const [Loading, setLoading]=useState(false);
    const chatActivate=useRef();
    let louserId=localStorage.getItem("userID");
    const USERTOKEN=localStorage.getItem("userToken");
    useEffect(() =>
    {
        getContractHistory();

    }, []);

    const getContractHistory=async () =>
    {
        try {
            setLoading(true);
            const url="http://localhost:8080/api/users/contracthistory/"+louserId;
            const {data: res}=await axios.get(url, {headers: {"Authorization": USERTOKEN}});
            const {CONTRACTHISTORY}=res.data;
            console.log(CONTRACTHISTORY);
            setcontractHistory(CONTRACTHISTORY);
            setLoading(false);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }
    };
    const handleOnClick=(senderId, receverId) =>
    {
        if(chatActivate.current) {
            chatActivate.current.handleChatActivate(senderId, receverId);
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
            {contractHistory.length!==0? (contractHistory.map((contract) => (<div className="box8" style={{height: "325px", width: "89%", marginLeft: "64px", boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}>
                <div style={{display: "flex", }}>
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <CardHeader
                                sx={{width: 212}}
                                avatar={
                                    <Avatar
                                        alt="ProfilePic"
                                        src={contract.userprofilephoto[0].url}
                                    />
                                }
                                title={contract.userName}
                            />
                            <CompareArrowsIcon className='arrow' />
                            <CardHeader
                                sx={{width: 212}}
                                avatar={
                                    <Avatar
                                        alt="ProfilePic"
                                        src={contract.contractorprofilephoto[0].url}
                                    />
                                }
                                title={contract.contractoruserName}
                            />
                        </div>
                        <CardMedia
                            sx={{width: 246, marginLeft: "31px", marginTop: "13px"}}
                            component="img"
                            height="200"
                            width='200'
                            image={contract.projectImage[0].url}
                            alt="Paella dish"
                        />
                    </div>
                    <div style={{width: "85%", marginLeft: "-13%"}}>
                        <div style={{marginTop: "87px", marginLeft: "5px"}}>
                            <p style={{fontSize: "27px", fontFamily: "monospace"}}>{contract.projectname}</p>
                            <div style={{display: "flex", marginTop: "39px", width: "max-content"}}>
                                <p style={{fontSize: "23px", fontFamily: "monospace"}}>contract AMOUNT :</p>
                                <p style={{fontSize: "26px", fontFamily: "monospace", color: "green"}}>{contract.bidAmount}</p>
                            </div>
                            <div style={{marginTop: '25px'}}
                                onClick={() =>
                                {
                                    let receverId;
                                    let senderId=louserId;
                                    if(contract.userId===senderId) {
                                        receverId=contract.biduserId;
                                    }
                                    else {
                                        receverId=contract.userId;
                                        senderId=contract.biduserId;
                                    };
                                    handleOnClick(senderId, receverId);
                                }}>
                                <ButtonChat ML={"56%"} BML={"-192px"} ref={chatActivate} />
                            </div>
                        </div>
                    </div>
                    <div >

                        <p style={{textDecoration: "none", marginTop: "11px", marginLeft: "76% "}}>
                            <Button
                                sx={{mt: 3, mb: 2, mr: 3}}
                                style={{backgroundColor: "white "}}
                                color="primary"
                            >
                            </Button>
                        </p>
                        <Button
                            variant="contained"
                            disabled
                            sx={{mb: 2, mr: 3}}
                            style={{alignItems: "inherit", backgroundColor: "white ", width: "206px", height: "47px", fontSize: "15px", marginTop: "10%", marginLeft: "278px", }}
                        >
                            <b><p style={{color: "green"}}>Contract Confirmed</p></b>
                        </Button>
                        <div className='datecontract' style={{display: "flex"}}>
                            <p style={{color: "black"}}>contract Date :</p>
                            <p style={{color: "navy"}}>{format(contract.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>))):(<h3 className='history'>No contract History Available....!</h3>)};

        </div >
    );
};

export default ContractHistory;