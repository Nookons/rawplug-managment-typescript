import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {IAction} from "../../../types/Action";
import {Avatar, Card, CardContent, Skeleton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import styles from './LastActions.module.css'
import {getDownloadURL, ref} from "firebase/storage";
import {db, storage} from "../../../firebase";
import {addAction} from "../../../utils/addaction";
import {doc, getDoc, onSnapshot} from "firebase/firestore";

const LastActions = () => {
    const [dataArray, setDataArray] = useState([]);


    useEffect(() => {
         (async () => {
             try {
                 onSnapshot(doc(db, "PWT70", "actions"), (doc) => {
                     if (doc.exists()) {
                         const reverse = [...doc.data().items].reverse();
                         setDataArray(reverse)
                     }
                 });
             } catch (error) {
                 console.log(error);
             }
         })();
     }, []);

    useEffect(() => {
        console.log(dataArray);
    }, [dataArray]);

    if (dataArray) {
        return (
            <div className={styles.Main}>
                {dataArray.slice(0, 5).map((el: IAction, index) => (
                    <Card key={index} sx={{minWidth: 240}} variant={"outlined"} raised={true}>
                        <CardContent>
                            <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                <Link to={ITEM_ROUTE + "?_" + el.id}>{el.type}</Link>
                                {el.createTime.slice(10)} | {el.person}
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
                                            {el.actionItem.index}
                                        </Typography>
                                        <Typography fontSize={12} color={"gray"} variant={"subtitle1"}>
                                            {el.actionItem.quantity} {el.actionItem.jm}
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
