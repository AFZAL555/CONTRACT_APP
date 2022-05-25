import React, {useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

const Signup=() =>
{
    const {register, handleSubmit, formState: {errors}}=useForm({mode: "onChange"});
    const navigate=useNavigate();
    const [Loading, setLoading]=useState(false);
    //notification 
    const notificationSuccess=(m) => {toast.success(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};
    const notificationError=(m) => {toast.error(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};
    const notificationWarn=(m) => {toast.warn(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};


    const [imgOne, setimgOne]=useState({});
    const dummyimage="https://www.lifewire.com/thmb/2KYEaloqH6P4xz3c9Ot2GlPLuds=/1920x1080/smart/filters:no_upscale()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg";
    const inputImageOne=useRef();




    const inputImageTrigger=(target) =>
    {
        target.current.click();
    };
    const selectimgOne=(e) =>
    {
        if(e.target.files.length>0) {
            const file=e.target.files[0];
            const url=URL.createObjectURL(file);
            setimgOne({file, url});
        }
    };
    const onSubmit=async (data) =>
    {
        try {
            setLoading(true);
            if(!imgOne.file) {
                notificationWarn("Please Add Profile photo!");
            }
            else {
                const formData=new FormData();
                console.log(data);
                formData.append("img", imgOne.file);
                formData.append("data", JSON.stringify(data));
                const url="http://localhost:8080/api/users/registernewuser";
                const {data: res}=await axios.post(url, formData, {headers: {"Content-Type": "multipart/form-data"}, });
                const message=res.message;
                setLoading(false);
                notificationSuccess(message);
                navigate("/");
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

    if(Loading) {
        return (
            <>
                <Loader />
            </>);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Grid container component="main"
                    sx={{
                        height: '120vh'
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
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{background: "lavenderblush", height: '120vh'}}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main', alignItems: 'center', }}>
                                <AccountCircleIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{alignItems: 'center', }}>
                                Create New Account
                            </Typography>
                            <Box component="form" sx={{mt: 1}}>
                                <>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="off"
                                        autoFocus
                                        required
                                        {...register("firstName", {required: true, maxLength: 10})}
                                    />
                                </>
                                {errors.firstName&&<p style={{fontSize: "10px", color: "red"}}>Please Enter Valid First Name</p>}
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="off"
                                        autoFocus
                                        {...register("lastName", {required: true, maxLength: 10})}
                                    />
                                </>

                                {errors.lastName&&<p style={{fontSize: "10px", color: "red"}}>Please Enter Valid Last Name</p>}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    {...register("email", {required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                                />

                                {errors.email&&<p style={{fontSize: "10px", color: "red"}}>Please Enter Valid Email</p>}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="mobileNumber"
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    autoComplete="off"
                                    autoFocus
                                    {...register("mobileNumber", {required: true, pattern: /^[0-9+-]+$/, maxLength: 10})}
                                />
                                {errors.mobileNumber&&<p style={{fontSize: "10px", color: "red"}}>Please Enter Valid Mobile Number</p>}

                                <div style={{display: "flex", marginTop: "5PX"}}>
                                    <Typography component="h1" style={{
                                        color: "#111954",
                                        fontSize: "16px",
                                        fontFamily: "ui-monospace",
                                        marginRight: "15px"
                                    }} >

                                        Upload Profile Photo :
                                    </Typography>
                                    <img onClick={() => {inputImageTrigger(inputImageOne);}} style={{height: "50px", border: "1px solid black"}} src={imgOne.url||dummyimage} alt="uploadImage" />
                                    <input hidden ref={inputImageOne} type='file' name='fileOne' onChange={selectimgOne}></input>
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    color="success"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Create
                                </Button>
                                <Grid container >
                                    <Grid item xs style={{display: "flex"}}>
                                        <Typography style={{fontSize: "15px"}}>Already have an account?</Typography>
                                        <Link to="/" variant="body2" style={{textDecoration: "none"}}>
                                            Login
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </ThemeProvider>
        </div>
    );
};

export default Signup;