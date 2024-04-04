import React, {useEffect, useState} from 'react';
import {doc, onSnapshot, setDoc, Timestamp} from "firebase/firestore";
import {db} from "../../../firebase";
import {
    Autocomplete, Avatar,
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress, Fab,
    InputAdornment,
    TextField, Typography
} from "@mui/material";
import styles from './CreateItem.module.css'
import Inputs from "./Inputs";
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';

import data from "../../../assets/ItemsInfo.json"
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import dayjs from "dayjs";
import {useAppSelector} from "../../../hooks/storeHooks";
import MyButton from "../../../components/MyButton/MyButton";
import Box from "@mui/material/Box";

import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import {addAction} from "../../../utils/addaction";

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
        index: "",
        quantity: 0,
        type: "",
        description: ""
    });

    useEffect(() => {
        (async () => {
            setOldData((prevState) => ({...prevState, loading: true})) // Sets loading state to true

            try {
                onSnapshot(doc(db, "departments", "NotApproved"), (doc) => {
                    setOldData((prevState) => ({...prevState, oldArray: doc.data() ? doc.data().itemTemplate : []})); // Updates oldArray state with data fetched from Firestore
                });
            } catch (e) {
                setOldData((prevState) => ({...prevState, loading: false, error: e})) // Handles error by updating loading state to false and setting the error
            } finally {
                setTimeout(() => {
                    setOldData((prevState) => ({...prevState, loading: false})) // Sets loading state to false after a timeout of 250 milliseconds
                }, 250)
            }
        })();
    }, []);

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };

    const addData = async () => {
        try {
            const userData = {
                itemTemplate: [...data],
                lastUpdate: dayjs().format("YYYY-MM-DD [at] HH:mm")
            };
            await setDoc(doc(db, "departments", "PWT70"), userData);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const addTestItem = async () => {
        setIsSending(true);

        try {
            const userData = {
                itemTemplate: [...oldData.oldArray, {...inputData,
                    createdTime: dayjs().format("YYYY-MM-DD [at] HH:mm"),
                    person: user.email,
                    id: Date.now()
                }]
            };
            await addAction("Create", user, inputData);
            await setDoc(doc(db, "departments", "NotApproved"), userData);

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

    const onRejectClick = async (id: number) => {
        const filter = oldData.oldArray.filter(item => item.id !== id)
        const item = oldData.oldArray.filter(item => item.id === id)
        setIsSending(true)

        try {
            await setDoc(doc(db, "departments", "NotApproved"), {
                itemTemplate: [...filter],
                lastUpdate: dayjs().format("YYYY-MM-DD [at] HH:mm"),
                updateBy: user.email
            });

            await addAction("Remove", user, item);

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
            <article style={{color: "gray"}}>Usually an employee cannot add a new item immediately, but we will review your item and approve it if it is correct.</article>
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
                    <Card key={index} sx={{ minWidth: 240 }} variant={"outlined"} raised={true}>
                        <CardContent style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <Typography color="text.secondary" variant={"subtitle1"}>
                                    <Link>{el.index} | {el.type}</Link>
                                </Typography>
                                <Typography fontSize={16} color="text.secondary" variant={"subtitle1"}>
                                    <article>{el.description}</article>
                                </Typography>
                                <Typography fontSize={16} color="text.secondary" variant={"subtitle1"}>
                                    {el.addDate} | {el.addPerson}
                                </Typography>
                                <Typography fontSize={16} color="text.secondary" variant={"subtitle1"}>
                                    {el.quantity}
                                </Typography>
                            </div>
                            <div>
                                <Box style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 24}} fontSize={12}>
                                    <Fab variant="extended" size={"medium"} color={"success"}>
                                        <LibraryAddCheckIcon sx={{ mr: 1 }} />
                                        Approve
                                    </Fab>
                                    <Fab onClick={() => onRejectClick(el.id)} variant="extended" size={"medium"} color={"error"}>
                                        <SwipeLeftIcon sx={{ mr: 1 }} />
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
