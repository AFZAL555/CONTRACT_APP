import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../User/Loader';

toast.configure();
const theme = createTheme();

const LoginAdmin = () =>
{
    const { register, handleSubmit, formState: { errors } } = useForm( { mode: "onChange" } );
    const navigate = useNavigate();
    useEffect( () =>
    {
        const ADMINTOKEN = localStorage.getItem( "AdminToken" );
        if ( ADMINTOKEN )
        {
            navigate( "/dashboard" );
        }
    }, [] );

    const [ Loading, setLoading ] = useState( false );
    //notification 
    const notificationSuccess = ( m ) => { toast.success( '' + m, { theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notificationError = ( m ) => { toast.error( '' + m, { theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, } ); }

    const [ otpstatus, setotpstatus ] = useState( false );
    const [ resendotp, setresendotp ] = useState( false );
    const [ mobilenum, setmobilenum ] = useState( 0 );



    if ( otpstatus )
    {
        setTimeout( () =>
        {
            setresendotp( true );
        }, 10000 );
    };


    const onSubmit = async ( data ) =>
    {
        try
        {
            if ( mobilenum === 0 )
            {
                setresendotp( false )
                const mob = data.mobileNumber;
                setmobilenum( mob );
                console.log( "typed :" + mob )
                const url = "http://localhost:8080/api/admin/otpsending";
                const { data: res } = await axios.post( url, { mob } );
                const message = res.message;
                setLoading( false );
                setotpstatus( true );
                notificationSuccess( message );
            }
            else
            {
                setresendotp( false )
                const mob = mobilenum;
                const url = "http://localhost:8080/api/admin/otpsending";
                const { data: res } = await axios.post( url, { mob } );
                const message = res.message;
                setLoading( false );
                setotpstatus( true );
                notificationSuccess( message );
            }


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                const message = error.response.data.message;
                notificationError( message );
            }
        }
        finally
        {
            setLoading( false );
        }
    };

    const otpSubmit = async ( data ) =>
    {
        try
        {
            const otp = data.otp;
            const url = "http://localhost:8080/api/admin/otpverifing";
            const { data: res } = await axios.post( url, { otp, mobilenum } );
            const { ADMINTOKEN, ADMINID } = res.data;
            localStorage.setItem( "AdminToken", ADMINTOKEN );
            localStorage.setItem( "AdminID", ADMINID );
            setLoading( false );
            const message = res.message;
            notificationSuccess( message );
            navigate( "/dashboard" );

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                const message = error.response.data.message;
                notificationError( message );
            }

        }
        finally
        {
            setLoading( false );
        }

    };




    if ( Loading )
    {
        return (
            <>
                <Loader />
            </> )
    }


    return (
        <div>
            <ThemeProvider theme={ theme }>
                <Grid container component="main"
                    sx={ {
                        height: '100vh',

                    } }>
                    <CssBaseline />
                    <Grid
                        item
                        xs={ false }
                        sm={ 4 }
                        md={ 7 }
                        sx={ {
                            backgroundImage: 'url(signuppage.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: ( t ) =>
                                t.palette.mode === 'light' ? t.palette.grey[ 50 ] : t.palette.grey[ 900 ],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        } }

                    >
                        <Typography component="h1" style={ {
                            color: "#111954",
                            fontSize: "48px",
                            fontFamily: "ui-monospace",
                            marginLeft: "35%",
                            marginTop: "35px",
                        } } >
                            MiddleMan
                        </Typography>
                        <Typography component="h1" style={ {
                            color: "rgb(133 3 3)",
                            fontSize: "19px",
                            fontFamily: "ui-monospace",
                            marginLeft: "11%",
                            marginTop: "-14px",
                        } } >
                            “Good buildings come from good people, and all problems are solved by good design.”
                        </Typography>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square style={ { background: "lavenderblush", height: '100vh' } }>
                        <Box
                            sx={ {
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',

                            } }
                        >
                            <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                WELCOME ADMIN
                            </Typography>
                            <Box component="form" sx={ { mt: 1 } }>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="mobileNumber"
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    autoComplete="off"
                                    autoFocus
                                    { ...register( "mobileNumber", { required: true, pattern: /^[0-9+-]+$/, maxLength: 10 } ) }
                                />
                                { errors.mobileNumber && <p style={ { fontSize: "10px", color: "red" } }>Please Enter Valid Mobile Number</p> }
                                { otpstatus && ( <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="OTP"
                                    name="otp"
                                    autoComplete="off"
                                    autoFocus
                                    { ...register( "otp", { required: true, pattern: /^[0-9+-]+$/, maxLength: 6 } ) }
                                /> ) }
                                { errors.otp && <p style={ { fontSize: "10px", color: "red" } }>Please Enter Valid OTP</p> }

                                { !otpstatus ? ( <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={ { mt: 3, mb: 2 } }
                                    style={ { color: "#efe6e6", background: "#e94f05" } }
                                    onClick={ handleSubmit( onSubmit ) }
                                >
                                    Request OTP
                                </Button> )
                                    :
                                    ( <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={ { mt: 3, mb: 2 } }
                                        style={ { color: "#efe6e6", background: "#e94f05" } }
                                        onClick={ handleSubmit( otpSubmit ) }
                                    >
                                        Verify OTP
                                    </Button> ) }

                                { resendotp && (
                                    <div style={ { display: "flex", justifyContent: "space-between" } }>
                                        <Link to="#" variant="body2" style={ { textDecoration: "none" } }>
                                            <Typography onClick={ onSubmit } >Resend OTP</Typography>
                                        </Link>

                                    </div>

                                ) }

                                <Typography component="h1" style={ {
                                    color: "rgb(133 3 3)",
                                    fontSize: "19px",
                                    fontFamily: "ui-monospace",
                                    marginLeft: "11%",
                                    marginTop: "30px",
                                } } >
                                    “It is a Web Platform where You can connect excellent contractors for your dream  design.You can decide your contractor from their bid or any other famous work.We make a connection between you and contractors.”
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </ThemeProvider>
        </div>
    )
}

export default LoginAdmin