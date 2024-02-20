import React, {FC, useEffect, useState} from 'react';

import {IItem} from "../../../types/Item";
import styles from "./Warehouse.module.css";

interface WareHouseItemProps {
    card: any,
    tempQta: number,
    tempPalletsQta: number,
    tempLast: IItem[]
}

export const WarehouseItem: FC<WareHouseItemProps> = ({ card, tempQta, tempPalletsQta, tempLast }) => {
    const INDEX = card.myIndex
    const JM = card.jm

    const [data, setData] = useState<IItem[]>([]);

    useEffect(() => {
        const reverse_array = tempLast.reverse();
        setData(reverse_array)
    }, [tempLast]);


    const getStatus = (status: string) => {
        switch (status.toLowerCase()) {
            case "hold":
                return styles.Hold
            case "odzysk":
                return styles.Odzysk
            default:
                return styles.LastItems
        }
    }

    return (
        <div className={styles.Item}>
            <article
                style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 14
                }}>{INDEX}</article>
            <hr/>
            <article>All have: {tempQta} {JM}</article>
            <article>Pallets: ({tempPalletsQta})</article>
            <br/>
            <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>
                {data.slice(0, 2).map((lastElement: IItem, index: number )=> {

                    const rootClasses = [styles.LastItems]
                    const response = getStatus(lastElement.status)

                    if (response) {
                        rootClasses.push(response)
                    }

                    return (
                        <div className={rootClasses.join(' ')} key={index}>
                            <article style={{fontSize: 14}}>{lastElement.createdDate}</article>
                            <article style={{fontSize: 14}}>{lastElement.quantity} | {JM}</article>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};