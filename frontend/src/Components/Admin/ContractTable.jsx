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
const ContractTable = () =>
{
    const [ contractData, setcontractData ] = useState( [] );
    const [ Loading, setLoading ] = useState( false );
    const ADMINTOKEN = localStorage.getItem( "AdminToken" );

    useEffect( () =>
    {
        getcontractdata();

    }, [] );

    const getcontractdata = async () =>
    {
        try
        {
            setLoading( true );
            const url = "http://localhost:8080/api/admin/contractsdata";
            const { data: res } = await axios.get( url, { headers: { "Authorization": ADMINTOKEN } } );
            const { CONTRACTDATA } = res.data;
            setcontractData( () =>
            {
                return CONTRACTDATA.map( ( i ) =>
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


    const columns = [

        {
            field: "projectname",
            headerName: "Project Name",
            width: 180,
        },
        {
            field: "userName",
            headerName: "Client",
            width: 150,
        },
        {
            field: "contractoruserName",
            headerName: "Contractor",
            width: 150,
        },
        {
            field: "budget",
            headerName: "Budget",
            width: 150
        },
        {
            field: "bidAmount",
            headerName: "Contract Amount",
            width: 150
        },
        {
            field: "createdAt",
            headerName: "Contract Date",
            width: 105,
            type: 'date',

        }
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
                rows={ contractData }
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

export default ContractTable