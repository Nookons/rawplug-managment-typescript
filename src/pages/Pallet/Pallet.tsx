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

const Pallet = () => {
    const href = window.location.href;
    const id = href.split('_')[1]

    const {pallets, loading, error} = useAppSelector(state => state.pallets)

    const [item, setItem] = useState<IPallets>();

    useEffect(() => {
        const targetPallet = pallets.find((item: IPallets) => item.id === Number(id));

        setItem(targetPallet)
    }, [pallets, id]);

    console.log(item);

    return (
        <div className={styles.Main}>
            <div style={{display: "flex", gap: 14, justifyContent: "center", margin: "14px 0"}}>
                <MyButton><PictureAsPdfIcon/></MyButton>
                <MyButton><MoveUpIcon/></MyButton>
                <MyButton><EditIcon/></MyButton>
                <MyButton><DeleteIcon/></MyButton>
            </div>
            <div className={styles.Wrapper}>
                <div>
                    <h5>Index: </h5>
                    <h5>{item?.index}</h5>
                </div>
                <div>
                    <article>Description: </article>
                    <h5>{item?.description}</h5>
                </div>
                <div>
                    <article>Created date: </article>
                    <h5>{item?.createdDate}</h5>
                </div>
                <div>
                    <article>Created by: </article>
                    <h5>{item?.Created}</h5>
                </div>
                <div>
                    <article>Machine: </article>
                    <h5>{item?.machine}</h5>
                </div>
                <div>
                    <article>Quantity:</article>
                    <h5>{item?.quantity} | {item?.JM}</h5>
                </div>
                <div>
                    <QRCodeSVG value={"https://rawplug-managment-typescript.vercel.app/pallet?_" + item?.id} size={128} bgColor="rgb(195,235,233)" />
                    <Barcode value={item?.PalletReceipt} height={75} width={3} fontSize={12} background="rgb(195,235,233)"/>
                </div>
            </div>
        </div>
    );
};

export default Pallet;