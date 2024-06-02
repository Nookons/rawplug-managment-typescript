import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button, Checkbox,
    Container,
    Divider, FormControlLabel, FormGroup,
    Grid,
    Paper, Slider, Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {useAppSelector} from "../../../hooks/storeHooks";
import {doc, onSnapshot} from "firebase/firestore";

import DiamondIcon from '@mui/icons-material/Diamond';
import {db} from "../../../firebase";
import ChangePassword from "./ChangePassword/ChangePassword";
import {useNavigate} from "react-router-dom";
import {SIGN_IN_ROUTE} from "../../../utils/consts";
import UserAvatar from "./Avatar/Avatar";

function roleReducer(role: string) {
    switch (role) {
        case "machine":
            return "Робітник на машині"
        case "mixer":
            return "Робітник на мішальні"
        case "forklift":
            return "Водій вилочного навантажувача"
        case "leader":
            return "Лідер"
        default :
            return ''
    }
}

const UserSettings = () => {
    const {user, loading, error} = useAppSelector(state => state.user)

    const [loadedData, setLoadedData] = useState({});

    useEffect(() => {
        if (user) {
            const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
                console.log("Current data: ", doc.data());
                setLoadedData(doc.data())
            });
        }
    }, [user]);




    const experience = loadedData.experience !== undefined ? loadedData.experience : 0;
    const nextLevel = loadedData.nextLevel !== undefined ? loadedData.nextLevel : 0;

    return (
        <Container sx={{minHeight: 'calc(100dvh - 162px)', p: 2}} maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <UserAvatar />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper sx={{p: 2, mb: 2}}>
                        <Typography variant="h6" gutterBottom component="h5">
                            Your level is ( {loadedData?.level} )
                        </Typography>

                        <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                            <DiamondIcon/>
                            <Slider
                                max={nextLevel}
                                disabled={true}
                                aria-label="Volume"
                                value={experience}
                            />
                            <p style={{whiteSpace: "nowrap"}}> {nextLevel.toLocaleString()} </p>
                        </Stack>

                        <p>Ви отримуєте певний досвід за будь-яку дію в програмі, і це підвищує ваш рівень тут</p>
                    </Paper>

                    <Paper sx={{p: 2}}>
                        <span style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: 8
                        }}>
                            {roleReducer(loadedData?.role)}
                        </span>

                        <Typography sx={{my: 2}} variant="h5" gutterBottom component="h5">
                            Це сторінка вашого профілю {user?.email}
                        </Typography>


                        <ChangePassword />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserSettings;