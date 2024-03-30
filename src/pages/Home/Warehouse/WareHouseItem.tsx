import React, {FC, useEffect, useState} from 'react';

import {IItem} from "../../../types/Item";
import styles from "./Warehouse.module.css";
import {useNavigate} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";

interface WareHouseItemProps {
    card: any,
    tempQta: number,
    tempPalletsQta: number,
    tempLast: IItem[]
}

export const WarehouseItem: FC<WareHouseItemProps> = ({ card, tempQta, tempPalletsQta, tempLast }) => {
    const navigate = useNavigate();

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

    const onItemClick = (id: number) => {
        navigate(ITEM_ROUTE + '?_' + id)
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
                {data.slice(0, 3).map((lastElement: IItem, index: number )=> {

                    const rootClasses = [styles.LastItems]
                    const response = getStatus(lastElement.status)

                    if (response) {
                        rootClasses.push(response)
                    }

                    return (
                        <button onClick={() => onItemClick(lastElement.id)} className={rootClasses.join(' ')} key={index}>
                            {/*<article style={{fontSize: 14}}>{lastElement.createdDate}</article>*/}
                            <article style={{fontSize: 14}}>{lastElement.quantity} | {JM}</article>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};