import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../../../types/User";
import {collection, addDoc} from "firebase/firestore";
import {db, storage} from "../../../firebase";
import {
    Avatar, Backdrop,
    Button, Card, CardContent, CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText, Modal,
    Paper, Slider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {doc, setDoc, Timestamp} from "firebase/firestore";
import {onSnapshot} from "firebase/firestore";
import styles from "./Settings.module.css"

import {getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import 'firebase/storage';
import {useAppSelector} from "../../../hooks/storeHooks";
import {IAction} from "../../../types/Action";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import Box from "@mui/material/Box";
import MyButton from "../../../components/MyButton/MyButton";
import UserAvatar from "./Dependencies/UserAvatar";
import UserSettingsInput from "./Dependencies/UserSettingsInput";

interface SettingsBodyProps {
    user: IUser
}

const SettingsBody: FC<SettingsBodyProps> = ({user}) => {
    const {actions, loading, error} = useAppSelector(state => state.actions)

    if (user) {
        return (
            <div className={styles.Main}>

                <div className={styles.div1}>
                    <UserAvatar />
                </div>
                <div className={styles.div2}>
                    <UserSettingsInput />
                </div>
                <div className={styles.div3}>
                    {actions.map((el: IAction) => {
                        if (el.item.Created === user?.email) {
                            return (
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
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
};

export default SettingsBody;