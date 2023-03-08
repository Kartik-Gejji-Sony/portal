import React from "react"
import { Button, Drawer, Grid, Stack } from "@mui/material";

export const AddMemberstoProject = ({ isOpen, handleIsOpen }) => {
    return (
        <div>
            <Drawer anchor="right" open={isOpen} onClose={handleIsOpen}>
                <Stack width={300} spacing={2} mx={2} style={{ position: 'relative', right: '10px', top: '10px' }}>
                    <h4 style={{ textAlign: 'center' }}>Add Member To Project</h4>
                    <Grid container spacing={2}>
                        <Grid item></Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" >Add</Button>
                        </Grid>
                        <Grid item xs={4}></Grid>

                    </Grid>
                </Stack>
            </Drawer>
        </div>
    )
}