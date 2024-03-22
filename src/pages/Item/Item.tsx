import React, {useEffect, useState} from 'react';
import {IItem} from "../../types/Item";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import Barcode from "react-barcode";
import MyButton from "../../components/MyButton/MyButton";
import styles from './Item.module.css'

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsItem from "./SettingsItem";
import {onDeleteItem} from "../../utils/DeleteItem";
import MyButtonLoader from "../../components/MyButtonLoader/MyButtonLoader";
import {useNavigate} from "react-router-dom";
import {FIND_ITEM_ROUTE, HOME_ROUTE, ITEMS_GRID_ROUTE} from "../../utils/consts";
import {removeItem} from "../../store/reducers/item/itemsSlice";
import {Alert, Backdrop, Button, CircularProgress, Tooltip} from "@mui/material";
import {SnackbarProvider, VariantType, useSnackbar, enqueueSnackbar} from 'notistack';


const Item = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentURL = window.location.href;
    const id = currentURL.split('_')[1]

    const {items, error, loading} = useAppSelector(state => state.items)

    const [currentItem, setCurrentItem] = useState<IItem>();
    const [isBarrel, setIsBarrel] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };

    useEffect(() => {
        const tempItem = items.find(el => el.id === Number(id));

        if (tempItem && tempItem.type.toLowerCase() === "barrel") {
            setIsBarrel(true)
        }
        setCurrentItem(tempItem);
    }, [items, loading]);


    const onDeleteItemClick = async (id: number | undefined) => {
        setIsLoading(true)
        //const answer = prompt('Pls write ' + currentItem?.index + ' for delete')


        try {
            if (id) {
                const response = await onDeleteItem(id)
                handleClickVariant('success', 'Item deleted')
                dispatch(removeItem(id))
                if (response) {
                    setTimeout(() => {
                        navigate(FIND_ITEM_ROUTE)
                    }, 250)
                }
            } else {
                handleClickVariant('error', 'Not correctly input for delete, item was not delete')
            }
        } catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 250)
        }
    }


    return (
        <div style={{backgroundColor: currentItem?.status === "Available"
                ? 'rgb(38, 118, 104)'
                : 'rgb(207,87,66)'
        }} className={styles.Main}>
            <Backdrop style={{zIndex: 99}} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            {!loading
                ? <> {!error
                    ?
                    <div className={styles.Wrapper}>
                        <div className={styles.div1}>
                            <SettingsItem handleClickVariant={handleClickVariant} currentItem={currentItem} isBarrel={false}/>
                        </div>
                        {isBarrel
                            ?
                            <div className={styles.div2}>
                                <Tooltip title="Barrel 1" arrow followCursor={true} leaveDelay={250} enterDelay={250}>
                                    <h4>🛢️ {currentItem?.barrel?.first} kg</h4>
                                </Tooltip>
                                <Tooltip title="Barrel 2" arrow followCursor={true} leaveDelay={250} enterDelay={250}>
                                    <h4>🛢️ {currentItem?.barrel?.secondary} kg</h4>
                                </Tooltip>
                                <Tooltip title="Barrel 3" arrow followCursor={true} leaveDelay={250} enterDelay={250}>
                                    <h4>🛢️ {currentItem?.barrel?.third} kg</h4>
                                </Tooltip>
                                <Tooltip title="Barrel 4" arrow followCursor={true} leaveDelay={250} enterDelay={250}>
                                    <h4>🛢️ {currentItem?.barrel?.four} kg</h4>
                                </Tooltip>
                            </div>
                            : null
                        }
                        <div className={isBarrel ? styles.div3 : styles.div2}>
                            <MyButton><AssignmentTurnedInIcon/></MyButton>
                            <MyButton><PrintIcon/></MyButton>
                            <MyButton><EditIcon/></MyButton>
                            <MyButton click={() => onDeleteItemClick(currentItem?.id)}><DeleteIcon/></MyButton>
                        </div>
                    </div>
                    : <Alert severity="error">{error}</Alert>
                }</>
                :
                <Backdrop open={true}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </div>
    );
};

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={5000}
            maxSnack={3}>
            <Item/>
        </SnackbarProvider>
    );
}
