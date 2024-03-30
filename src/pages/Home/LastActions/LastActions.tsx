import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {IAction} from "../../../types/Action";
import {Card, CardContent, Skeleton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import styles from './LastActions.module.css'

const LastActions = () => {
    const {actions, loading, error} = useAppSelector(state => state.actions)

    const [reversedArray, setReversedArray] = useState<IAction[] | null>(null);

    useEffect(() => {
        if (actions) {
            const temp = [...actions]; // Shallow copy of actions array
            const reversedTemp = temp.reverse(); // Reverse the copy
            setReversedArray(reversedTemp); // Set the reversed copy to state
        }
    }, [actions, loading])

    if (reversedArray && !loading && !error) {
        return (
            <div className={styles.Main}>
                {reversedArray.slice(0, 5).map((el: IAction, index) => (
                    <Card sx={{ minWidth: 240 }} variant={"outlined"} raised={true}>
                        <CardContent>
                            <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                <Link to={ITEM_ROUTE + "?_" + el.item.id}>{el.type}</Link>
                                {el.actionTime.slice(10)} | {el.user}
                            </Typography>
                            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 4, flexDirection: "column"}}>
                                <Typography fontSize={16} color={"WindowText"} variant={"subtitle1"}>
                                    {el.item.index}
                                </Typography>
                                <Typography fontSize={12} color={"gray"} variant={"subtitle1"}>
                                    {el.item.quantity} {el.item.jm}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

   if (loading) {
       return (
           <div className={styles.Main}>
               <Skeleton variant="rectangular" width={340} height={120}/>
               <Skeleton variant="rectangular" width={340} height={120}/>
               <Skeleton variant="rectangular" width={340} height={120}/>
           </div>
       )
   }
};

export default LastActions;