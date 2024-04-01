import React, {useEffect, useState} from 'react';
import {doc, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {Autocomplete, Backdrop, Button, CircularProgress, InputAdornment, TextField} from "@mui/material";
import styles from './CreateItem.module.css'
import Inputs from "./Inputs";
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';

interface IIndexData {
    oldArray: any[],
    loading: false;
    error: string | null;
}

const CreateItem = () => {
    const {enqueueSnackbar} = useSnackbar();

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

    const addTestItem = async () => {
        setIsSending(true);

        try {
            const userData = {
                itemTemplate: [...oldData.oldArray, inputData]
            };
            await setDoc(doc(db, "departments", "NotApproved"), userData);
            setTimeout(() => {
                setIsSending(false)
                handleClickVariant('success', inputData.myIndex + " was sent to leaders, you will be seen this item after we approved him, thanks for your work ❤️");
            }, 250)
        } catch (e) {
            console.error("Error adding document: ", e);
            handleClickVariant('success', e);
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div style={{padding: 14, margin: "0 auto", maxWidth: 900, minHeight: "calc(100dvh - 190px)"}}>
            <h4>ADD NEW ITEM</h4>
            <hr/>
            <article style={{color: "gray"}}>Usually an employee cannot add a new item immediately, but we will review your item and approve it if it is correct.</article>
            <Backdrop style={{zIndex: 2}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Inputs inputData={inputData} setInputData={setInputData}/>
            <Button onClick={addTestItem} fullWidth={true} variant="outlined">Send</Button>
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
