import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../User/Loader';
import axios from 'axios';
import Swal from 'sweetalert2'


toast.configure();

function CustomToolbar ()
{
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
const Table = () =>
{
    const [ usersData, setusersData ] = useState( [] );
    const [ Loading, setLoading ] = useState( false );
    const ADMINTOKEN = localStorage.getItem( "AdminToken" );

    useEffect( () =>
    {
        getuserdata();

    }, [] );

    const getuserdata = async () =>
    {
        try
        {
            setLoading( true );
            const url = "http://localhost:8080/api/admin/userdata";
            const { data: res } = await axios.get( url,  );
            const { USERDATAS } = res.data;
            setusersData( () =>
            {
                return USERDATAS.map( ( i ) =>
                {
                    return { ...i, id: i._id };
                } );
            } );
            setLoading( false );
        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        }
        finally
        {
            setLoading( false );
        }
    };



    const handleBlock = ( async ( id ) =>
    {
        try
        {
            Swal.fire( {
                title: 'Are you sure?',
                text: "After User Can't Access MiddlMan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Block User!'
            } ).then( ( result ) =>
            {
                if ( result.isConfirmed )
                {
                    const url = "http://localhost:8080/api/admin/block/" + id;
                    axios.put( url ).then( ( res ) =>
                    {
                        getuserdata();
                        Swal.fire(
                            'Blocked!',
                            'Your User has been Blocked.',
                            'success'
                        )

                    } );

                }
            } )

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        }
    } )

    const handleUnBlock = ( async ( id ) =>
    {
        try
        {
            Swal.fire( {
                title: 'Are you sure?',
                text: "After User Can Access MiddlMan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Unblock User!'
            } ).then( ( result ) =>
            {
                if ( result.isConfirmed )
                {
                    const url = "http://localhost:8080/api/admin/unblock/" + id;
                    axios.put( url ).then( ( res ) =>
                    {
                        getuserdata();
                        Swal.fire(
                            'Unblocked!',
                            'Your User has been Unblocked.',
                            'success'
                        )
                    } );
                }
            } );

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            };
        }
    } );

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 180
        },
        {
            field: "firstName",
            headerName: "Name",
            width: 105,
        },
        {
            field: "userName",
            headerName: "Username",
            width: 150,
        },
        {
            field: "email",
            headerName: "Email",
            width: 180,
        },
        {
            field: "mobileNumber",
            headerName: "Mobile",
            width: 150
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: ( params ) =>
            {
                return (
                    <>
                        { params.row.status === true ? ( <Button color="primary" variant="contained" onClick={ () => handleBlock( params.row.id ) } >Block</Button> ) :
                            ( <Button color="secondary" variant="contained" onClick={ () => handleUnBlock( params.row.id ) } >UnBlock</Button> ) }
                    </>
                );
            },
        },
    ];



    if ( Loading )
    {
        return (
            <>
                <Loader />
            </> )
    };


    return (
        <div>
            <DataGrid
                style={ { border: "2px solid black", color: "#042b54" } }
                rows={ usersData }
                disableSelectionOnClick
                columns={ columns }
                pageSize={ 5 }
                rowsPerPageOptions={ [ 5 ] }
                autoHeight={ true }
                components={ {
                    Toolbar: CustomToolbar,
                } }
            />
        </div>
    )
};

export default Table