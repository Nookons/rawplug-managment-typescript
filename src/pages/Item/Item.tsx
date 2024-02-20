import React, {useEffect, useState} from 'react';
import {IItem} from "../../types/Item";
import {useAppSelector} from "../../hooks/storeHooks";
import Barcode from "react-barcode";
import MyButton from "../../components/MyButton/MyButton";
import styles from './Item.module.css'

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsItem from "./SettingsItem";

const Item = () => {
    const currentURL = window.location.href;
    const id = currentURL.split('_')[1]

    const {items, error, loading} = useAppSelector(state => state.items)

    const [target, setTarget] = useState<IItem>();

    const rootClasses = [styles.Main]

    useEffect(() => {
        const tempItem = items.find(item => item.id === Number(id))
        setTarget(tempItem);
    }, [target, id, loading]);

    return (
        <div className={rootClasses.join(' ')}>
            {/*<div ref={componentRef}>
                <SettingsToPrint currentItem={currentItem} itemData={itemData}/>
            </div>*/}
            <div className={styles.Wrapper}>
                {/*<div className={styles.Preview}>
                   <img src={itemData.imgUrl} alt=""/>
               </div>*/}
                <SettingsItem currentItem={target}  />

                <div className={styles.Actions}>
                    <div>
                        {target &&
                            <Barcode width={3} height={50} fontSize={16} value={target.PalletReceipt}/>}
                    </div>
                    <div>
                        <MyButton><AssignmentTurnedInIcon/></MyButton>
                        <MyButton><PrintIcon/></MyButton>
                        <MyButton><EditIcon/></MyButton>
                        <MyButton><DeleteIcon/></MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;