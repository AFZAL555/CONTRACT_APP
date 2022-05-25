import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Postside from '../../Components/Admin/Postside'

const PostManagment = () =>
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
                <Postside name={ 'Post Management' } />
            </>
        )
    }
}

export default PostManagment