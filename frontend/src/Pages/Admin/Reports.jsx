import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Reportside from '../../Components/Admin/Reportside'

const Reports = () =>
{
    const navigate = useNavigate();
    const ADMINTOKEN = localStorage.getItem( "AdminToken" );
    useEffect( () =>
    {
        const ADMINTOKEN = localStorage.getItem( "AdminToken" );
        if ( !ADMINTOKEN )
        {
            navigate( "/adminlogin" );
        }
    }, [] );

    if ( ADMINTOKEN )
    {

        return (
            <>
                <Reportside name={ 'Reports' } />
            </>
        )
    }
}

export default Reports;