import React, {useEffect, useState} from 'react';
import {doc, onSnapshot, setDoc, Timestamp} from "firebase/firestore";
import {db} from "../../../firebase";
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress, Fab,
    TextField, Typography
} from "@mui/material";
import styles from './CreateItem.module.css'
import Inputs from "./Inputs";
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';

import data from "../../../assets/ItemsInfo.json"
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import {useAppSelector} from "../../../hooks/storeHooks";
import Box from "@mui/material/Box";

import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';

interface IIndexData {
    oldArray: any[],
    loading: false;
    error: string | null;
}

const CreateItem = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {user, error, loading} = useAppSelector(state => state.user)

    const [oldData, setOldData] = useState<IIndexData>({
        oldArray: [],
        loading: false,
        error: null
    });

    const [isSending, setIsSending] = useState(false);

    const [inputData, setInputData] = useState({
        jm: "",
        myIndex: "",
        palletQta: 0,
        type: "",
        description: ""
    });

    useEffect(() => {
        try {
            onSnapshot(doc(db, "PWT70", "NotApproved"), (doc) => {
                setOldData((prevState) => ({...prevState, oldArray: doc.data() ? doc.data().itemTemplate : []})); // Updates oldArray state with data fetched from Firestore
            });
        } catch (e) {
            setOldData((prevState) => ({...prevState, loading: false, error: e})) // Handles error by updating loading state to false and setting the error
        }
    }, []);

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };


    const addTestItem = async () => {
        setIsSending(true);

        try {
            const userData = {
                itemTemplate: [...oldData.oldArray, {
                    ...inputData,
                }]
            };
            await setDoc(doc(db, "PWT70", "NotApproved"), userData);

            setTimeout(() => {
                setIsSending(false)
                handleClickVariant('success', inputData.index + " was sent to leaders, you will be seen this item after we approved him, thanks for your work ❤️");
            }, 250)
        } catch (e) {
            console.error("Error adding document: ", e);
            handleClickVariant('error', e);
        } finally {
            setIsSending(false)
        }
    }

    const setItem = async (item) => {
        try {
            setDoc(doc(db, "PWT70", "templates"), {
                templates: [...data, item],
                lastUpdate: dayjs().format("YYYY-MM-DD [at] HH:mm"),
                updateBy: user.email
            });
            return
        } catch (error) {
            console.log(error);
            return
        }
    }

    const onApproveClick = async (item) => {
        alert('Not working now...')
        /*try {
            onSnapshot(doc(db, "PWT70", "templates"), (doc) => {
                const data = doc.data().templates
                const isFind = data.find(el => el.myIndex === item.myIndex)

                if (!isFind) {
                    setItem(item)
                    onRejectClick(item.myIndex)
                    handleClickVariant('success', item.myIndex + " added");
                } else {
                    handleClickVariant('error', "This index is existed");
                }
            });
        } catch (e) {
            setOldData((prevState) => ({...prevState, loading: false, error: e})) // Handles error by updating loading state to false and setting the error
        }*/
    }

    const onRejectClick = async (index: number) => {
        const filter = oldData.oldArray.filter(item => item.myIndex !== index)

        setIsSending(true)
        try {
            await setDoc(doc(db, "PWT70", "NotApproved"), {
                itemTemplate: [...filter],
                lastUpdate: dayjs().format("YYYY-MM-DD [at] HH:mm"),
                updateBy: user.email
            });

            setTimeout(() => {
                handleClickVariant('success', "Item was success delete");
                setIsSending(false);
            })
        } catch (error) {
            handleClickVariant('error', error);
            setIsSending(false);
        }
    }

    return (
        <div style={{padding: 14, margin: "0 auto", maxWidth: 900, minHeight: "calc(100dvh - 190px)"}}>
            <h4>ADD NEW ITEM</h4>
            <hr/>
            <article style={{color: "gray"}}>Usually an employee cannot add a new item immediately, but we will review
                your item and approve it if it is correct.
            </article>
            <Backdrop style={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Inputs inputData={inputData} setInputData={setInputData}/>
            <Button onClick={addTestItem} fullWidth={true} variant="outlined">Send</Button>

            {/*<Button onClick={addData} fullWidth={true} variant="outlined">Add data</Button>*/}

            <h5 style={{marginTop: 24}}>Not approved items</h5>
            <hr/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 4
            }}>
                {oldData.oldArray.map((el, index) => (
                    <Card key={index} sx={{minWidth: 240}} variant={"outlined"} raised={true}>
                        <CardContent
                            style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <Typography color="text.secondary" variant={"subtitle1"}>
                                    <Link>{el.myIndex} | {el.type}</Link>
                                </Typography>
                                <Typography fontSize={16} color="text.secondary" variant={"subtitle1"}>
                                    <article>{el.description}</article>
                                </Typography>
                                <Typography fontSize={16} color="text.secondary" variant={"subtitle1"}>
                                    {el.palletQta} | {el.jm}
                                </Typography>
                            </div>
                            <div>
                                <Box style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 24}}
                                     fontSize={12}>
                                    <Fab onClick={() => onApproveClick(el)} variant="extended" size={"medium"} color={"success"}>
                                        <LibraryAddCheckIcon sx={{mr: 1}}/>
                                        Approve
                                    </Fab>
                                    <Fab onClick={() => onRejectClick(el.myIndex)} variant="extended" size={"medium"}
                                         color={"error"}>
                                        <SwipeLeftIcon sx={{mr: 1}}/>
                                        Reject
                                    </Fab>
                                </Box>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={5000}
            maxSnack={3}>
            <CreateItem/>
        </SnackbarProvider>
    );
}
