import { Box, Button, Container, createTheme, CssBaseline, Grid, IconButton, List, Paper, styled, ThemeProvider, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainListItems } from './listitems';
import Table from './Table';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import TableReport from './TableReport';
import axios from 'axios';
import TextField from '@mui/material/TextField'

const drawerWidth = 240;

const AppBar = styled( MuiAppBar, {
    shouldForwardProp: ( prop ) => prop !== 'open',
} )( ( { theme, open } ) => ( {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create( [ 'width', 'margin' ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    ...( open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${ drawerWidth }px)`,
        transition: theme.transitions.create( [ 'width', 'margin' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        } ),
    } ),
} ) );

const Drawer = styled( MuiDrawer, { shouldForwardProp: ( prop ) => prop !== 'open' } )(
    ( { theme, open } ) => ( {
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create( 'width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            } ),
            boxSizing: 'border-box',
            ...( !open && {
                overflowX: 'hidden',
                transition: theme.transitions.create( 'width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                } ),
                width: theme.spacing( 7 ),
                [ theme.breakpoints.up( 'sm' ) ]: {
                    width: theme.spacing( 9 ),
                },
            } ),
        },
    } ),
);

const mdTheme = createTheme();

const Reportside = ( { name } ) =>
{
    const navigate = useNavigate();
    const [ open, setOpen ] = useState( true );
    const [ report, setReport ] = useState( [] );
    const [ toDate, setToDate ] = useState();
    const [ fromDate, setFromDate ] = useState();


     // preventing data
    var dttoday = new Date();
    var month = dttoday.getMonth() + 1;
    var day = dttoday.getDate();
    var year = dttoday.getFullYear();
    if ( month < 10 ) month = "0" + month.toString();
    if ( day < 10 ) day = "0" + day.toString();
    var maxdate = year + "-" + month + "-" + day;
    useEffect( () =>
    {
        
        getsalesreport();

    }, [] );
    const getsalesreport = async () =>
    {
        try
        {
            const url = "http://localhost:8080/api/admin/fetchsalesreport";
            const { data: res } = await axios.get( url );
            const { report } = res.data;
            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );
        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } 
    };
    const filterReport = async () =>
    {
        try
        {
            const data = { fromDate, toDate };
            const url = "http://localhost:8080/api/admin/fetchfilterReport";
            const { data: res } = await axios.post( url, data );
            const { report } = res.data;
            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );
        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        }
    };

    const dayReport = async () =>
    {
        try
        {
            const data = { fromDate, toDate };
            const url = "http://localhost:8080/api/admin/fetchdayReport";
            const { data: res } = await axios.post( url, data );
            const { report } = res.data;
            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );
        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        }
    };

    const weekReport = async () =>
    {
        try
        {
            const data = { fromDate, toDate };
            const url = "http://localhost:8080/api/admin/fetchweekReport";
            const { data: res } = await axios.post( url, data );
            const { report } = res.data;
            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );
        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } 
    };

    const monthReport = async () =>
    {
        try
        {
            const data = { fromDate, toDate };
            const url = "http://localhost:8080/api/admin/fetchmonthReport";
            const { data: res } = await axios.post( url, data );
            const { report } = res.data;

            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );
        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } 
    };

    const yearlyReport = async () =>
    {
        try
        {
            const data = { fromDate, toDate };
            const url = "http://localhost:8080/api/admin/fetchyearlyReport";
            const { data: res } = await axios.post( url, data );
            const { report } = res.data;
            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } 
    };


    const toggleDrawer = () =>
    {
        setOpen( !open );
    };
    const handlelogout = async () =>
    {
        try
        {
            console.log( "handleclick called" );
            Swal.fire( {
                title: 'Are you sure for logout?',
                text: "After you need to login to Access MiddlMan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Successfull Logout!'
            } ).then( ( result ) =>
            {
                if ( result.isConfirmed )
                {
                    localStorage.removeItem( "AdminToken" );
                    localStorage.removeItem( "AdminID" );

                    Swal.fire(
                        'Logout Success!',
                        'You Logged out from MiddleMan.',
                        'success'
                    )

                    navigate( "/adminlogin" );

                }
            } );

        } catch ( error )
        {
            console.log( error );
        }
    };
    return (

        <ThemeProvider theme={ mdTheme }>
            <Box sx={ { display: 'flex' } }>
                <CssBaseline />
                <AppBar position="absolute" open={ open } style={ { border: "1px solid black" } }>
                    <Toolbar
                        sx={ {
                            pr: '24px', // keep right padding when drawer closed
                        } }
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={ toggleDrawer }
                            sx={ {
                                marginRight: '36px',
                                ...( open && { display: 'none' } ),
                            } }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={ { flexGrow: 1 } }
                        >
                            { name }
                        </Typography>
                        <IconButton color="inherit">
                            <LogoutIcon onClick={ () => { handlelogout() } } />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={ open }>
                    <Toolbar
                        sx={ {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [ 1 ],
                        } }
                    >
                        <IconButton onClick={ toggleDrawer }>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <List component="nav">
                        { mainListItems }
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={ {
                        backgroundColor: ( theme ) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[ 100 ]
                                : theme.palette.grey[ 900 ],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        border: "1px solid black"
                    } }>
                    <Toolbar />
                    <Container maxWidth="lg" sx={ { mt: 4, mb: 4 } }>
                        <Grid container spacing={ 3 }>
                                    
                                    
                                    <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                                    <Paper
                                        sx={ {
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 100,
                                            width:200,
                                            boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" ,
                                         } }
                                     >
                                            <Button
                                            variant="contained"
                                            style={ { height: "40px",marginTop:"12px",background:"#101f4a"} }
                                            onClick={ dayReport }
                                        >
                                            DAY
                                        </Button>
                                </Paper>
                                    </Grid>

                                    <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                                    <Paper
                                        sx={ {
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 100,
                                            width:200,
                                            boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" ,
                                         } }
                                     >
                                            <Button
                                            variant="contained"
                                            style={ { height: "40px",marginTop:"12px",background:"#101f4a"} }
                                            onClick={ weekReport }
                                        >
                                            WEEK
                                        </Button>
                                </Paper>
                                    </Grid>

                                         <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                                    <Paper
                                        sx={ {
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 100,
                                            width:200,
                                            boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" ,
                                         } }
                                     >
                                            <Button
                                            variant="contained"
                                            style={ { height: "40px",marginTop:"12px",background:"#101f4a"} }
                                            onClick={ monthReport }
                                        >
                                            MONTH
                                        </Button>
                                </Paper>
                                    </Grid>
                                         <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                                    <Paper
                                        sx={ {
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 100,
                                            width:200,
                                            boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" ,
                                         } }
                                     >
                                            <Button
                                            variant="contained"
                                            style={ { height: "40px",marginTop:"12px",background:"#101f4a"} }
                                            onClick={ yearlyReport }
                                        >
                                            YEAR
                                        </Button>
                                </Paper>
                                    </Grid>

                        {/* Report Date*/ }
                            <Grid item xs={ 12 }>
                                <Paper sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
                                     <div style={ { display: "flex", alignItems: "center", justifyContent: "space-between", width: "75%" } }>
                                        <div>
                                            <label>From Date :</label>
                                            <input
                                                style={ { margin: "0", border: " 1px solid dodgerblue", marginLeft: "2px", marginBottom: "12px" } }
                                                type={ "date" }
                                                max={ maxdate }
                                                onChange={ ( e ) => setFromDate( e.target.value ) }
                                            />
                                        </div>
                                        <div>
                                            <label>To Date :</label>
                                            <input
                                                style={ { margin: "0", border: " 1px solid dodgerblue", marginLeft: "4px", marginBottom: "12px" } }
                                                type={ "date" }
                                                min={ fromDate }
                                                max={ maxdate }
                                                onChange={ ( e ) => setToDate( e.target.value ) }
                                            />
                                        </div>

                                        <div>
                                            <Button
                                                variant="contained"
                                               onClick={ () => { filterReport(); } }
                                            >
                                                Generate
                                            </Button>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>

                            {/* Report table */ }
                            <Grid item xs={ 12 }>
                                <Paper sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
                                    <TableReport  report={ report }/>
                                </Paper>
                            </Grid>



                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
}

export default Reportside