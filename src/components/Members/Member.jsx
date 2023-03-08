import { Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { MembersCalendar } from "./MembersCalendar";
import { MembersDetails } from "./MembersDetails";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useSelector } from "react-redux"
import { NavBar } from "../NavBar";

export const Member = () => {
    const [val, setVal] = useState("membersDetails")
    const memberData = useSelector((state) => state.projectReducers.membersDetails)
    return (
        <>
            <NavBar />
            <div style={{ marginLeft: '10px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <span ><AccountTreeIcon />{memberData.FirstName}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs value={val} onChange={(e, value) => setVal(value)}>
                            <Tab value="membersDetails" label="About" />
                            <Tab value="membersCalendar" label="Calendar" />
                        </Tabs>
                        {val === "membersDetails" && <MembersDetails />}
                        {val === "membersCalendar" && <MembersCalendar />}
                    </Grid>
                </Grid>
            </div>
        </>
    )
}