import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InfinityPost from '../../Components/User/InfinityPost'

const Viewall = () =>
{
    const navigate = useNavigate();
    const USERTOKEN = localStorage.getItem( "userToken" );
    useEffect( () =>
    {
        const USERTOKEN = localStorage.getItem( "userToken" );
        if ( !USERTOKEN )
        {
            navigate( "/" );
        }

    }, [] );
    if ( USERTOKEN )
    {

        return (
            <div>
                <InfinityPost />
            </div>
        )
    }
}

export default Viewall;