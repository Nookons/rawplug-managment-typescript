import React, {useState} from 'react';
import {
    Box, Button,
    Container,
    Divider,
    Grid,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {useAppSelector} from "../../../hooks/storeHooks";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";

const FirstVisit = () => {
    const {user, loading, error} = useAppSelector(state => state.user)
    const [alignment, setAlignment] = React.useState<string | null>('eng');

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: ""
    });


    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    const sendData = async () => {
        if (user) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    ...userData
                });
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Container sx={{minHeight: 'calc(100dvh - 162px)', p: 2}} maxWidth="md">
            <ToggleButtonGroup
                value={alignment}
                sx={{my: 2}}
                exclusive
                fullWidth={true}
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                <ToggleButton value="ua" aria-label="left aligned">
                    ua
                </ToggleButton>
                <ToggleButton value="eng" aria-label="centered">
                    eng
                </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    {alignment === "eng"
                        ? <Typography variant="h5" gutterBottom component="h4">
                            Dear {user?.email}
                        </Typography>
                        :
                        <Typography variant="h5" gutterBottom component="h4">
                            Дорогой {user?.email}
                        </Typography>
                    }
                    {alignment === "eng"
                        ? <Typography variant="subtitle1" gutterBottom component="div">
                            Welcome to our company! We are here to assist you with setting up your profile.
                            Please provide the requested information in the space provided below.
                        </Typography>
                        :
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Ласкаво просимо до нашої компанії! Ми тут, щоб допомогти вам з налаштуванням вашого профілю.
                            Будь ласка, надайте запитувану інформацію у відведеному нижче місці.
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12} md={12}>
                    {alignment === "eng"
                        ?
                        <>
                            <Stack
                                my={1}
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem/>}
                                spacing={2}
                            >
                                <TextField
                                    id="outlined-basic"
                                    fullWidth={true}
                                    value={userData.firstName}
                                    onChange={(event) => setUserData((prev) => ({...prev, firstName: event.target.value}))}
                                    label="First Name"
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-basic"
                                    fullWidth={true}
                                    value={userData.lastName}
                                    onChange={(event) => setUserData((prev) => ({...prev, lastName: event.target.value}))}
                                    label="Last Name"
                                    variant="outlined"
                                />
                            </Stack>
                            <Button onClick={sendData} sx={{my: 2}} fullWidth={true} variant={"contained"}>Save</Button>
                        </>
                        :
                        <>
                            <Stack
                                my={1}
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem/>}
                                spacing={2}
                            >
                                <TextField
                                    id="outlined-basic"
                                    fullWidth={true}
                                    value={userData.firstName}
                                    onChange={(event) => setUserData((prev) => ({...prev, firstName: event.target.value}))}
                                    label="Ім'я"
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-basic"
                                    fullWidth={true}
                                    value={userData.lastName}
                                    onChange={(event) => setUserData((prev) => ({...prev, lastName: event.target.value}))}
                                    label="Прізвище"
                                    variant="outlined"
                                />
                            </Stack>
                            <Button onClick={sendData} sx={{my: 2}} fullWidth={true} variant={"contained"}>Зберегти</Button>
                        </>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default FirstVisit;