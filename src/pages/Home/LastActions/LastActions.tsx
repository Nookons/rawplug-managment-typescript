import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../../../hooks/storeHooks";
import { IAction } from "../../../types/Action";
import { Avatar, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ITEM_ROUTE } from "../../../utils/consts";
import styles from './LastActions.module.css'
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase";

const LastActions = () => {
    const { actions, loading, error } = useAppSelector(state => state.actions);

    const user = useAppSelector(state => state.user.user)

    const [reversedArray, setReversedArray] = useState<IAction[] | null>(null);
    const [avatarUrls, setAvatarUrls] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (actions) {
            const temp = [...actions];
            const reversedTemp = temp.reverse();
            setReversedArray(reversedTemp);
        }
    }, [actions, loading]);

    useEffect(() => {
        console.log(avatarUrls);
    }, [avatarUrls])

    useEffect(() => {
        if (reversedArray) {
            const fetchAvatarUrls = async () => {
                const urls: { [key: string]: string } = {};
                for (const el of reversedArray.slice(0, 5)) {
                    console.log(el.userUid);

                    const storageRef = ref(storage);
                    const imagesRef = ref(storageRef, 'avatars/');
                    const fileName = el.userUid;
                    const spaceRef = ref(imagesRef, fileName);

                    try {
                        const url = await getDownloadURL(spaceRef);
                        urls[fileName] = url;
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                    }
                }
                setAvatarUrls(urls);
            };
            fetchAvatarUrls();
        }
    }, [reversedArray]);

    if (reversedArray && !loading && !error) {
        return (
            <div className={styles.Main}>
                {reversedArray.slice(0, 5).map((el: IAction, index) => (
                    <Card key={index} sx={{ minWidth: 240 }} variant={"outlined"} raised={true}>
                        <CardContent>
                            <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                <Link to={ITEM_ROUTE + "?_" + el.item.id}>{el.type}</Link>
                                {el.actionTime.slice(10)} | {el.user}
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
                                    <Avatar src={avatarUrls[el.userUid]} alt="Avatar">N</Avatar>
                                </div>
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
                <Skeleton variant="rectangular" width={340} height={120} />
                <Skeleton variant="rectangular" width={340} height={120} />
                <Skeleton variant="rectangular" width={340} height={120} />
            </div>
        );
    }

    return null;
};

export default LastActions;
