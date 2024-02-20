import React, { FC, useState } from 'react';
import { Skeleton } from "@mui/material";
import styles from './Item.module.css'; // Corrected import path
import { IItem } from "../../types/Item";
import {isUndefined} from "util";

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
    currentItem: IItem | undefined;
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
            <h3>Index: <span>{renderSkeletonOrValue(currentItem?.index, { width: 20, height: 20 })} {getSmileType(currentItem?.type)}</span></h3>
            <article style={{ color: 'gray' }}>#
                <span> {renderSkeletonOrValue(currentItem?.PalletReceipt, { width: 100, height: 20 })}</span>
            </article>
            <article style={{ color: 'gray' }}>{currentItem?.name}</article> {/* Fixed itemData to currentItem */}
            <br />
            {renderMark('Add date', currentItem?.createdDate)}
            {renderMark('Last change date', currentItem?.lastChange)}
            {renderMark('Created', currentItem?.Created)}
            {renderMark('Quantity', currentItem?.quantity + ' | ' + currentItem?.JM)}
            {renderMark('Status', currentItem?.status)}
            <article className={styles.Mark}>
                Sender:
                <span> {renderSkeletonOrValue(currentItem?.Sender, { width: 150, height: 20 })}</span>
                <br />
                <span>|| Magazyn centralny (CMD)</span>
            </article>
            <article className={styles.Mark}>
                To:
                <span> {renderSkeletonOrValue(currentItem?.Recipient, { width: 150, height: 20 })}</span>
                <br />
                <span>|| Mixery Prod. Chemiczna</span>
            </article>
        </div>
    );
};

export default SettingsItem;
