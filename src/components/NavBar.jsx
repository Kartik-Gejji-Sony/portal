import { Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import { MeniDrawer } from "./MenuBar/MeniDrawer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListIcon from '@mui/icons-material/List';
import Tooltip from '@mui/material/Tooltip';

export const NavBar = () => {
    const nevigate = useNavigate()
    const dispatch = useDispatch()
    const { oktaAuth } = useOktaAuth();
    const activeIcon = useSelector((state) => state.activeIcon.activeIcon)
    const projectName = useSelector((state) => state.projectReducers.projectDetails)
    const user = JSON.parse(localStorage.getItem("okta-token-storage"))
    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleHome = () => {
        nevigate("/home")
        dispatch({
            type: "activeHomeIcon",
            payload: false
        })
    }
    const handleLogout = () => {
        setAnchorEl(null);

        oktaAuth.signOut('/')
        dispatch({
            type: "activeHomeIcon",
            payload: false
        })
    }
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleHambergClick = () => {
        setIsOpen(true)
    }
    return (
        <div className="navbar">
            <Grid container spacing={0.5}>
                <Grid item xs={0.5} md={0.5}>
                    <div style={{ position: "relative", bottom: "10px" }}>
                        <IconButton onClick={handleHambergClick} ><ListIcon style={{ color: "white" }} fontSize="large" /></IconButton>
                        <MeniDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </Grid>
                <Grid item xs={0.5} md={0.2}></Grid>
                <Grid item xs={3.5} md={2.8}>
                    <div>
                        <p className="p">VIS-PM-Dashboard</p>
                    </div>
                </Grid>
                {activeIcon ?
                    <Grid item xs={5} md={6}  >
                        <div style={{ position: "relative", top: "1px", color: 'white' }}>
                            <Tooltip title="Home" arrow><IconButton onClick={handleHome}><HomeIcon className="homeIcon" /></IconButton></Tooltip>
                            <span className="P_Name">{projectName.name}</span>
                        </div></Grid>
                    : <Grid item xs={5} md={6} style={{ position: "relative", top: "1px", color: 'white' }}></Grid>
                }
                <Grid item xs={2} md={1} style={{ position: "relative", top: "6px", color: 'white', textAlign: "right", left: '105px' }}>{user?.idToken?.claims?.name}</Grid>
                <Grid item xs={0.5} md={1.5} >
                    <IconButton id="basic-button" style={{ position: 'relative', left: '110px' }}
                        aria-controls={open ? 'basic-menu' : undefined}
                        // aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <AccountCircleIcon className="logoutIcon" style={{ position: "relative", bottom: "4px", color: 'white', textAlign: "left" }} />
                    </IconButton>
                </Grid>
            </Grid>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}







