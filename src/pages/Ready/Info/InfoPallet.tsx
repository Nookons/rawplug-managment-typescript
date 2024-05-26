import React, {useEffect, useState} from 'react';
import {IPalletItem} from "../../../types/Pallet";
import {
    Avatar,
    Box, Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,
    Typography
} from "@mui/material";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import {db} from "../../../firebase";

const InfoPallet = () => {
    const index = window.location.href.split("_")[1].replace("\\", "/")

    const [data, setData] = useState<IPalletItem | null>(null);

    useEffect(() => {
        const q = query(collection(db, "palletsTemplate"), where("index", "==", index));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setData(doc.data() as IPalletItem)
            });
        });
    }, [index]);

    if (data) {

        return (
            <Container sx={{p: 2, minHeight: 'calc(100dvh - 162px)'}} maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Avatar
                            src={data.imgUrl}
                            variant={"rounded"}
                            sx={{width: "100%", height: "100%", minHeight: "300px"}}>
                            {index}
                        </Avatar>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Stack
                            my={2}
                            sx={{alignItems: "center"}}
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem/>}
                            spacing={2}
                        >
                            <Typography sx={{whiteSpace: "nowrap"}} variant="h5" gutterBottom component="h5">
                                {data.index}
                            </Typography>
                            <p>{data.data}</p>
                        </Stack>

                        <Typography variant="subtitle1" gutterBottom component="div">
                            <p>{data.description}</p>
                        </Typography>

                        <Stack
                            my={3}
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem/>}
                            spacing={2}
                        >
                            <Chip label={<p>On Pallet: {data.palletQta}</p>} variant="outlined"/>
                            <Chip label={<p>In Box: {data.atBox}</p>} variant="outlined"/>
                        </Stack>


                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><p>Index</p></TableCell>
                                        <TableCell><p>Type</p></TableCell>
                                        <TableCell><p>Quantity</p></TableCell>
                                        <TableCell><p>Box</p></TableCell>
                                        <TableCell><p>Pallet</p></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.needItem.map((el, index) => {
                                        const pallet = el.quantity * data?.atBox * data?.palletQta
                                        return (
                                            <TableRow key={index}>
                                                <TableCell><p style={{whiteSpace: "nowrap"}}>{el.index}</p></TableCell>
                                                <TableCell><p>{el.type}</p></TableCell>
                                                <TableCell><p>{el.quantity}</p></TableCell>
                                                <TableCell><p>{el.quantity * data?.atBox}</p></TableCell>
                                                <TableCell><p>{pallet.toLocaleString()}</p></TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </Grid>
                </Grid>
            </Container>
        )
    }

    return (
        <Container sx={{p: 2, minHeight: 'calc(100dvh - 162px)'}} maxWidth="md">
            <Skeleton variant="rectangular" width={"100%"} height={"calc(100dvh - 192px)"}/>
        </Container>
    )
};

export default InfoPallet;