import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Userside from '../../Components/Admin/Userside'

const UserManagement = () =>
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
                <Userside name={ 'User Management' } />
            </>
        )
    };
}

export default UserManagement;