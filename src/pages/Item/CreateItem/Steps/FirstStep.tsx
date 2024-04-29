import React, {FC} from 'react';
import {Autocomplete, Box, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {IItemTemplate} from "../../../../types/Item";

interface FirstStepProps {
    data: IItemTemplate;
    setData: (value: string) => void;
}

const FirstStep: FC<FirstStepProps> = ({data, setData}) => {

    const onIndexChange = (value: string) => {
        const split = value.split(" ")
        const join = split.join("-")

        setData((prevState) => ({...prevState, myIndex: join.toUpperCase()}))
    }

    const onTypeChange = (value: string) => {
        setData((prevState) => ({...prevState, type: value}))
    }

    return (
        <Box sx={{display: "flex", gap: 1, flexDirection: "column", my: 2}}>
            <Autocomplete
                disablePortal
                value={data.type}
                onChange={(event, value) => onTypeChange(value)}
                options={["Nozzle", "Carton", "Cartridge", "Piston", "White", "Chemical", "Barrel", "Zywica", "Folia", "Barwnik", "Etykieta"]}
                renderInput={(params) => <TextField {...params} label="Type"/>}
            />
            <OutlinedInput
                fullWidth={true}
                id="outlined-adornment-weight"
                startAdornment={<InputAdornment position="start">{data.type}</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                value={data.myIndex}
                onChange={(event) => onIndexChange(event.target.value)}
                placeholder={"Будь ласка, вкажіть новий індекс"}
                inputProps={{
                    'aria-label': 'Index',
                }}
            />
        </Box>
    );
};

export default FirstStep;