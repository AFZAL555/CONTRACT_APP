import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import React from 'react';


function CustomToolbar ()
{
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};



const TableReport = ({report}) => {
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 250
        },
        {
            field: "planName",
            headerName: "Plan Name",
            width:220,
        },
        {
            field: "userName",
            headerName: "Username",
            width: 190,
        },
        {
            field: "planrate",
            headerName: "Amount",
            width: 180
        },
        {
            field: "createdAt",
            headerName: "Plan Start",
            width: 105,
            type: 'date',

        }
    ];

  return (
    <div>
        <DataGrid
                style={ { border: "2px solid black", color: "#042b54" } }
                rows={ report }
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

export default TableReport