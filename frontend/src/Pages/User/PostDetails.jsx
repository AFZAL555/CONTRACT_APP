import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Carddata from '../../Components/User/Carddata';
import Projectdata from '../../Components/User/Projectdata';
import axios from 'axios';
import Navbar from '../../Components/User/Navbar';
import Loader from '../../Components/User/Loader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonChat from '../../Components/User/ButtonChat';
toast.configure();

const PostDetails=() =>
{
    const {id}=useParams();
    const [Loading, setLoading]=useState(false);
    const [Post, setPost]=useState();
    useEffect(() =>
    {
        const USERTOKEN=localStorage.getItem("userToken");
        if(!USERTOKEN) {
            navigate("/");
        }
        getOnePostData();
        userpremiumORnot();
    }, []);

    const [open, setOpen]=useState(false);
    const [premium, setpremium]=useState(false);
    const navigate=useNavigate();
    const chatActivate=useRef();
    localStorage.setItem("proid", id);
    const userid=localStorage.getItem("userID");
    const USERTOKEN=localStorage.getItem("userToken");
    //notification 
    const notificationSuccess=(m) => {toast.success(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};
    const notificationError=(m) => {toast.error(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};
    const notificationWarn=(m) => {toast.warn(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};

    const {register, handleSubmit, formState: {errors}}=useForm({mode: "onChange"});

    const handleClickOpen=() =>
    {
        if(premium===true)
            return setOpen(true);
        navigate('/premiumplan');
    };
    const handleClose=() =>
    {
        setOpen(false);
    };
    const userpremiumORnot=async () =>
    {
        try {
            const url="http://localhost:8080/api/users/plandata/"+userid;
            const {data: res}=await axios.get(url, {headers: {"Authorization": USERTOKEN}});
            const {PLANDATA}=res.data;
            setpremium(PLANDATA);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        }

    };

    const onSubmit=async (data) =>
    {
        try {
            const bidAmount=data.bid;
            console.log(bidAmount);
            const id=Post._id;

            if(bidAmount<=Post.budget) {
                if(Post.bidAmount===0) {
                    const url="http://localhost:8080/api/users/newbid";
                    handleClose();
                    const {data: res}=await axios.put(url, {bidAmount, userid, id}, {headers: {"Authorization": USERTOKEN}});
                    const message=res.message;
                    notificationSuccess(message);
                    getOnePostData();
                }
                else {
                    if(bidAmount<Post.bidAmount) {
                        const url="http://localhost:8080/api/users/newbid";
                        handleClose();
                        const {data: res}=await axios.put(url, {bidAmount, userid, id}, {headers: {"Authorization": USERTOKEN}});
                        const message=res.message;
                        notificationSuccess(message);
                        getOnePostData();
                    }
                    else {
                        notificationWarn("Please Enter Amount less than current Bid Amount");
                    }
                }
            }
            else {
                notificationWarn("Please Enter Amount less than current Budget Amount");
            }
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                const message=error.response.data.message;
                notificationError(message);
            }
        }
    };
    const getOnePostData=async () =>
    {
        try {
            setLoading(true);
            const url="http://localhost:8080/api/users/onepost/"+id;
            const {data: res}=await axios.get(url, {headers: {"Authorization": USERTOKEN}});
            const {onepost}=res.data;
            setPost(onepost);
            setLoading(false);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.log(error.response.data.message);
            }
        } finally {
            setLoading(false);
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


    if(USERTOKEN) {


        return (
            <>
                <Navbar />
                <div style={{display: "flex", justifyContent: "start", width: "90%"}}>
                    <div style={{marginTop: "40px", marginLeft: "40px"}}>
                        {Post&&<Carddata Post={Post} />}
                    </div>
                    {Post&&(<div style={{marginTop: "40px", marginLeft: "40px"}}>
                        <Projectdata Post={Post} />
                        {(userid!==Post.userId)&&(<div style={{display: "flex", marginLeft: '107px', marginTop: "14px"}}>
                            <div
                                onClick={() =>
                                {
                                    let receverId=Post.userId;
                                    let senderId=userid;
                                    handleOnClick(senderId, receverId);
                                }}>
                                <ButtonChat ML={"75px"} BMT={3} ref={chatActivate} />
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={handleClickOpen}
                                    sx={{mb: 2, mr: 3}}
                                    style={{backgroundColor: "green ", width: "140px", height: "47px", fontSize: "20px"}}
                                >
                                    <CurrencyRupeeIcon /> BID
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Enter Your Bid Amount</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            You are posting a Bid amount for willing to take this project.(The amount should be less than current Bid!)
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="bid"
                                            label="BID Amount"
                                            fullWidth
                                            name="bid"
                                            variant="outlined"
                                            autoComplete="off"
                                            {...register("bid", {pattern: /^[0-9+-]+$/, required: true, maxLength: 15, })}
                                        />
                                        {errors.bid&&<p style={{fontSize: "12px", color: "red"}}>Please Enter Valid Bid Amount</p>}

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
                                        <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" style={{backgroundColor: "#0095ff"}}>Submit</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>)}
                    </div>)}
                </div>

            </>
        );
    }
};

export default PostDetails;

