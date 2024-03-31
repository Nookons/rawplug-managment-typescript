import React, {FC, useEffect, useState} from 'react';
import styles from "./AddItem.module.css";
import {
    Autocomplete,
    Backdrop,
    CircularProgress,
    FormControl,
    InputAdornment,
    OutlinedInput,
    TextField
} from "@mui/material";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../firebase";
import {IItem, IItemTemplate} from "../../../types/Item";

interface InputBlockProps {
    onChangeDataEvent: (type: string, value: any) => void;
    formData: any;
}

interface IIndexData {
    indexArray: any[],
    loading: false;
    error: string | null;
}


function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

const InputBlock: FC<InputBlockProps> = ({onChangeDataEvent, formData}) => {
    const [open, setOpen] = React.useState(false);

    const [indexData, setIndexData] = useState<IIndexData>({
        indexArray: [],
        loading: false,
        error: null
    });

    const departmentsIndex = [
        {title: 'PWT10'},
        {title: 'PWT30'},
        {title: 'PWT70'},
        {title: 'MSP'},
    ];

    const statusIndex = [
        {title: 'Available'},
        {title: 'Hold'},
        {title: 'Odzysk'},
    ];

    const loadIndexes = async () => {
        (async () => {
            setIndexData((prevState) => ({...prevState, loading: true}))
            await sleep(250);

            try {
                onSnapshot(doc(db, "departments", "PWT70"), (doc) => {
                    setIndexData((prevState) => ({...prevState, indexArray: doc.data().itemTemplate}));
                });
            } catch (e) {
                setIndexData((prevState) => ({...prevState, loading: false, error: e}))
            } finally {
                setIndexData((prevState) => ({...prevState, loading: false}))
            }
        })();
    }


    useEffect(() => {
        if (!open) {
            setIndexData((prevState) => ({...prevState, indexArray: []}))
        }
    }, [open]);

    return (
        <div className={styles.AutoCompleteWrapper}>
            <div>
                <Autocomplete
                    id="asynchronous-demo"
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                        loadIndexes();
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    getOptionLabel={(option) => option.myIndex}
                    fullWidth={true}
                    options={indexData.indexArray}
                    loading={indexData.loading}
                    loadingText={"#️⃣ loading... "}
                    onChange={(event, value) => onChangeDataEvent('index', value?.myIndex ? value.myIndex : "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Index"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {indexData.loading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                    />
                {/*<Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    value={formData.index}
                    onChange={(event, value) => onChangeDataEvent('index', value)}
                    options={indexData.indexArray.map((option: IItemTemplate) => option.myIndex)}
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
                />*/}
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