import React, {FC, useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Divider, Grid, Paper, Slider, Stack, TextField, Typography} from "@mui/material";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../../firebase";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {INeedItemTemplate} from "../AddTemplate";

interface INeedItem {
    needItemArray: INeedItemTemplate[];
    setNeedItemArray: (data: INeedItemTemplate) => void
}

const NeedItem:FC<INeedItem> = ({needItemArray, setNeedItemArray}) => {
    const [dataTemplates, setDataTemplates] = useState<any[]>([]);

    const [inputData, setInputData] = useState({
        index: "",
        type: "",
        description: "",
        quantity: 0,
    });

    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        const foundItem = dataTemplates.find(item => item.myIndex === inputData.index)

        if (foundItem) {
            setInputData((prev) => ({
                ...prev,
                type: foundItem.type,
                description: foundItem.description,
            }))
        }
    }, [inputData.index]);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "PWT70", "templates");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDataTemplates(docSnap.data().templates)
            } else {
                console.log("No such document!");
            }
        };

        fetchData();
    }, []);

    const onSave = () => {
        try {
            setIsSaved(true);
            setNeedItemArray(prev => [...prev, inputData]); // Ensure setNeedItemArray expects an updater function
        } catch (error) {
            console.log(error);
        }
    };
    const onUnlock = () => {
        try {
            setIsSaved(false);
            const filtered = needItemArray.filter(item => item.index !== inputData.index)
            setNeedItemArray(filtered)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Grid item xs={12} md={6}>
            {!isSaved
            ?
                <Paper sx={{p: 2}}>
                    <Stack
                        my={1}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={1}
                    >
                        <Autocomplete
                            disablePortal
                            fullWidth={true}
                            value={inputData.index}
                            onChange={(event, value) => setInputData((prev) => ({...prev, index: value}))}
                            options={dataTemplates.map(el => el.myIndex)}
                            renderInput={(params) => <TextField {...params} label="Index"/>}
                        />
                        <TextField
                            type={"Number"}
                            id="outlined-basic"
                            value={inputData.quantity}
                            onChange={(event) => setInputData((prev) => ({...prev, quantity: Number(event.target.value)}))}
                            label="Quantity"
                            variant="outlined"
                        />
                    </Stack>
                    <Stack
                        mt={2}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={1}
                    >
                        <Box sx={{p: 0.5}}>{inputData.type}</Box>
                        <Box sx={{p: 0.5}}>{inputData.description}</Box>
                    </Stack>
                    <Button onClick={onSave} fullWidth={true} variant="contained" sx={{mt: 2}}>
                        Save
                    </Button>
                </Paper>
            :
                <Paper sx={{p: 2}}>
                    <Stack
                        my={1}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={1}
                    >
                        <Typography variant="h6" gutterBottom component="h5">
                            {inputData.index}
                        </Typography>
                        <Typography variant="h6" gutterBottom component="h5">
                            {inputData.quantity} pcs
                        </Typography>
                    </Stack>
                    <Stack
                        mt={2}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={1}
                    >
                        <Box sx={{p: 0.5}}>{inputData.type}</Box>
                        <Box sx={{p: 0.5}}>{inputData.description}</Box>
                    </Stack>
                    <Button onClick={onUnlock} variant="contained" sx={{mt: 2}}>
                        <LockOpenIcon />
                    </Button>
                </Paper>
            }
        </Grid>
    );
};

export default NeedItem;