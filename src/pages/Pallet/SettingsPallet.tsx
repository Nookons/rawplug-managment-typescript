import React, { FC, useState } from 'react';
import { Skeleton } from "@mui/material";
import {IPallets} from "../../types/Pallet";
import styles from './Pallet.module.css'
import QRCodeSVG from "qrcode.react";

const renderSkeletonOrValue = (value: any, skeletonProps: any) => (
    value ? value : <Skeleton {...skeletonProps} />
);

const getSmileType = (type: string) => {
    switch (type) {
        case "Barrel":
            return '🛢️';
        case "Carton":
            return '📦';
        case "Cartridge":
            return '🍾';
        case "Chemical":
            return '🚰';
        default:
            return '';
    }
}

export const getRecipient = ({Recipient}) => {

    switch (Recipient) {
        case 'PWT70':
            return 'Mixery Prod. Chemiczna'
        case 'PWT10':
            return  'Truskarki'
        case 'MSP':
            return  'Magazyn centralny (CMD)'
        default:
            return  'Unknown items 😥'
    }
}
export const getSender = ({Sender}) => {
    switch (Sender) {
        case 'MSP':
            return 'Magazyn centralny (CMD)'
        case 'PWT10':
            return 'Truskarki'
        case 'PWT70':
            return 'Mixery Prod. Chemiczna'
        default:
            return 'Unknown items 😥'
    }
}

interface SettingsItemProps {
    currentItem: IPallets | undefined;
}

const SettingsItem: FC<SettingsItemProps> = ({ currentItem }) => { // Destructuring props
    const renderMark = (label: string, value: any) => (
        <article className={styles.Mark}>
            {label}:
            <span> {renderSkeletonOrValue(value, { width: 250, height: 25, variant: 'rounded' })}</span>
        </article>
    );

    return (
        <div className={styles.Settings}>
            <QRCodeSVG size={204} value={"https://rawplug-managment-typescript.vercel.app/pallet?_" + currentItem?.id}/>
            <hr/>
            <h3>Index: <span>{renderSkeletonOrValue(currentItem?.index, { width: 20, height: 20 })} {getSmileType(currentItem?.type)}</span></h3>
            <p style={{ color: 'gray' }}>{currentItem?.description}</p> {/* Fixed itemData to currentItem */}
            {renderMark('Machine', currentItem?.machine)}
            {renderMark('Add date', currentItem?.createdDate)}
            {renderMark('Created', currentItem?.Created)}
            {renderMark('Quantity', currentItem?.quantity + ' | ' + currentItem?.JM)}
        </div>
    );
};

export default SettingsItem;
