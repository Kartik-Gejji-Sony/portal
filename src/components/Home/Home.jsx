import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Home/Home.css';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from "react-redux";
import { NavBar } from "../NavBar";
// import { CreateNewProject } from "../Projects/CreateNewProject";

export const Home = () => {
    const nevigate = useNavigate()
    const dispatch = useDispatch()
    const [projectNames, setProjectNames] = useState([])
    const [loadingProjectNames, setLoadingProjectNames] = useState(false)
    // const [isOpen, setIsOpen] = useState(false)
    const [emptyProjectMsg, setEmptyProjectMsg] = useState(false)
    const user = JSON.parse(localStorage.getItem("okta-token-storage"))

    useEffect(() => {
        getAllProjectNames()
    }, [])

    // const handleCreateNewProject = () => {
    //     setIsOpen(true)
    // }

    const getAllProjectNames = async () => {
        setLoadingProjectNames(true)
        const id = user?.accessToken?.claims?.uid
        const token = user?.accessToken?.accessToken
        // const id = "63cfb2b28635f21bcd3578b2"
        const result = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/projects/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (result.data.length > 0) {
            setLoadingProjectNames(false)
            setProjectNames(result.data)
        } else {
            setLoadingProjectNames(false)
            setEmptyProjectMsg(true)
        }
    }
    const handleProjectDetails = (item) => {
        dispatch({
            type: "activeHomeIcon",
            payload: true
        })
        dispatch({
            type: "projectItem",
            payload: item
        })
        dispatch({
            type: "defaultTab",
            payload: 0
        })
        nevigate("/projectstab")
    }
    // const handleIsOpen = () => {
    //     setIsOpen(false)
    // }
    return (
        <div>
            <NavBar />
            
            <div className="home">
                <h2 style={{ padding: "10px", fontSize: "24px" }}>Welcome {user?.idToken?.claims?.name}</h2>

                <div style={{ marginTop: "20px" }}>
                    {emptyProjectMsg ? "There no projects assigned" : ""}
                </div>
                {loadingProjectNames ? <CircularProgress color="success" /> :
                    projectNames.map((item) => {
                        return (
                            <div style={{ position: 'relative', top: '30px' }} key={item.Id}>
                                <p className="p1" onClick={() => handleProjectDetails(item)} >{item.name}</p>
                            </div>
                        )
                    })
                }

            </div>
            {/* <CreateNewProject isOpen={isOpen} handleIsOpen={handleIsOpen} setIsOpen={setIsOpen} /> */}
            <div style={{position:'relative',top:'80vh'}}>Version 1.0.0.0(Official Build)</div>
        </div>
    )
}