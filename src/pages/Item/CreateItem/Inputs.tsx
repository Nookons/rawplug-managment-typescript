import React, {FC} from 'react';
import styles from "./CreateItem.module.css";
import {Autocomplete, InputAdornment, TextField} from "@mui/material";

interface InputsProps {
    inputData: any;
    setInputData: () => void;
}

const Inputs: FC<InputsProps> = ({inputData, setInputData}) => {
    return (
        <>
            <div className={styles.InputWrapper}>
                <div className={styles.div1}>
                    <TextField
                        onChange={(event) => setInputData((prevState) => ({...prevState, index: event.target.value}))}
                        fullWidth={true}
                        id="outlined-basic"
                        label="Index"
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">{inputData.type}</InputAdornment>,
                        }}
                    />
                </div>
                <div className={styles.div2}>
                    <Autocomplete
                        disablePortal
                        options={[
                            "Nozzle",
                            "Carton",
                            "Cartridge",
                            "Piston",
                            "White",
                            "Chemical",
                            "Barrel",
                            "Zywica",
                            "Folia",
                            "Barwnik",
                            "Etykieta",
                        ]}
                        onChange={(event, value) => setInputData((prevState) => ({...prevState, type: value}))}
                        fullWidth={true}
                        renderInput={(params) => <TextField {...params} label="⬅️ Type"/>}
                    />
                </div>
                <div className={styles.div3}>
                    <TextField
                        fullWidth={true}
                        id="outlined-basic"
                        label="Template description"
                        variant="outlined"
                        type={"text"}
                        multiline={true}
                        onChange={(event) => setInputData((prevState) => ({...prevState, description: event.target.value}))}
                    />
                </div>
                <div className={styles.div4}>
                    <TextField
                        fullWidth={true}
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        type={"number"}
                        onChange={(event) => setInputData((prevState) => ({...prevState, quantity: event.target.value}))}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">{inputData.jm}</InputAdornment>,
                        }}
                    />
                </div>
                <div className={styles.div5}>
                    <Autocomplete
                        disablePortal
                        options={[
                            "Pieces", "kg"
                        ]}
                        onChange={(event, value) => setInputData((prevState) => ({...prevState, jm: value}))}
                        fullWidth={true}
                        renderInput={(params) => <TextField {...params} label="⬅️ Type"/>}
                    />
                </div>
            </div>
        </>
    );
};

export default Inputs;