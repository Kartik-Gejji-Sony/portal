import React from "react";
// import axios from "axios"
import { Grid } from '@mui/material'
// import { useNavigate } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';
import "./ProjectNames.css"
import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux"
// import { AddMemberstoProject } from "../Members/AddMemberstoProject";

export const ProjectDetails = () => {
    const projectdetails = useSelector((state) => state.projectReducers.projectDetails)
    // console.log(projectdetails)
    // const user = JSON.parse(localStorage.getItem("okta-token-storage"))
    // const [membersData, setMembersData] = useState([])
    // const [loadingMembersData, setLoadingMembersData] = useState(false)
    // const [isOpen, setIsOpen] = useState(false)
    // const [emptyMemberMsg, setEmptyMemberMsg] = useState(false)

    // const dispatch = useDispatch()
    // const Navigate = useNavigate()

    // useEffect(() => {
    //     getMembers()
    // }, [])

    // const getMembers = async () => {
    //     const token = user?.accessToken?.accessToken
    //     // setLoadingMembersData(true)
    //     const id = projectdetails.Id
    //     const result = await axios.get(`${process.env.REACT_APP_VIS_SERVICE_URL}/users/${id}`, {
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     })
    //     if (result.data.length > 0) {
    //         setLoadingMembersData(false)
    //         setMembersData(result.data)
    //     } else {
    //         setLoadingMembersData(false)
    //         setEmptyMemberMsg(true)
    //     }
    // }

    // const handleMembersDetails = (item) => {
    //     console.log(user.idToken.claims.sub)
    //     const id = user.idToken.claims.sub
    //     if (item.userId === id) {
    //         dispatch({
    //             type: "membersDetails",
    //             payload: item
    //         })
    //         Navigate('/members')
    //     }
    // }
    // const handleAddMemberstoProject = () => {
    //     setIsOpen(true)
    // }

    // const handleIsOpen = () => {
    //     setIsOpen(false)
    // }
    const dateString = projectdetails.start_date;
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const startDate = date.toLocaleDateString('en-US', options);

    const dateString1 = projectdetails.end_date;
    const date1 = new Date(dateString1);
    const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    const endDate = date1.toLocaleDateString('en-US', options1);
    return (
        <div>

            <div style={{ position: "relative", top: '5px' }}>
                <Grid container spacing={0.5}>
                    <Grid item xs={3.5} sm={2} md={1.5}>Project Code</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{projectdetails.code}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>Project Status</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{projectdetails.status}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>Project Owner</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{projectdetails.project_owner}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>SLA Owner</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{projectdetails.sla_owner}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>Start Date</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{startDate}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>End Date</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{endDate}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>Approved HC</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{projectdetails.approved_hc}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>SLA ID</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{projectdetails.sla_id_mapped}</Grid>

                    <Grid item xs={3.5} sm={2} md={1.5}>Serial_no</Grid>
                    <Grid item xs={8.5} sm={9.5} md={10.5}>{projectdetails.serial_no}</Grid>

                    <Grid item xs={12}>
                        {/* <h3 style={{ padding: '10px' }}>Members</h3> */}
                    </Grid>
                    <Grid item xs={0.5}></Grid>
                    <Grid item xs={11.5}>
                        {/* {emptyMemberMsg ? "There no members assigned for this projects" : ""}
                        {loadingMembersData ? <CircularProgress color="success" /> :
                            membersData.map((item) => {
                                return (
                                    <div style={{ padding: '3px', position: "relative", bottom: '15px' }} key={item.Id}>
                                        <p className="membersName" onClick={() => handleMembersDetails(item)}> {item.FirstName}({item.gid})</p>
                                    </div>
                                )
                            })} */}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}