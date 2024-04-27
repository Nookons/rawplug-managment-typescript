import React, {FC} from 'react';
import {Autocomplete, Box, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {IItemTemplate} from "../../../../types/Item";

interface FirstStepProps {
    data: IItemTemplate;
    setData: (value: string) => void;
}

const ThirdStep: FC<FirstStepProps> = ({data, setData}) => {

    const onDescriptionChange = (value: string) => {
        setData((prevState) => ({...prevState, description: value}))
    }

    return (
        <Box sx={{display: "flex", gap: 1, flexDirection: "column", my: 2}}>
            <TextField
                id="outlined-basic"
                label={<p>Опис нової палети</p>}
                variant="outlined"
                fullWidth={true}
                value={data.description}
                multiline={true}
                onChange={(event) => onDescriptionChange(event.target.value)}
            />
        </Box>
    );
};

export default ThirdStep;