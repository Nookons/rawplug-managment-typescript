import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {Autocomplete, Avatar, Container, Grid, Paper, Stack, TextField} from "@mui/material";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { IPalletItem } from "../../../types/Pallet";
import { Link } from "react-router-dom";
import {INFO_FULL_ITEM_ROUTE} from "../../../utils/consts";

const InfoPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [palletTemplates, setPalletTemplates] = useState<IPalletItem[]>([]);

    useEffect(() => {
        const q = query(collection(db, "palletsTemplate"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const templates: IPalletItem[] = querySnapshot.docs.map(doc => doc.data() as IPalletItem);
            setPalletTemplates(templates);
        });

        return () => unsubscribe(); // Cleanup the subscription on unmount
    }, []);

    const onInput = (value: string | null) => {
        if (value) {
            const newString = value.toUpperCase().replace(" ", "-");
            setSearchValue(newString);
        } else {
            setSearchValue("");
        }
    };

    const filtered = useMemo(() => {
        return searchValue
            ? palletTemplates.filter((item) =>
                item.index.toLowerCase().includes(searchValue.toLowerCase())
            )
            : palletTemplates;
    }, [searchValue, palletTemplates]);

    return (
        <Container sx={{ p: 2, minHeight: 'calc(100vh - 162px)' }} maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        disablePortal
                        inputValue={searchValue}
                        onInputChange={(event, value) => onInput(value)}
                        options={palletTemplates.map(el => el.index)}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Search" />}
                    />
                </Grid>
                {filtered.map((el, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper sx={{ p: 1 }}>
                            <Stack my={1} spacing={1}>
                                <Avatar>N</Avatar>
                                <Link style={{ fontSize: 22 }} to={INFO_FULL_ITEM_ROUTE + "?_" + el.index.replace("/", "\\")}>
                                    {el.index}
                                </Link>
                                <p style={{ color: "gray", fontSize: 12 }}>{el.description} | {el.data}</p>
                                <p>On pallet: {el.palletQta}</p>
                                <p>In box: {el.atBox}</p>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InfoPage;
