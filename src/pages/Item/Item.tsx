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
import {HOME_ROUTE, ITEMS_GRID_ROUTE} from "../../utils/consts";
import {removeItem} from "../../store/reducers/item/itemsSlice";

const Item = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentURL = window.location.href;
    const id = currentURL.split('_')[1]

    const {items, error, loading} = useAppSelector(state => state.items)

    const [target, setTarget] = useState<IItem>();

    const [isBarrel, setIsBarrel] = useState<boolean>(false);

    const rootClasses = [styles.Main]

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        const tempItem = items.find(item => item.id === Number(id))

        if (tempItem?.type.toLowerCase() === 'barrel') {
            setIsBarrel(true);
        }

        setTarget(tempItem);
    }, [target, id, loading]);

    const onDeleteItemClick = async (id: number) => {
        setIsDeleting(true)
        try {
            const response = await onDeleteItem(id)
            if (response) {
                setTimeout(() => {
                    dispatch(removeItem(id))
                    setIsDeleting(false);
                    navigate(ITEMS_GRID_ROUTE)
                }, 500)
            }
        } catch (e) {
            console.log(e);
            setIsDeleting(false);
        }
    }


    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.Wrapper}>
                <SettingsItem currentItem={target}  />
                {
                    isBarrel ?
                        <div style={{display: "grid", gridTemplateColumns: '1fr 1fr', gap: 14, width: "100%"}}>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                border: '1px solid gray',
                                alignItems: "center",
                                gap: 8,
                                padding: 8,
                                borderRadius: 4
                            }}>
                                <article>1: {target?.barrel.first} {target?.JM}</article>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                border: '1px solid gray',
                                alignItems: "center",
                                gap: 8,
                                padding: 8,
                                borderRadius: 4
                            }}>
                                <article>2: {target?.barrel.secondary} {target?.JM}</article>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                border: '1px solid gray',
                                alignItems: "center",
                                gap: 8,
                                padding: 8,
                                borderRadius: 4
                            }}>
                                <article>3: {target?.barrel.third} {target?.JM}</article>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                border: '1px solid gray',
                                alignItems: "center",
                                gap: 8,
                                padding: 8,
                                borderRadius: 4
                            }}>
                                <article>4: {target?.barrel.four} {target?.JM}</article>
                            </div>
                        </div>
                        : null
                }
                <div className={styles.Actions}>
                    <div>
                        {target &&
                            <Barcode width={3} height={50} fontSize={16} value={target.PalletReceipt}/>}
                    </div>
                    <div>
                        <MyButton><AssignmentTurnedInIcon/></MyButton>
                        <MyButton><PrintIcon/></MyButton>
                        <MyButton><EditIcon/></MyButton>
                        <MyButton click={() => onDeleteItemClick(id)}>{isDeleting ? <MyButtonLoader/> :<DeleteIcon/>}</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;