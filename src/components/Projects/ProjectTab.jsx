import React, { useEffect, useState } from "react";
import { ProjectCalendar } from "./ProjectCalendar";
import { ProjectDetails } from "./ProjectDetails";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../NavBar";
import { Team } from "./Team";
import { OutCome } from "./OutCome";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export const ProjectTab = () => {

    const dispatch = useDispatch()
    const defaultTab = useSelector((state) => state.projectReducers.defaultTab)
    const [val, setVal] = useState(defaultTab)

    useEffect(() => {
        setVal(defaultTab)
    }, [defaultTab])

    useEffect(() => {
        dispatch({
            type: "defaultTab",
            payload: val
        })
    }, [val])
    console.log('val====', val)
    return (
        <>
            <NavBar />

            <Tabs style={{ padding: "10px", paddingLeft: "3px" }} selectedIndex={val} onSelect={(i) => setVal(i)}>
                <TabList>
                    <Tab className="tab" style={{ width: '100px', listStyle: 'none', textAlign: "center" }} value="about">About</Tab>
                    <Tab className="tab" style={{ width: '100px', listStyle: 'none', textAlign: "center" }} value="calendar">Calendar</Tab>
                    <Tab className="tab" style={{ width: '100px', listStyle: 'none', textAlign: "center" }} value="team">Team</Tab>
                    <Tab className="tab" style={{ width: '100px', listStyle: 'none', textAlign: "center" }} value="outcomes">Outcomes</Tab>
                </TabList>
                <TabPanel value="about"><ProjectDetails /></TabPanel>
                <TabPanel value="calendar"><ProjectCalendar /></TabPanel>
                <TabPanel value="team"><Team /></TabPanel>
                <TabPanel value="outcomes"><OutCome /></TabPanel>
            </Tabs>
        </>

    )
}