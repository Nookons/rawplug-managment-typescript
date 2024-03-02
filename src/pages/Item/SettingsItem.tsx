import React, { FC } from 'react';
import { Skeleton } from "@mui/material";
import styles from './Item.module.css'; // Corrected import path
import { IItem } from "../../types/Item";
import {getMovement} from "../../utils/GetMovement";

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


interface SettingsItemProps {
    currentItem: IItem;
}

const SettingsItem: FC<SettingsItemProps> = ({ currentItem  }) => { // Destructuring props
    const renderMark = (label: string, value: any) => (
        <article className={styles.Mark}>
            {label}:
            <span> {renderSkeletonOrValue(value, { width: 250, height: 25, variant: 'rounded' })}</span>
        </article>
    );

    console.log(currentItem);

    return (
        <div className={styles.Settings}>
            <h3>Index: <span>{renderSkeletonOrValue(currentItem?.index, { width: 20, height: 20 })} {getSmileType(currentItem?.type)}</span></h3>
            <article style={{ color: 'gray' }}>
                <span> {renderSkeletonOrValue(currentItem?.type.toLowerCase() === 'barrel' ? "Batch: " + currentItem?.batchNumber : "# " + currentItem?.PalletReceipt, { width: 100, height: 20 })}</span>
            </article>
            <br />
            {renderMark('Add date', currentItem?.createdDate)}
            {renderMark('Last change date', currentItem?.lastChange)}
            {renderMark('Created', currentItem?.Created)}
            {renderMark('Quantity', currentItem?.quantity + ' | ' + currentItem?.jm)}
            {renderMark('Status', currentItem?.status)}
            <article className={styles.Mark}>
                Sender:
                <span> {renderSkeletonOrValue(currentItem?.fromDepartment, { width: 150, height: 20 })}</span>
                <br />
                <span>|| {getMovement(currentItem?.fromDepartment)}</span>
            </article>
            <article className={styles.Mark}>
                To:
                <span> {renderSkeletonOrValue(currentItem?.toDepartment, { width: 150, height: 20 })}</span>
                <br />
                <span>|| {getMovement(currentItem?.toDepartment)}</span>
            </article>
        </div>
    );
};

export default SettingsItem;
