import {Box, CircularProgress, Container, createTheme, CssBaseline, Grid, IconButton, List, Paper, styled, ThemeProvider, Toolbar, Typography} from '@mui/material';
import React, {useEffect, useMemo, useState} from 'react';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import {mainListItems} from './listitems';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Chart from './Chart';
import Tablelatest from './Tablelatest';
import Features from './Features';


const drawerWidth=240;

const AppBar=styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop!=='open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer+1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open&&{
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer=styled(MuiDrawer, {shouldForwardProp: (prop) => prop!=='open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open&&{
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme=createTheme();

const SidebarNavbar=({name}) =>
{
    const [open, setOpen]=useState(false);
    const ADMINTOKEN=localStorage.getItem("AdminToken");
    const MONTHS=useMemo(() => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ], []);
    const [userStatics, setUserStatics]=useState([]);
    const [newTotalIncome, setNewTotalIncome]=useState(0);
    const [postCount, setpostCount]=useState(0);
    const [bidCount, setbidCount]=useState(0);
    const [contractCount, setcontractCount]=useState(0);

    useEffect(() =>
    {
        userstatices();

    }, [MONTHS]);

    const userstatices=async () =>
    {
        try {
            const url="http://localhost:8080/api/admin/userstatics";
            const {data: res}=await axios.get(url, {headers: {"Authorization": ADMINTOKEN}});
            const createdmessage=res.message;
            const {userstaticss, totalIncome, postcounts, bidcounts, contractcounts}=res.data;
            setNewTotalIncome(totalIncome);
            setpostCount(postcounts);
            setbidCount(bidcounts);
            setcontractCount(contractcounts);
            userstaticss.map((item) =>
                setUserStatics((prev) =>
                    [...prev, {month: MONTHS[item._id-1], "Active User": item.total},]));
        } catch(error) {
            if(error.response&&error.response.status>=400&&error.response.status<=500) {
                console.table(error.response.data.message);

            }
        }
    };
    const navigate=useNavigate();
    const toggleDrawer=() =>
    {
        setOpen(!open);
    };

    const handlelogout=async () =>
    {
        try {
            console.log("handleclick called");
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
                    localStorage.removeItem("AdminToken");
                    localStorage.removeItem("AdminID");

                    Swal.fire(
                        'Logout Success!',
                        'You Logged out from MiddleMan.',
                        'success'
                    );

                    navigate("/adminlogin");

                }
            });

        } catch(error) {
            console.log(error);
        }
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <AppBar position="absolute" open={open} style={{border: "1px solid black"}}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open&&{display: 'none'}),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            {name}
                        </Typography>
                        <IconButton color="inherit" >
                            <LogoutIcon onClick={() => {handlelogout();}} />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],

                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>

                    <List component="nav">
                        {mainListItems}

                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode==='light'
                                ? theme.palette.grey[100]
                                :theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        border: "1px solid black"
                    }}>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>

                            {/* Income */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                        boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                                    }}
                                >
                                    {newTotalIncome? (<Features title="Income" money={` ₹ ${newTotalIncome}`} subtitle="Total Income Still Now" />):(<Features title="Income" money={<CircularProgress color="secondary" />} subtitle="Total Income Still Now" />)}
                                </Paper>
                            </Grid>


                            {/*  post */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                        boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                                    }}
                                >
                                    {postCount? (<Features title="Post" money={postCount} subtitle="Available Post" />):(<Features title="Post" money={<CircularProgress color="secondary" />} subtitle="Available Post" />)}
                                </Paper>
                            </Grid>


                            {/*  Bid */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                        boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                                    }}
                                >
                                    {bidCount? (<Features title="Bid" money={bidCount} subtitle="Current Total Bid" />):(<Features title="Bid" money={<CircularProgress color="secondary" />} subtitle="Current Total Bid" />)}
                                </Paper>
                            </Grid>


                            {/*  contracts */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                        boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                                    }}
                                >
                                    {contractCount? (<Features title="Contracts" money={contractCount} subtitle="Contracts Still Now" />):(<Features title="Contracts" money={<CircularProgress color="secondary" />} subtitle="Contracts Still Now" />)}
                                </Paper>
                            </Grid>


                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "109%",
                                        boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                                    }}
                                >
                                    <Chart
                                        data={userStatics}
                                        title="User Analytics"
                                        grid
                                        dataKey="Active User"
                                    /></Paper>
                            </Grid>


                            {/* Recent Transactions */}
                            <Grid item xs={12} sx={{mt: 2}}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}>
                                    <Tablelatest />
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
};

export default SidebarNavbar;