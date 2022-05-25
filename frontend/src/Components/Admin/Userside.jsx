import { Box, Container, createTheme, CssBaseline, Grid, IconButton, List, Paper, styled, ThemeProvider, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainListItems } from './listitems';
import Table from './Table';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

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

const Userside = ( { name } ) =>
{
    const [ open, setOpen ] = useState( true );
    const navigate = useNavigate();
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
                            {/* Recent Orders */ }
                            <Grid item xs={ 12 }>
                                <Paper sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
                                    <Table />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
}

export default Userside