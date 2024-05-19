import React, {useCallback, useEffect, useState} from 'react';
import styles from './AddItem.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import MyButton from "../../../components/MyButton/MyButton";
import data from '../../../assets/ItemsInfo.json'
import InputBlock from "./InputBlock";
import Barrel from "./Barrel";
import {Alert, Backdrop, Button, CircularProgress, IconButton, Snackbar} from "@mui/material";
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';
import {addItemValidation} from "../../../utils/Items/AddItemValidation";
import {IAddFormData, IItem, IItemTemplate} from "../../../types/Item";
import {handlingError, onAddItem} from "../../../utils/Items/AddItem";
import {addItem} from "../../../store/reducers/item/itemsSlice";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {Link, useNavigate} from "react-router-dom";
import {collection, doc, getDocs, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import dayjs from "dayjs";

import {query, where } from "firebase/firestore";


const AddItem = () => {
    const {enqueueSnackbar} = useSnackbar();
    const user = useAppSelector(state => state.user.user)
    const {items, loading, error} = useAppSelector(state => state.items)


    const [isBarrel, setIsBarrel] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);



    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };


    const [isBatchError, setIsBatchError] = useState<boolean>(false);


    const [formData, setFormData] = useState<IAddFormData>({
        index: '',
        type: '',
        description: '',
        fromDepartment: '',
        jm: '',
        toDepartment: '',
        quantity: 0,
        status: '',
        batchNumber: 0,
        remarks: '',
        barrel: {
            first: 0,
            secondary: 0,
            third: 0,
            four: 0
        }
    });

    useEffect(() => {
        const newBatchArray = items
            .filter(element => element.type.toLowerCase() === 'barrel')
            .map(element => Number(element.batchNumber));

        const largestBatch = Math.max(...newBatchArray);
        setFormData((prevState) => ({...prevState, batchNumber: largestBatch + 1}))
    }, [formData.index, items]);


    const onAddItemClick = async () => {
        setIsBatchError(false)
        setIsAdding(true)

        try {
            const validation    = await addItemValidation({items, formData});
            const response      = await onAddItem(formData, user)

            console.log(response);

            if (response[0]) {
                handleClickVariant('success', validation);
                setFormData(prevState => ({...prevState, barrel: {...prevState.barrel, first: 0, secondary: 0, third: 0, four:0}}))
            }
        } catch (error) {
            handleClickVariant('error', error.toString())
        } finally {
            setTimeout(() => {
                setIsAdding(false)
            }, 250)
        }
    };

    const [dataTemplates, setDataTemplates] = useState<IItemTemplate[]>([]);

    useEffect(() => {
        try {
            const q = query(collection(db, "itemsTemplate"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tempArray = []
                querySnapshot.forEach((doc) => {
                    tempArray.push(doc.data())
                });
                setDataTemplates(tempArray);
            });
        } catch (e) {
            console.log(e)
        }
    }, []);


    const onChangeDataEvent = useCallback((type: string, value: any) => {

        if (type === "index") {
            const tempItem = dataTemplates.find(el => el.index === value);

            console.log(value);
            console.log(tempItem);

            if (tempItem) {
                const statusCheck = tempItem.index.split('-')[1];
                const fromDepartment = tempItem.type.toLowerCase() !== 'barrel' ? 'MSP' : 'PWT70';
                const status = statusCheck === 'CMB' && tempItem.type.toLowerCase() === 'barrel' ? 'Odzysk' : 'Available';

                setFormData(prevState => ({
                    ...prevState,
                    type: tempItem.type,
                    index: tempItem.index,
                    jm: tempItem.jm,
                    description: tempItem.description,
                    fromDepartment,
                    toDepartment: 'PWT70',
                    status,
                    quantity: tempItem.palletQta
                }));
            }
        } else {
            if (type === 'first' || type === 'secondary' || type === 'third' || type === 'four') {
                setFormData(prevState => ({
                    ...prevState,
                    barrel: {
                        ...prevState.barrel,
                        [type]: value
                    }
                }));
            } else {
                setFormData(prevState => ({...prevState, [type]: value}));
            }
        }
    }, [dataTemplates]);

    useEffect(() => {
        setIsBarrel(formData.type.toLowerCase() === 'barrel');
        if (formData.type.toLowerCase() !== 'barrel') {
            setFormData(prevState => ({
                ...prevState,
                barrel: {
                    first: 0,
                    secondary: 0,
                    third: 0,
                    four: 0,
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                quantity: formData.barrel.first + formData.barrel.secondary + formData.barrel.third + formData.barrel.four
            }));
        }
    }, [formData.index]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            quantity: formData.barrel.first + formData.barrel.secondary + formData.barrel.third + formData.barrel.four
        }));
    }, [formData.barrel.first, formData.barrel.secondary, formData.barrel.third, formData.barrel.four]);

    return (
        <div className={styles.Main}>
            <Backdrop open={isAdding}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <>
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    <article>FAQ</article>
                    <IconButton aria-label="add">
                        <Link to={'https://telegra.ph/Instrukcje-dotycz%C4%85ce-dodawania-towar%C3%B3w-do-systemu-Rawlplug-Management-03-08'}>
                            <HelpOutlineIcon color={"info"}/>
                        </Link>
                    </IconButton>
                </div>
            </>
            <div className={styles.Wrapper}>
                <InputBlock onChangeDataEvent={onChangeDataEvent} formData={formData}/>
                {
                    isBarrel
                        ? <Barrel
                            onChangeDataEvent={onChangeDataEvent}
                            formData={formData}
                            isBatchError={isBatchError}
                        />
                        : null
                }
                <Button variant={"contained"} onClick={onAddItemClick}>Add item</Button>
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

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={5000}
            maxSnack={3}
        >
            <AddItem/>
        </SnackbarProvider>
    );
}