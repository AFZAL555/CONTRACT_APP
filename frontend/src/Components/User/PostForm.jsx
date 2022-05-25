import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Loader from './Loader';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const PostForm = () =>
{
    const { register, handleSubmit, formState: { errors } } = useForm( { mode: "onChange" } );
    const [ Loading, setLoading ] = useState( false );
    //notification 
    const notificationSuccess = ( m ) => { toast.success( '' + m, { theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notificationError = ( m ) => { toast.error( '' + m, { theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notificationWarn = ( m ) => { toast.warn( '' + m, { theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, } ); }


    const [ imgOne, setimgOne ] = useState( {} );
    const dummyimage = "https://www.lifewire.com/thmb/2KYEaloqH6P4xz3c9Ot2GlPLuds=/1920x1080/smart/filters:no_upscale()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg";
    const inputImageOne = useRef();
    const USERTOKEN = localStorage.getItem( "userToken" );
    const navigate = useNavigate();
    useEffect( () =>
    {
        const USERTOKEN = localStorage.getItem( "userToken" );
        if ( !USERTOKEN )
        {
            navigate( "/" );
        }

    }, [] );

    const inputImageTrigger = ( target ) =>
    {
        target.current.click();
    };
    const selectimgOne = ( e ) =>
    {
        if ( e.target.files.length > 0 )
        {
            const file = e.target.files[ 0 ];
            const url = URL.createObjectURL( file );
            setimgOne( { file, url } );
        }
    };
    const onSubmit = async ( data ) =>
    {
        try
        {
            setLoading( true );
            if ( !imgOne.file )
            {
                notificationWarn( "Please Add Project Photo!" )
            }
            else
            {
                const formData = new FormData();
                formData.append( "img", imgOne.file );
                formData.append( "data", JSON.stringify( data ) );
                const id = localStorage.getItem( "userID" );

                const url = "http://localhost:8080/api/users/addnewpost/" + id;
                const { data: res } = await axios.post( url, formData, { headers: { "Content-Type": "multipart/form-data", "Authorization": USERTOKEN } } );
                const message = res.message;
                setLoading( false );
                notificationSuccess( message );
                navigate( "/homepage" );
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

    if ( Loading )
    {
        return (
            <>
                <Loader />
            </> )
    }



    return (
        <>
            <div>
                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square style={ { background: "whites", height: '200vh' } }>
                    <Box
                        sx={ {
                            my: 1,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                        } }
                    >
                        <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
                            <PostAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add New Post
                        </Typography>
                        <Box component="form" sx={ { mt: 1 } }>
                            <TextField
                                margin="normal"
                                fullWidth
                                required
                                id="projectname"
                                label="Project Name"
                                name="projectname"
                                autoComplete="off"
                                autoFocus
                                { ...register( "projectname", { required: true, maxLength: 15 } ) }
                            />
                            { errors.projectname && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid projectname</p> }

                            <TextField
                                margin="normal"
                                fullWidth
                                id="budget"
                                label="Budget Amount"
                                name="budget"
                                autoComplete="off"
                                autoFocus
                                { ...register( "budget", { required: true, pattern: /^[0-9+-]+$/, maxLength: 15 } ) }
                            />
                            { errors.budget && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid budget.</p> }

                            <TextField
                                margin="normal"
                                sx={ { ml: 1 } }
                                required
                                id="description1"
                                label="Main Feature "
                                name="description1"
                                autoComplete="off"
                                autoFocus
                                { ...register( "description1", { required: true, maxLength: 15 } ) }
                            />
                            { errors.description1 && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid description</p> }
                            <TextField
                                margin="normal"
                                required
                                sx={ { ml: 1 } }
                                id="description2"
                                label="Feature"
                                name="description2"
                                autoComplete="off"
                                autoFocus
                                { ...register( "description2", { required: true, maxLength: 15 } ) }
                            />
                            { errors.description2 && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid description</p> }
                            <TextField
                                margin="normal"
                                required
                                sx={ { ml: 1 } }
                                id="description3"
                                label="Feature"
                                name="description3"
                                autoComplete="off"
                                autoFocus
                                { ...register( "description3", { required: true, maxLength: 15 } ) }
                            />
                            { errors.description3 && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid description</p> }
                            <TextField
                                margin="normal"
                                required
                                sx={ { ml: 1 } }
                                id="description4"
                                label="Feature"
                                name="description4"
                                autoComplete="off"
                                autoFocus
                                { ...register( "description4", { required: true, maxLength: 15 } ) }
                            />
                            { errors.description4 && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid description</p> }
                            <TextField
                                margin="normal"
                                required
                                sx={ { ml: 1 } }
                                id="description5"
                                label="Feature"
                                name="description5"
                                autoComplete="off"
                                autoFocus
                                { ...register( "description5", { required: true, maxLength: 15 } ) }
                            />
                            { errors.description5 && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid description</p> }

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="mobilenumber"
                                label="Mobile Number"
                                name="mobilenumber"
                                autoComplete="off"
                                autoFocus
                                { ...register( "mobilenumber", { required: true, pattern: /^[0-9+-]+$/, maxLength: 10 } ) }
                            />
                            { errors.mobilenumber && <p style={ { fontSize: "15px", color: "red" } }>Please Enter Valid Mobile Number</p> }

                            <div style={ { display: "flex", marginTop: "5px" } }>
                                <Typography component="h1" style={ {
                                    color: "#111954",
                                    fontSize: "16px",
                                    fontFamily: "ui-monospace",
                                    marginRight: "15px"
                                } } >
                                    Upload Project Image :
                                </Typography>
                                <img onClick={ () => { inputImageTrigger( inputImageOne ) } } style={ { height: "200px", border: "1px solid black" } } src={ imgOne.url || dummyimage } alt="uploadImage" />
                                <input hidden ref={ inputImageOne } type='file' name='fileOne' onChange={ selectimgOne }></input>
                            </div>
                            <center>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={ { mt: 3, mb: 2 } }
                                    color="success"
                                    fullWidth
                                    onClick={ handleSubmit( onSubmit ) }
                                >
                                    Add Post
                                </Button>
                            </center>

                            <Grid container >
                                <Grid item xs style={ { display: "flex" } }>
                                    <Link to="/homepage" variant="body2" style={ { textDecoration: "none" } }>
                                        Back To Home
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </div>
        </>
    )
}

export default PostForm