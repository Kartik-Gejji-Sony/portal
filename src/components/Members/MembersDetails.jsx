import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux"


export const MembersDetails = () => {
    const memberData = useSelector((state) => state.projectReducers.membersDetails)

    return (
        <div style={{position:'relative',top:'5px'}}>
            <Grid container spacing={1}>
                <Grid item xs={0.5} sm={0.5} md={0.5}></Grid>
                <Grid item xs={3} sm={2.5} md={1.5}>GID</Grid>
                <Grid item xs={8.5} sm={9} md={10}>{memberData.gid}</Grid>

                <Grid item xs={0.5} sm={0.5} md={0.5}></Grid>
                <Grid item xs={3} sm={2.5} md={1.5}>First_Name</Grid>
                <Grid item xs={8.5} sm={9} md={10}>{memberData.FirstName}</Grid>

                <Grid item xs={0.5} sm={0.5} md={0.5}></Grid>
                <Grid item xs={3} sm={2.5} md={1.5}>Last_Name</Grid>
                <Grid item xs={8.5} sm={9} md={10}>{memberData.LastName}</Grid>

                <Grid item xs={0.5} sm={0.5} md={0.5}></Grid>
                <Grid item xs={3} sm={2.5} md={1.5}>Date_Of_Joining</Grid>
                <Grid item xs={8.5} sm={9} md={10}>{memberData.date_of_joining}</Grid>

                <Grid item xs={0.5} sm={0.5} md={0.5}></Grid>
                <Grid item xs={3} sm={2.5} md={1.5}>Email</Grid>
                <Grid item xs={8.5} sm={9} md={10}>{memberData.Email}</Grid>

                <Grid item xs={0.5} sm={0.5} md={0.5}></Grid>
                <Grid item xs={3} sm={2.5} md={1.5}>Github_UserName</Grid>
                <Grid item xs={8.5} sm={9} md={10}>{memberData.github_username}</Grid>

                <Grid item xs={0.5} sm={0.5} md={0.5}></Grid>
                <Grid item xs={3} sm={2.5} md={1.5}>Mobile_Number</Grid>
                <Grid item xs={8.5} sm={9} md={10}>{memberData.MobilePhone}</Grid>
            </Grid>

        </div>
    )
}