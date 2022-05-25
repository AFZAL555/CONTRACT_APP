import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ContractSide from '../../Components/Admin/ContractSide'

const ContractAdmin = () =>
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
                <ContractSide name={ 'Contracts' } />
            </>
        )
    };
}

export default ContractAdmin