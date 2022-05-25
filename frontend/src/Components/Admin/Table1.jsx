import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import Loader from "../User/Loader";
import axios from 'axios';

import Swal from 'sweetalert2'


function CustomToolbar ()
{
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};
const Table1 = () =>
{
    const [ postData, setpostData ] = useState( [] );
    const [ Loading, setLoading ] = useState( false );
    const ADMINTOKEN = localStorage.getItem( "AdminToken" );

    useEffect( () =>
    {
        getPostdata();

    }, [] );

    const getPostdata = async () =>
    {
        try
        {
            setLoading( true );
            const url = "http://localhost:8080/api/admin/postdata";
            const { data: res } = await axios.get( url, );
            const { POSTDATA } = res.data;
            setpostData( () =>
            {
                return POSTDATA.map( ( i ) =>
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
    const deletePro = async ( id ) =>
    {
        try
        {
            Swal.fire( {
                title: 'Are you sure?',
                text: "After User Can't  Access this Post!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes,'
            } ).then( ( result ) =>
            {
                if ( result.isConfirmed )
                {
                    setLoading( true );
                    const url = "http://localhost:8080/api/admin/post/delete/" + id;
                    axios.delete( url ).then( ( res ) =>
                    {
                        getPostdata();
                        setLoading( false );
                        Swal.fire(
                            'Deleted!',
                            'Post has been Deleted.',
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
            }
        }
    };

    if ( Loading )
    {
        return (
            <>
                <Loader />
            </> )
    };

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 140
        },
        {
            field: "projectname",
            headerName: "Post Name",
            width: 150,
        },
        {
            field: "userName",
            headerName: "Username",
            width: 130,
        },
        {
            field: "mobileNumber",
            headerName: "Mobile",
            width: 140
        },
        {
            field: "budget",
            headerName: "Budget",
            width: 100
        },
        {
            field: "bidAmount",
            headerName: "Current Bid",
            width: 90
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: ( params ) =>
            {
                return (
                    <>
                        <Button color="secondary" variant="contained" onClick={ () => { deletePro( params.row.id ) } }>Delete</Button>
                    </>
                );
            },
        },
    ];
    return (
        <div>
            <DataGrid
                style={ { border: "2px solid black", color: "#042b54" } }
                rows={ postData }
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
}

export default Table1