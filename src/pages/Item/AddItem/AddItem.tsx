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
import {IAddFormData} from "../../../types/Item";
import {handlingError, onAddItem} from "../../../utils/AddItem";
import {addItem} from "../../../store/reducers/item/itemsSlice";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useNavigate} from "react-router-dom";


const AddItem = () => {
    const {enqueueSnackbar} = useSnackbar();
    const user = useAppSelector(state => state.user.user)
    const {items, loading, error} = useAppSelector(state => state.items)

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

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
    ;


    const onAddItemClick = async () => {
        setIsBatchError(false)
        setIsAdding(true)

        console.log(formData);

        try {
            const validation    = await addItemValidation({items, formData});
            const response      = await onAddItem(formData, user)

            if (response[0]) {
                handleClickVariant('success', validation);
                dispatch(addItem(response[1]))

                setFormData(prevState => ({...prevState, barrel: {...prevState.barrel, first: 0, secondary: 0, third: 0, four:0}}))
            }
        } catch (error) {
            const errorMessage = await handlingError({ error });
            handleClickVariant('error', errorMessage)
        } finally {
            setTimeout(() => {
                setIsAdding(false)
            }, 250)
        }
    };


    const onChangeDataEvent = useCallback((type: string, value: any) => {
        if (type === "index") {
            const tempItem = data.find(el => el.myIndex === value);
            if (tempItem) {
                const statusCheck = tempItem.myIndex.split('-')[1];
                const fromDepartment = tempItem.type.toLowerCase() !== 'barrel' ? 'MSP' : 'PWT70';
                const status = statusCheck === 'CMB' && tempItem.type.toLowerCase() === 'barrel' ? 'Odzysk' : 'Available';

                setFormData(prevState => ({
                    ...prevState,
                    type: tempItem.type,
                    index: tempItem.myIndex,
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
    }, [data, setFormData]);

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
        switch (true) {
            case formData.barrel.first > 375:
                handleClickVariant('warning', "You barrel have more than 375 kg, you can't add this barrel ")
                break;
            case formData.barrel.secondary > 375:
                handleClickVariant('warning', "You barrel have more than 375 kg, you can't add this barrel ")
                break;
            case formData.barrel.third > 375:
                handleClickVariant('warning', "You barrel have more than 375 kg, you can't add this barrel ")
                break;
            case formData.barrel.four > 375:
                handleClickVariant('warning', "You barrel have more than 375 kg, you can't add this barrel ")
                break;
        }
        setFormData(prevState => ({
            ...prevState,
            quantity: formData.barrel.first + formData.barrel.secondary + formData.barrel.third + formData.barrel.four
        }));
    }, [formData.barrel.first, formData.barrel.secondary, formData.barrel.third, formData.barrel.four]);

    const onFaqClick = (url: string) => {
        window.location.href = url;
    }

    return (
        <div className={styles.Main}>
            <Backdrop open={isAdding}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <>
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    <article>FAQ</article>
                    <IconButton aria-label="add">
                            <HelpOutlineIcon color={"info"} onClick={() => onFaqClick('https://telegra.ph/Instrukcje-dotycz%C4%85ce-dodawania-towar%C3%B3w-do-systemu-Rawlplug-Management-03-08')}/>
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
                <MyButton click={onAddItemClick}>Add item</MyButton>
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