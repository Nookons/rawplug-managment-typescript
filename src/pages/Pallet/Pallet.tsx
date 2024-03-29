import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/storeHooks";
import {IPalletItem, IPallets} from "../../types/Pallet";
import styles from './Pallet.module.css'
import Barcode from "react-barcode";
import {transcode} from "buffer";
import QRCodeSVG from "qrcode.react";
import MyButton from "../../components/MyButton/MyButton";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import SettingsItem from "../Item/SettingsItem";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PrintIcon from "@mui/icons-material/Print";
import SettingsPallet from "./SettingsPallet";

const Pallet = () => {
    const href = window.location.href;
    const id = href.split('_')[1]

    const {pallets, loading, error} = useAppSelector(state => state.pallets)

    const [target, setTarget] = useState<IPallets>();

    const rootClasses = [styles.Main]

    useEffect(() => {
        const targetPallet = pallets.find((item: IPallets) => item.id === Number(id));

        setTarget(targetPallet)
    }, [pallets, id]);


    return (
        <div className={rootClasses.join(' ')}>
            {/*<div ref={componentRef}>
                <SettingsToPrint currentItem={currentItem} itemData={itemData}/>
            </div>*/}
            <div className={styles.Wrapper}>
                {/*<div className={styles.Preview}>
                   <img src={itemData.imgUrl} alt=""/>
               </div>*/}
                <SettingsPallet currentItem={target}  />

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

export default Pallet;