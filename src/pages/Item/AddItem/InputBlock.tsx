import React, {FC} from 'react';
import styles from "./AddItem.module.css";
import {Autocomplete, FormControl, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import data from '../../../assets/ItemsInfo.json'
import {ICardItem, IItem} from "../../../types/Item";

interface InputBlockProps {
    onChangeDataEvent: (type: string, value: any) => void;
    formData: any;
}

const InputBlock: FC<InputBlockProps> = ({onChangeDataEvent, formData}) => {

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
                    value={formData.index}
                    onChange={(event, value) => onChangeDataEvent('index', value)}
                    options={data.map((option: ICardItem) => option.myIndex)}
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
                value={formData.fromDepartment}
                onChange={(event, value) => onChangeDataEvent('fromDepartment', value)}
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
                value={formData.toDepartment}
                onChange={(event, value) => onChangeDataEvent('toDepartment', value)}
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
                onChange={(event, value) => onChangeDataEvent('status', value)}
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
                    onChange={(event) => onChangeDataEvent('quantity', Number(event.target.value))}
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