import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/User/Navbar'
import PostForm from '../../Components/User/PostForm'

const PostAdding = () =>
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
            <>
                <div>
                    <Navbar />
                    <PostForm />


                </div>

            </>
        )
    }

}

export default PostAdding