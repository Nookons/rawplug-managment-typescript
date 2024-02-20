import React, {FC} from 'react';
import styles from "./AddItem.module.css";
import {Autocomplete, FormControl, InputAdornment, OutlinedInput, TextField} from "@mui/material";

interface InputBlockProps {
    handleInputChange: (type: string, value: any) => void;
    ITEM_INDEX: any[];
    formData: any;
}

const InputBlock: FC<InputBlockProps> = ({handleInputChange, ITEM_INDEX, formData}) => {

    const departmentsIndex = [
        { title: 'PWT10' },
        { title: 'PWT30' },
        { title: 'PWT70' },
        { title: 'MSP' },
    ];

    const statusIndex = [
        { title: 'Available' },
        { title: 'Hold' },
        { title: 'Odzysk' },
    ];

    return (
        <div className={styles.AutoCompleteWrapper}>
            <div>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    onChange={(event, value) => handleInputChange('index', value, event)}
                    options={ITEM_INDEX.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Index"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                            required={true}
                        />
                    )}
                />
            </div>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                value={formData.FromDepartment}
                onChange={(event, value) => handleInputChange('FromDepartment', value)}
                options={departmentsIndex.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='From'
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                value={formData.ToDepartment}
                onChange={(event, value) => handleInputChange('ToDepartment', value)}
                options={departmentsIndex.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="To"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                value={formData.status}
                onChange={(event, value) => handleInputChange('status', value)}
                options={statusIndex.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Status"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <FormControl variant="outlined">
                <OutlinedInput
                    required={true}
                    id="outlined-adornment-weight"
                    type={'Number'}
                    value={formData.quantity}
                    onChange={(event) => handleInputChange('quantity', Number(event.target.value))}
                    endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'Quantity',
                    }}
                />
            </FormControl>
        </div>
    );
};

export default InputBlock;