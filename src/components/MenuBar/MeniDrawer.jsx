import React from "react";
import { Box, Drawer, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import '../MenuBar/Drawer.css'
import { useDispatch, useSelector } from "react-redux";



export const MeniDrawer = ({ isOpen, setIsOpen }) => {
    const nevigate = useNavigate()
    const activeIcon = useSelector((state) => state.activeIcon.activeIcon)
    const projectName = useSelector((state) => state.projectReducers.projectDetails)
    const dispatch = useDispatch()



    const handleClose = () => {
        setIsOpen(false)
        dispatch({
            type: "activeHomeIcon",
            payload: false
        })
    }

    const handleAbout = () => {
        dispatch({
            type: "defaultTab",
            payload: 0
        })
        nevigate("/projectstab")
        setIsOpen(false)
    }
    const handleCalendar = () => {
        dispatch({
            type: "defaultTab",
            payload: 1
        })
        nevigate("/projectstab")
        setIsOpen(false)
    }
    const handleTeams = () => {
        dispatch({
            type: "defaultTab",
            payload: 2
        })
        nevigate("/projectstab")
        setIsOpen(false)
    }
    const handleOutcomes = () => {
        dispatch({
            type: "defaultTab",
            payload: 3
        })
        nevigate("/projectstab")
        setIsOpen(false)
    }

    return (
        <div>
            <Box>
                <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
                    <Stack width={200} spacing={2} mx={2}>
                        <Link className="drawer1" to='/home' onClick={handleClose}>Home</Link>
                        {activeIcon ?
                            <div>
                                <span>{projectName.name}</span>
                                <br /><br />
                                <Link className="drawer" to="/projectstab" onClick={handleAbout} >About</Link><br /><br />
                                <Link className="drawer" to="/projectstab" onClick={handleCalendar} >Calendar</Link><br /><br />
                                <Link className="drawer" to="/projectstab" onClick={handleTeams}>Teams</Link><br /><br />
                                <Link className="drawer" to="/projectstab" onClick={handleOutcomes}>Outcomes</Link><br /><br />
                            </div>
                            : ""}
                        {/* <Link className="drawer" to='/users' onClick={handleClose}>Users</Link>
                <Link className="drawer" to='/roles' onClick={handleClose}>Roles</Link>
                <Link className="drawer" to='/events' onClick={handleClose}>Events</Link>
                <Link className="drawer" to='/about' onClick={handleClose}>About</Link> */}
                    </Stack>
                </Drawer>
            </Box>
        </div>
    )
}