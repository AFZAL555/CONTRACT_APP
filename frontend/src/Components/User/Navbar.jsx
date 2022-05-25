import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Avatar, Button} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

toast.configure();



const Navbar=({trigger}) =>
{
    const navigate=useNavigate();
    const [anchorEl, setAnchorEl]=useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl]=useState(null);
    const isMenuOpen=Boolean(anchorEl);
    const isMobileMenuOpen=Boolean(mobileMoreAnchorEl);


    //notification 
    const notificationError=(m) => {toast.error(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};

    const [userdata, setuserdata]=useState();
    const [profilephoto, setprofilephoto]=useState();
    const [premium, setpremium]=useState(false);
    const userid=localStorage.getItem("userID");
    const USERTOKEN=localStorage.getItem("userToken");
    useEffect(() =>
    {

        if(!USERTOKEN) {
            navigate("/");
        }
        else {
            getuserdata();
        }


    }, []);

    useEffect(() =>
    {
        getuserdata();
    }, [trigger]);


    const handleClickOpen=() =>
    {
        if(premium===true) {
            navigate('/newpost');
        }
        else {
            navigate('/premiumplan');
        }

    };
    const getuserdata=async () =>
    {
        try {
            const url="http://localhost:8080/api/users/userdata/"+userid;
            const {data: res}=await axios.get(url, {headers: {"Authorization": USERTOKEN}});
            const {PLANDATA, USERDATA}=res.data;
            setuserdata(USERDATA);
            setprofilephoto(USERDATA.profilephoto[0].url);
            setpremium(PLANDATA);
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                const message=error.response.data.message;

            }
        }
    };

    const handleLogout=async () =>
    {
        try {
            handleMenuClose();
            Swal.fire({
                title: 'Are you sure for logout?',
                text: "After you need to login to Access MiddlMan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Successfull Logout!'
            }).then((result) =>
            {
                if(result.isConfirmed) {
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("userID");


                    Swal.fire(
                        'Logout Success!',
                        'You Logged out from MiddleMan.',
                        'success'
                    );

                    navigate('/');
                }
            });

        } catch(error) {
            console.log(error);

        }
    };

    const handleProfileMenuOpen=(event) =>
    {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose=() =>
    {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose=() =>
    {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen=(event) =>
    {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const userprofile=() =>
    {
        handleMenuClose();
        navigate("/profile");
    };

    const bidhistory=() =>
    {
        handleMenuClose();
        navigate("/bidhistory");
    };
    const userpostcorno=() =>
    {
        handleMenuClose();
        navigate("/userpostcorno");
    };
    const usercontract=() =>
    {
        handleMenuClose();
        navigate("/contractshow");
    };
    const menuId='primary-search-account-menu';
    const renderMenu=(
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={userprofile}>Profile</MenuItem>
            <MenuItem onClick={userpostcorno}>Post</MenuItem>
            <MenuItem onClick={usercontract}>Contracts</MenuItem>
            <MenuItem onClick={bidhistory}>Bid History</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId='primary-search-account-menu-mobile';
    const renderMobileMenu=(
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="add new post" color="inherit">
                    <Link to="/newpost" style={{textDecoration: "none", color: "black"}}>
                        <PostAddIcon />
                    </Link>
                </IconButton>
                <p>New Post</p>
            </MenuItem>

            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">

                    <Link to="/chat" style={{color: "white"}}>
                        <MailIcon />
                    </Link>
                </IconButton>
                <p>Messages</p>
            </MenuItem>


            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar
                        alt="ProfilePic"
                        src={profilephoto}

                    />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );



    return (
        <>
            <Box sx={{flexGrow: 1, }}>
                <AppBar position="static" style={{backgroundColor: "#131858"}}>
                    <Toolbar >
                        <Link to="/homepage">
                            <IconButton
                                size="large"
                                color="inherit"
                            >
                                <Avatar
                                    alt="ProfilePic"
                                    src="/logo.png"
                                    variant="rounded"
                                    sx={{width: 56, height: 56}}
                                />
                            </IconButton>
                        </Link>
                        <Typography style={{marginLeft: "5px"}}
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{display: {xs: 'none', sm: 'block'}}}
                        >
                            MiddleMan
                        </Typography>



                        <Box sx={{flexGrow: 1}} />
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <IconButton size="large" aria-label="add new post" color="inherit">
                                <Button onClick={handleClickOpen} style={{textDecoration: "none", alignContent: "center"}}>
                                    <PostAddIcon
                                        sx={{width: 36, height: 36, color: "white", alignContent: "center"}}
                                    />
                                </Button>
                            </IconButton>


                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">

                                <Link to="/chat" style={{color: "white"}}>
                                    <MailIcon
                                        sx={{width: 36, height: 36}}
                                    />
                                </Link>


                            </IconButton>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar
                                    alt="ProfilePic"
                                    src={profilephoto}
                                    sx={{width: 56, height: 56}}
                                />
                            </IconButton>
                        </Box>
                        <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
        </>
    );
};

export default Navbar;