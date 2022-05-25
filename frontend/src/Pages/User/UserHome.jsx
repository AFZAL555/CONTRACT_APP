import React, { useEffect } from 'react';
import Navbar from '../../Components/User/Navbar';
import Banner from '../../Components/User/Banner';
import TrendingPost from '../../Components/User/TrendingPost';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Footer from '../../Components/User/Footer';
import Allpost from '../../Components/User/Allpost';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../Components/User/Login';

toast.configure();

const UserHome = () =>
{
    const navigate = useNavigate();
    const USERTOKEN = localStorage.getItem( "userToken" );
    useEffect( () =>
    {
        const USERTOKEN = localStorage.getItem( "userToken" );
        if ( !USERTOKEN )
        {
            navigate( "/" );
        }

    }, [] );
    if ( USERTOKEN )
    {
        return (
            <div>
                <Navbar />
                <Banner />
                <div style={ { border: "1px solid blue", margin: "1px ", padding: "1px" } }>
                    <h4 style={ { fontFamily: "monospace", fontSize: "25px", margin: "4px" } }>Trending Post,</h4>
                    <div style={ { margin: "4px" } }>
                        <TrendingPost />
                    </div>
                </div>
                <Banner />
                <div style={ { border: "1px solid blue", margin: "1px ", padding: "1px" } }>
                    <div style={ { display: "flex", justifyContent: "space-between" } }>
                        <h5 style={ { fontFamily: "monospace", fontSize: "25px", margin: "4px" } }></h5>
                        <Link to="/allpost" style={ { textDecoration: "none", margin: "2px" } }>
                            <center>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={ { mt: 3, mb: 2 } }
                                    color="primary"
                                >
                                    View All
                                </Button>
                            </center>
                        </Link>
                    </div>
                    <div style={ { margin: "4px" } }>
                        <Allpost />
                    </div>
                </div>
                <Footer />
            </div>
        )
    };



}

export default UserHome

