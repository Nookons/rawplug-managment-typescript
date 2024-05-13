import React, {FC} from 'react';
import {Grid, Slider, TextField} from "@mui/material";
import {IAddPalletTemplate} from "../AddTemplate";

interface IInputBlock {
    inputData: IAddPalletTemplate;
    setInputData: (value: IAddPalletTemplate) => void;
    indexWriting: (value: string) => void
}

const atBoxMarks = [
    {
        value: 56,
        label: <p>Nap-01</p> ,
    },
    {
        value: 84,
        label: <p>Nap-02/03</p> ,
    },
];

const InputBlock:FC <IInputBlock> = ({inputData, setInputData, indexWriting}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <TextField
                    value={inputData.index}
                    onChange={(event) => indexWriting(event.target.value)}
                    fullWidth={true}
                    id="outlined-basic"
                    label="New Index"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField type={"file"} fullWidth={true} id="outlined-basic" variant="outlined"/>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    fullWidth={true}
                    value={inputData.description}
                    onChange={(event) => setInputData((prev) => ({...prev, description: event.target.value}))}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <h5>At pallet: {inputData.palletQta} pcs</h5>
                <Slider
                    value={inputData.palletQta}
                    onChange={(event, value) => setInputData((prev) => ({...prev, palletQta: Number(value)}))}
                    step={2}
                    max={84}
                    marks={atBoxMarks}
                    aria-label="Slider"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <h5>At box: {inputData.atBox} pcs</h5>
                <Slider
                    value={inputData.atBox}
                    onChange={(event, value) => setInputData((prev) => ({...prev, atBox: Number(value)}))}
                    step={1}
                    max={12}
                    marks
                    aria-label="Slider"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <h5>Capacity: {inputData.capacity} ml</h5>
                <Slider
                    valueLabelDisplay="auto"
                    value={inputData.capacity}
                    onChange={(event, value) => setInputData((prev) => ({...prev, capacity: Number(value)}))}
                    step={5}
                    max={600}
                    aria-label="Slider"
                />
            </Grid>
        </Grid>
    );
};

export default InputBlock;