import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PeopleIcon from '@mui/icons-material/People';
import GavelIcon from '@mui/icons-material/Gavel';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <Link to="/dashboard" style={ { textDecoration: "none", color: "navy" } }>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link to="/postmanagement" style={ { textDecoration: "none", color: "navy" } }>
            <ListItemButton>
                <ListItemIcon>
                    <DynamicFeedIcon />
                </ListItemIcon>
                <ListItemText primary="Post Management" />
            </ListItemButton>
        </Link>

        <Link to="/usermanagement" style={ { textDecoration: "none", color: "navy" } }>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
            </ListItemButton>
        </Link>
        <Link to="/contracts" style={ { textDecoration: "none", color: "navy" } }>
            <ListItemButton>
                <ListItemIcon>
                    <GavelIcon />
                </ListItemIcon>
                <ListItemText primary="Contracts" />
            </ListItemButton>
        </Link>
        <Link to="/transactions" style={ { textDecoration: "none", color: "navy" } }>
            <ListItemButton>
                <ListItemIcon>
                    <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
            </ListItemButton>
        </Link>
        <Link to="/reports" style={ { textDecoration: "none", color: "navy" } }>
            <ListItemButton>
                <ListItemIcon>
                    <SummarizeIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);