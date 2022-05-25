import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Loader from './Loader';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const theme=createTheme();

const Login=() =>
{
    const {register, handleSubmit, formState: {errors}}=useForm({mode: "onChange"});
    const [Loading, setLoading]=useState(false);
    //notification 
    const notificationSuccess=(m) => {toast.success(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};
    const notificationError=(m) => {toast.error(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};


    const [otpstatus, setotpstatus]=useState(false);
    const [resendotp, setresendotp]=useState(false);
    const [mobilenum, setmobilenum]=useState(0);

    const navigate=useNavigate();
    const USERTOKEN=localStorage.getItem("userToken");
    useEffect(() =>
    {
        const USERTOKEN=localStorage.getItem("userToken");
        if(USERTOKEN) {
            navigate("/homepage");
        }

    }, []);

    if(otpstatus) {
        setTimeout(() =>
        {
            setresendotp(true);
        }, 10000);
    };


    const onSubmit=async (data) =>
    {
        try {
            if(mobilenum===0) {

                setresendotp(false);
                const mob=data.mobileNumber;
                setmobilenum(mob);
                const url="http://localhost:8080/api/users/otpsending";
                const {data: res}=await axios.post(url, {mob});
                const message=res.message;
                setLoading(false);
                setotpstatus(true);
                notificationSuccess(message);
            }
            else {

                setresendotp(false);
                const mob=mobilenum;
                const url="http://localhost:8080/api/users/otpsending";
                const {data: res}=await axios.post(url, {mob});
                const message=res.message;
                setLoading(false);
                setotpstatus(true);
                notificationSuccess(message);
            }


        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                const message=error.response.data.message;
                notificationError(message);
            }
        }
        finally {
            setLoading(false);
        }
    };

    const otpSubmit=async (data) =>
    {
        try {
            setLoading(true);
            const otp=data.otp;
            const url="http://localhost:8080/api/users/otpverifing";
            const {data: res}=await axios.post(url, {otp, mobilenum});
            const {USERTOKEN, USERID, USERNAME}=res.data;
            localStorage.setItem("userToken", USERTOKEN);
            localStorage.setItem("userID", USERID);
            localStorage.setItem("userName", USERNAME);
            setLoading(false);
            const message=res.message;
            notificationSuccess(message);
            navigate("/homepage");

        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                const message=error.response.data.message;
                notificationError(message);
            }

        }
        finally {
            setLoading(false);
        }

    };

    if(Loading) {
        return (
            <>
                <Loader />
            </>);
    };

    if(!USERTOKEN) {

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Grid container component="main"
                        sx={{
                            height: '100vh',

                        }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(signuppage.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode==='light'? t.palette.grey[50]:t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}

                        >
                            <Typography component="h1" style={{
                                color: "#111954",
                                fontSize: "48px",
                                fontFamily: "ui-monospace",
                                marginLeft: "35%",
                                marginTop: "35px",
                            }} >
                                MiddleMan
                            </Typography>
                            <Typography component="h1" style={{
                                color: "rgb(133 3 3)",
                                fontSize: "19px",
                                fontFamily: "ui-monospace",
                                marginLeft: "11%",
                                marginTop: "-14px",
                            }} >
                                “Good buildings come from good people, and all problems are solved by good design.”
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{background: "lavenderblush", height: '100vh'}}>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: "center",

                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Access You Account
                                </Typography>
                                <Box component="form" sx={{mt: 1}}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobile"
                                        label="Mobile Number"
                                        name="mobile"
                                        autoComplete="off"
                                        autoFocus
                                        {...register("mobileNumber", {required: true, pattern: /^[0-9+-]+$/, maxLength: 10})}
                                    />
                                    {errors.mobileNumber&&<p style={{fontSize: "10px", color: "red"}}>Please Enter Valid Mobile Number</p>}


                                    {otpstatus&&(<TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="otp"
                                        label="OTP"
                                        name="otp"
                                        autoComplete="off"
                                        autoFocus
                                        {...register("otp", {required: true, pattern: /^[0-9+-]+$/, maxLength: 6})}
                                    />)}
                                    {errors.otp&&<p style={{fontSize: "10px", color: "red"}}>Please Enter Valid OTP</p>}
                                    {!otpstatus? (<Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                        style={{color: "#efe6e6", background: "#e94f05"}}
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Request OTP
                                    </Button>)
                                        :
                                        (<Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                            style={{color: "#efe6e6", background: "#e94f05"}}
                                            onClick={handleSubmit(otpSubmit)}
                                        >
                                            Verify OTP
                                        </Button>)}

                                    <Grid container style={{marginTop: "15px"}}>
                                        <Grid item xs style={{display: "flex"}}>
                                            {resendotp&&(
                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                    <Link to="#" variant="body2" style={{textDecoration: "none"}}>
                                                        <Typography onClick={onSubmit} >Resend OTP</Typography>
                                                    </Link>

                                                </div>

                                            )}
                                            {!otpstatus&&(
                                                <>
                                                    <Typography style={{fontSize: "15px"}}>Don't have an account?</Typography>
                                                    <Link to="/signup" variant="body2" style={{textDecoration: "none"}}>
                                                        Register
                                                    </Link>
                                                </>
                                            )}
                                        </Grid>

                                    </Grid>
                                    <Typography component="h1" style={{
                                        color: "rgb(133 3 3)",
                                        fontSize: "19px",
                                        fontFamily: "ui-monospace",
                                        marginLeft: "11%",
                                        marginTop: "30px",
                                    }} >
                                        “It is a Web Platform where You can connect excellent contractors for your dream  design.You can decide your contractor from their bid or any other famous work.We make a connection between you and contractors.”
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </ThemeProvider>
            </div>
        );
    };
};

export default Login;