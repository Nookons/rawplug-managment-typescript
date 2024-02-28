import React, {useEffect, useState} from 'react';
import styles from './AddItem.module.css'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import MyButton from "../../../components/MyButton/MyButton";
import data from '../../../assets/ItemsInfo.json'
import {ICardItem, IItem} from "../../../types/Item";
import InputBlock from "./InputBlock";
import {onAddItem} from "../../../utils/AddItem";
import {addItem} from "../../../store/reducers/item/itemsSlice";
import MyLoader from "../../../components/Loader/MyLoader";
import {HOME_ROUTE} from "../../../utils/consts";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {Alert, Button, Checkbox, IconButton, InputAdornment, OutlinedInput, Snackbar, TextField} from "@mui/material";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import MyButtonLoader from "../../../components/MyButtonLoader/MyButtonLoader";
import CloseIcon from '@mui/icons-material/Close';

export interface IFormData {
    index: string,
    type: string,
    description: string,
    FromDepartment: string,
    JM: string,
    ToDepartment: string,
    quantity: number,
    status: string,
    batchNumber?: number,
}

const AddItem = () => {
    const user = useAppSelector(state => state.user.user)
    const {items, loading} = useAppSelector(state => state.items)

    const dispatch = useAppDispatch();

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<string>('');


    const [batchArray, setBatchArray] = useState<number[]>([]);
    const [maxBatch, setMaxBatch] = useState<number>(0);


    const [isBarrel, setIsBarrel] = useState<boolean>(false);
    const [isWeight, setIsWeight] = useState<boolean>(false);

    const [isLoader, setIsLoader] = useState<boolean>(false);

    const [barrelData, setBarrelData] = useState({
        first: 0,
        secondary: 0,
        third: 0,
        four: 0
    });

    useEffect(() => {
        items.map((element: IItem) => {
            if (element.type.toLowerCase() === 'barrel') {
                setBatchArray(prevState => [...prevState, Number(element.batchNumber)])
            }
        })
    }, [items]);


    const [formData, setFormData] = useState<IFormData>({
        index: '',
        type: '',
        description: '',
        FromDepartment: '',
        JM: '',
        ToDepartment: '',
        quantity: 0,
        status: '',
        batchNumber: 0,
    });


    useEffect(() => {
        setIsBarrel(false);

        const updatedFormData = {...formData};

        data.forEach((item: ICardItem) => {
            if (item.myIndex === formData.index) {
                updatedFormData.type = item.type;
                updatedFormData.description = item.description;
                updatedFormData.FromDepartment = 'MSP';
                updatedFormData.JM = item.jm;
                updatedFormData.ToDepartment = 'PWT70';
                updatedFormData.quantity = item.palletQta;
                updatedFormData.status = 'Available';

                if (item.type.toLowerCase() === "barrel") {
                    setIsBarrel(true);
                    const trim = item.myIndex.split('-');
                    updatedFormData.FromDepartment = 'PWT70';

                    if (trim[1].toLowerCase() === "cmb") {
                        updatedFormData.status = 'Odzysk';
                        updatedFormData.FromDepartment = 'PWT70';
                    }
                }
            }
        });

        setFormData(updatedFormData); // Update formData state with accumulated changes
    }, [formData.index, data]);

    useEffect(() => {
        const test = batchArray.reduce((a, b) => Math.max(a, b), 0);
        setFormData((prevState) => ({...prevState, batchNumber: test + 1}))
    }, [formData.index, data]);

    const handleInputChange = (type: string, value: any) => {
        setFormData((prevData) => ({...prevData, [type]: value}));
    };

    const [note, setNote] = useState<string>('');

    const onAddItemClick = async () => {
        setIsLoader(true);

        try {
            setLoader(true);
            const response = await onAddItem(formData, user, barrelData);



            if (response[0]) {
                const tempItem: IItem = response[1];
                dispatch(addItem(tempItem));

                setTimeout(() => {
                    setNote("✅ " + response[1].index)
                    setOpen(true)
                }, 500)

            } else {
                setError(response[1])
            }
        } catch (error) {
            console.log(error);
        } finally {

            setTimeout(() => {
                setIsLoader(false);
                setBarrelData({
                    first: 0,
                    secondary: 0,
                    third: 0,
                    four: 0
                })
                setFormData({
                    index: '',
                    type: '',
                    description: '',
                    FromDepartment: '',
                    JM: '',
                    ToDepartment: '',
                    quantity: 0,
                    status: '',
                    batchNumber: 0,
                })
            }, 500)
        }
    };

    const onBarrelChange = (type: string, value: number) => {
        setBarrelData((prevState) => ({...prevState, [type]: value}))
    }

    useEffect(() => {
        const allBarrel = barrelData.first + barrelData.secondary + barrelData.third + barrelData.four

        setFormData(prevState => ({...prevState, quantity: allBarrel}))
    }, [barrelData]);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const vertical = 'bottom'
    const horizontal  = 'right'

    return (
        <div className={styles.Main}>
            <div className={styles.Wrapper}>
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={note}
                    action={action}
                />

                <h5 style={{marginTop: 4, color: 'red'}}>{error}</h5>
                <InputBlock handleInputChange={handleInputChange} formData={formData}/>
                {
                    isBarrel ?
                        <div className={styles.BarrelWrapper} >
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Checkbox
                                    icon={<CallMissedOutgoingIcon/>}
                                    checkedIcon={<BorderColorIcon/>}
                                    checked={isWeight}
                                    onChange={() => setIsWeight(!isWeight)}
                                />

                                <p> Please click to add weight for barrels </p>
                            </div>
                            {
                                isWeight ?
                                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #1"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("first", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #2"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("secondary", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #3"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("third", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #4"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("four", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                    </div> : null
                            }
                            <OutlinedInput
                                fullWidth={true}
                                placeholder="Batch number"
                                type={'Number'}
                                onChange={(event) => handleInputChange('batchNumber', Number(event.target.value))}
                                startAdornment={<InputAdornment position="start">🛢️ Batch:</InputAdornment>}
                                value={formData.batchNumber}
                                defaultValue={maxBatch + 1}
                            />
                        </div>
                        : null
                }
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 14}}>
                    <MyButton disabled={isLoader} click={onAddItemClick}>{isLoader ?
                        <MyButtonLoader/> : "Add item"}</MyButton>
                </div>
                <div>
                    <p style={{color: "gray", margin: '4px 0'}}>From: {user ? user.email : null}</p>
                    {
                        formData.description
                            ?
                            <div>
                                <p style={{color: "gray", margin: '4px 0'}}>Type: {formData.type}</p>
                                <p style={{color: "gray", margin: '4px 0'}}>Description: {formData.description}</p>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
};

export default AddItem;