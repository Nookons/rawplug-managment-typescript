import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {IItem} from "../../../types/Item";
import {Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";

interface RemovedDisplayProps {
    removedArray: IItem[] | null;
    setRemovedArray: (removedArray: IItem[]) => void;
    pickUser: string | null;
    pickDate: string;
}


const RemovedDisplay: FC<RemovedDisplayProps> = ({removedArray, setRemovedArray, pickUser, pickDate}) => {
    const {removed, loading, error} = useAppSelector(state => state.removed)


    useEffect(() => {
        const filteredRemoved = removed.filter(el => {
            const created = el.item.createdDate.slice(0, 10);
            const user = el.item.Created;
            return created === pickDate && user === pickUser;
        });

        const reversedArray = filteredRemoved.reverse().map(el => el.item);
        setRemovedArray(reversedArray);
    }, [removed, pickDate, pickUser]);



    if (removedArray?.length) {
        return (
            <div>
                <h5>Removed items</h5>
                <hr/>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 24
                }}>
                    {removedArray?.map((el) => (
                        <Card style={{backgroundColor: "rgba(0,0,0,0.15)"}} sx={{ minWidth: 340 }} variant={"outlined"} raised={true}>
                            <CardContent>
                                <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                    <Link to={ITEM_ROUTE + "?_" + el.id}>{el.index}</Link>
                                    {el.createdDate.slice(10)}
                                </Typography>
                                <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                    {el.description}
                                </Typography>
                                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8}}>
                                    <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                        {el.fromDepartment}
                                    </Typography>
                                    <Typography variant={"h5"} marginTop={"12px"}>
                                        {el.quantity.toLocaleString()} {el.jm}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
};

export default RemovedDisplay;