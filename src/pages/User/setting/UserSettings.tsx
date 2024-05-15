import React, {useState} from 'react';
import {Container, Grid, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/storeHooks";
import FirstVisit from "./FirstVisit";

const UserSettings = () => {
    const {user, loading, error} = useAppSelector(state => state.user)
    const [isFirstTime, setIsFirstTime] = useState(false);

    if (isFirstTime) {
        return (
            <FirstVisit />
        )
    }

    return (
        <Container sx={{minHeight: 'calc(100dvh - 162px)', p: 2}} maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{p: 2}}>
                        Email: {user?.email} <br/>
                        {user?.uid}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{p: 2}}>
                        avatar
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserSettings;