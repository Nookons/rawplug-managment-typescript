import React, {FC, useEffect, useState} from 'react';

import {IItem} from "../../../types/Item";
import styles from "./Warehouse.module.css";
import {Link, useNavigate} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import {Avatar, Card, CardContent, Typography} from "@mui/material";

interface WareHouseItemProps {
    card: any,
    tempQta: number,
    tempPalletsQta: number,
    tempLast: IItem[]
}

export const WarehouseItem: FC<WareHouseItemProps> = ({card, tempQta, tempPalletsQta, tempLast}) => {
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
        <Card style={{minWidth: 100}} key={INDEX} sx={{minWidth: 240}} variant={"outlined"} raised={true}>
            <CardContent>
                <Typography fontSize={14} variant={"subtitle1"}>
                    {INDEX}
                </Typography>
         {/*       <Typography fontSize={14} color="text.secondary" variant={"subtitle1"}>
                    {card.description}
                </Typography>*/}
                <hr/>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    gap: 4,
                    flexDirection: "column"
                }}>
                    <Typography fontSize={14} color={"WindowText"} variant={"subtitle1"} display={"flex"}
                                alignItems={"center"} gap={1} alignContent={"center"}>
                        ({tempQta.toLocaleString()}) {card.jm}
                    </Typography>
                    <Typography fontSize={14} color={"gray"} variant={"subtitle1"}>
                        ({tempPalletsQta}) Pallets
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};