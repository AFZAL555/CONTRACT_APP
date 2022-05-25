import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Transactionside from '../../Components/Admin/Transactionside'

const Transactions = () =>
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
                <Transactionside name={ 'Transactions' } />
            </>
        )
    };
}

export default Transactions