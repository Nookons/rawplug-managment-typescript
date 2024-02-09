import React, {FC, useEffect, useState} from 'react';

import {IItem} from "../types/Item";
import styles from "./Home.module.css";

interface WareHouseItemProps {
    key: number,
    card: any,
    tempQta: number,
    tempPalletsQta: number,
    tempLast: IItem[]
}

export const WarehouseItem: FC<WareHouseItemProps> = ({ key, card, tempQta, tempPalletsQta, tempLast }) => {
    const INDEX = card.myIndex
    const JM = card.jm

    const [data, setData] = useState<IItem[]>([]);

    useEffect(() => {
        const reverse_array = tempLast.reverse();
        setData(reverse_array)
    }, [tempLast]);



    return (
        <div key={key} className={styles.Item}>
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
            <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
                {data.slice(0, 3).map((lastElement: IItem )=> {

                    return (
                        <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
                            <article style={{fontSize: 14}}>{lastElement.quantity} | {JM}</article>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};