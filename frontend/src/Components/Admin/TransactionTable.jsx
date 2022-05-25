import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Loader from '../User/Loader';
import axios from 'axios';


function CustomToolbar ()
{
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
const TransactionTable = () =>
{
    const [ transactionData, settransactionData ] = useState( [] );
    const [ Loading, setLoading ] = useState( false );
    const ADMINTOKEN = localStorage.getItem( "AdminToken" );

    useEffect( () =>
    {
        gettransactiondata();

    }, [] );

    const gettransactiondata = async () =>
    {
        try
        {
            setLoading( true );
            const url = "http://localhost:8080/api/admin/transactionsdata";
            const { data: res } = await axios.get( url, { headers: { "Authorization": ADMINTOKEN } } );
            const { TRANSACTIONDATA } = res.data;
            settransactionData( () =>
            {
                return TRANSACTIONDATA.map( ( i ) =>
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
            field: "_id",
            headerName: "ID",
            width: 215
        },
        {
            field: "planName",
            headerName: "Plan Name",
            width: 170,
        },
        {
            field: "userName",
            headerName: "Username",
            width: 150,
        },
        {
            field: "planrate",
            headerName: "Amount",
            width: 120
        },
        {
            field: "createdAt",
            headerName: "Plan Start",
            width: 105,
            type: 'date',

        },
        {
            field: "expireAt",
            headerName: "Plan Expire",
            type: 'date',
            width: 105
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
                rows={ transactionData }
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

export default TransactionTable