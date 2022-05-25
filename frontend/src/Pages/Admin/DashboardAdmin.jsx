import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SidebarNavbar from '../../Components/Admin/SidebarNavbar';


const DashboardAdmin = () =>
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
                <SidebarNavbar name={ 'Dashboard' } />
            </>
        );

    }



}

export default DashboardAdmin