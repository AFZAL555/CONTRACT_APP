import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import axios from 'axios';
import "../User/plan.css"



function CustomToolbar ()
{
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
const Tablelatest = () => {
    const [ transactionData, settransactionData ] = useState( [] );
    const ADMINTOKEN = localStorage.getItem( "AdminToken" );

    useEffect( () =>
    {
        getlatesttransactiondata();

    }, [] );

    const getlatesttransactiondata = async () =>
    {
        try
        {
           
            const url = "http://localhost:8080/api/admin/latesttransactions";
            const { data: res } = await axios.get( url,  );
            const { TRANSACTIONDATA } = res.data;
            settransactionData( () =>
            {
                return TRANSACTIONDATA.map( ( i ) =>
                {
                    return { ...i, id: i._id };
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
     const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 300,
        },
        {
            field: "planName",
            headerName: "Plan Name",
            width: 250,
        },
        {
            field: "userName",
            headerName: "Username",
            width: 230,
        },
        {
            field: "planrate",
            headerName: "Amount",
            width: 200
        }
    ];
  return (
    <div>
        <h3 className="chartTitle">Latest Transactions</h3>
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
}

export default Tablelatest