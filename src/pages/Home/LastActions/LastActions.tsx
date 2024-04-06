import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {IAction} from "../../../types/Action";
import {Avatar, Card, CardContent, Skeleton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import styles from './LastActions.module.css'

const LastActions = () => {
    const {actions, loading, error} = useAppSelector(state => state.actions)

    const [data, setData] = useState<IAction[]>([]);

    useEffect(() => {
        if (actions) {
            const reversed = [...actions].reverse();
            setData(reversed)
        }
    }, [actions, loading]);

    if (actions) {
        return (
            <div className={styles.Main}>
                {data.slice(0, 5).map((el: IAction, index) => (
                    <Card key={index} sx={{minWidth: 240}} variant={"outlined"} raised={true}>
                        <CardContent>
                            <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                <Link to={ITEM_ROUTE + "?_" + el.item.id}>{el.type}</Link>
                                {el.timeStamp.slice(10)} | {el.person}
                            </Typography>
                            <hr/>
                            <div style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                gap: 4,
                                flexDirection: "column"
                            }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-end"
                                    }}>
                                        <Typography fontSize={16} color={"WindowText"} variant={"subtitle1"}>
                                            {el.item.index}
                                        </Typography>
                                        <Typography fontSize={12} color={"gray"} variant={"subtitle1"}>
                                            {el.item.quantity} {el.item.jm}
                                        </Typography>
                                    </div>
                                    <Avatar alt="Avatar">N</Avatar>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className={styles.Main}>
            <Skeleton variant="rectangular" width={340} height={120}/>
            <Skeleton variant="rectangular" width={340} height={120}/>
            <Skeleton variant="rectangular" width={340} height={120}/>
        </div>
    );

};

export default LastActions;
