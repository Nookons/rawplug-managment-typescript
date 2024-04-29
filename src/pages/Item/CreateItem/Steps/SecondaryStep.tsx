import React, {FC} from 'react';
import {Autocomplete, Box, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {IItemTemplate} from "../../../../types/Item";

interface FirstStepProps {
    data: IItemTemplate;
    setData: (value: string) => void;
}

const SecondaryStep: FC<FirstStepProps> = ({data, setData}) => {

    const onQuantityChange = (value: number) => {
        console.log(value);
        setData((prevState) => ({...prevState, palletQta: Number(value)}))
    }

    const onJmChange = (value: string) => {
        setData((prevState) => ({...prevState, jm: value}))
    }

    return (
        <Box sx={{display: "flex", gap: 1, flexDirection: "column", my: 2}}>
            <Autocomplete
                disablePortal
                value={data.jm}
                onChange={(event, value) => onJmChange(value)}
                options={["Pieces", "kg"]}
                renderInput={(params) => <TextField {...params} label="Jm"/>}
            />
            <OutlinedInput
                fullWidth={true}
                type={"Number"}
                id="outlined-adornment-weight"
                startAdornment={<InputAdornment position="start">{data.jm}</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                value={data.palletQta}
                onChange={(event) => onQuantityChange(event.target.value)}
                inputProps={{
                    'aria-label': 'Pallet quantity',
                }}
            />
        </Box>
    );
};

export default SecondaryStep;