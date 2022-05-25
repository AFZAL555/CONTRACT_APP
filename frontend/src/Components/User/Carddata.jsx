import React from 'react'
import { Avatar, CardHeader, CardMedia } from '@mui/material'

const Carddata = ( { Post } ) =>
{
    return (
        <>
            <CardHeader
                sx={ { width: 300 } }
                avatar={
                    <Avatar
                        alt="ProfilePic"
                        src={ Post.profilephoto[ 0 ].url }
                    />
                }
                title={ Post.userName }
                subheader={ new Date( Post.createdAt ).toDateString() }
            />
            <CardMedia
                sx={ { width: 300 } }
                component="img"
                height="300"
                width='300'
                image={ Post.projectImage[ 0 ].url }
                alt="Paella dish"
            />


        </>
    )
}

export default Carddata