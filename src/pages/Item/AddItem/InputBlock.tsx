import React, { FC, useEffect, useState } from 'react';
import styles from "./AddItem.module.css";
import {
    Alert,
    Autocomplete,
    CircularProgress,
    FormControl,
    InputAdornment,
    OutlinedInput,
    TextField
} from "@mui/material";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { IItem, IItemTemplate } from "../../../types/Item";

interface InputBlockProps {
    onChangeDataEvent: (type: string, value: any) => void;
    formData: any;
}

interface IIndexData {
    indexArray: any[];
    loading: boolean;
    error: string | null;
}

const InputBlock: FC<InputBlockProps> = ({ onChangeDataEvent, formData }) => {
    const [open, setOpen] = useState(false);
    const [indexData, setIndexData] = useState<IIndexData>({ indexArray: [], loading: false, error: null });

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

    useEffect(() => {
        const loadIndexes = async () => {
            setIndexData((prevState) => ({ ...prevState, loading: true }));
            try {
                const q = query(collection(db, "itemsTemplate"));
                const querySnapshot = await getDocs(q);
                const tempArray = querySnapshot.docs.map(doc => doc.data());
                setIndexData({ indexArray: tempArray, loading: false, error: null });
            } catch (error) {
                setIndexData({ indexArray: [], loading: false, error: error.message });
            }
        };

        if (open) {
            loadIndexes();
        }
    }, [open]);

    const renderAutocomplete = (label: string, value: string, options: any[], onChange: (value: string) => void) => (
        <Autocomplete
            freeSolo
            disableClearable
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            options={options.map(option => option.title)}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                />
            )}
        />
    );

    return (
        <div className={styles.AutoCompleteWrapper}>
            <div>
                {indexData.error && <Alert severity="error">{indexData.error}</Alert>}
                <Autocomplete
                    id="asynchronous-demo"
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    getOptionLabel={(option) => option.index || ""}
                    fullWidth
                    options={indexData.indexArray}
                    loading={indexData.loading}
                    loadingText="🔄 Loading..."
                    onChange={(event, value) => onChangeDataEvent('index', value?.index || "")}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Index"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {indexData.loading && <CircularProgress color="inherit" size={20} />}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </div>

            {renderAutocomplete('From', formData.fromDepartment, departmentsIndex, value => onChangeDataEvent('fromDepartment', value))}
            {renderAutocomplete('To', formData.toDepartment, departmentsIndex, value => onChangeDataEvent('toDepartment', value))}
            {renderAutocomplete('Status', formData.status, statusIndex, value => onChangeDataEvent('status', value))}

            <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                    required
                    id="outlined-adornment-quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(event) => onChangeDataEvent('quantity', Number(event.target.value))}
                    endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                    inputProps={{ 'aria-label': 'Quantity' }}
                />
            </FormControl>
        </div>
    );
};

export default InputBlock;
