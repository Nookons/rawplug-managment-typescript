import React, {FC, useEffect, useState} from 'react';
import {Button, Grid, Paper, TextField} from "@mui/material";

interface BatchItemProps {
    setBatchItems: () => void;
    remain: number;
    addValue: number;
}

const BatchItem: FC<BatchItemProps> = ({setBatchItems, remain, addValue}) => {
    const [isSave, setIsSave] = useState(false);

    const [data, setData] = useState({
        barrelNumber: 0,
        boxes: 0,
    });

    const [isBarrelError, setIsBarrelError] = useState(false);

    const onSaveClick = () => {
        try {
            setIsBarrelError(false)

            if (data.barrelNumber.toString().length !== 7) {
                setIsBarrelError(true)
                throw new Error("Not correct barrel number")
            }
            setIsSave(true)
            setBatchItems((prev) => [...prev, data])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (data.boxes > remain) {
            setData((prev) => ({...prev, boxes: remain}))
        }
    }, [data.boxes, addValue]);


    if (isSave) {
        return (
            <Grid sx={{my: 1, alignItems: "center"}} container spacing={2}>
                <Grid item xs={6} md={6}>
                    <Paper sx={{p: 2}}>
                        <article>Barrel: {data.barrelNumber}</article>
                    </Paper>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Paper sx={{p: 2}}>
                        <article>Box count:{data.boxes}</article>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid sx={{my: 1, alignItems: "center"}} container spacing={2}>
            <Grid item xs={6} md={5}>
                <Paper sx={{p: 2}}>
                    <TextField
                        value={data.barrelNumber}
                        error={isBarrelError}
                        onChange={(event) => setData((prev) => ({...prev, barrelNumber: Number(event.target.value)}))}
                        fullWidth={true}
                        type={"Number"}
                        id="outlined-basic"
                        label="Barrel number"
                        variant="outlined"
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} md={5}>
                <Paper sx={{p: 2}}>
                    <TextField
                        value={data.boxes}
                        onChange={(event) => setData((prev) => ({...prev, boxes: Number(event.target.value)}))}
                        id="outlined-basic"
                        label="Boxes"
                        variant="outlined"
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button onClick={onSaveClick} fullWidth={true} variant="contained" sx={{my: 2}}>
                    Save
                </Button>
            </Grid>
        </Grid>
    );
};

export default BatchItem;