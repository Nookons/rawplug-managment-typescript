import React, {useEffect, useState} from 'react';
import styles from './Add.module.css'
import {
    Autocomplete, Backdrop,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Slider,
    Stack,
    TextField
} from "@mui/material";
import dayjs from "dayjs";
import {db} from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import InputBlock from "./AddTemplateDep/InputBlock";
import NeedItem from "./AddTemplateDep/NeedItem";
import {AddPalletTemplate} from "../../../utils/Ready/Add";


export interface INeedItemTemplate {
    index: string;
    type: string;
    description: string;
    quantity: number;
}

export interface IAddPalletTemplate {
    id: number;
    index: string;
    description: string;
    imgUrl: string;
    data: string;
    capacity: number;
    palletQta: number;
    pallet: string;
    atBox: number;
    weight: number;
    jm: string;
    needItem: INeedItemTemplate[];
}

const AddTemplate = () => {

    const [needItemCount, setNeedItemCount] = useState<number>(0);
    const [dataTemplates, setDataTemplates] = useState<any[]>([]);

    const [needItemArray, setNeedItemArray] = useState<INeedItemTemplate[]>([]);

    const [isSending, setIsSending] = useState(false);

    const [inputData, setInputData] = useState<IAddPalletTemplate>({
        id: Date.now(),
        index: "",
        description: "",
        imgUrl: "",
        data: dayjs().format("YYYY-MM-DD"),
        capacity: 0,
        palletQta: 0,
        pallet: "",
        atBox: 0,
        weight: 0,
        jm: "Pieces",
        needItem: [],
    });

    useEffect(() => {
        setInputData((prev) => ({...prev, needItem: needItemArray}))
    }, [needItemArray]);

    const indexWriting = (value: string) => {
        const refactoredString = value.toUpperCase().replace(" ", "-")
        setInputData((prev) => ({...prev, index: refactoredString}))
    }

    const onSave = async () => {
        try {
            setIsSending(true)
            const response = await AddPalletTemplate(inputData)

            if (response[0]) {
                setInputData({
                    id: Date.now(),
                    index: "",
                    description: "",
                    imgUrl: "",
                    data: dayjs().format("YYYY-MM-DD"),
                    capacity: 0,
                    palletQta: 0,
                    pallet: "",
                    atBox: 0,
                    weight: 0,
                    jm: "Pieces",
                    needItem: [],
                })
                setNeedItemCount(0)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsSending(false)
            }, 250)
        }
    }


    return (
        <div className={styles.Main}>
            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <InputBlock indexWriting={indexWriting} inputData={inputData} setInputData={setInputData} />
            <hr/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        justifyContent: "flex-end"
                    }}>
                        <h5>Need item: {needItemCount} pcs</h5>
                        <ButtonGroup variant="contained" aria-label="text button group">
                            <Button onClick={() => setNeedItemCount(prevState => prevState + 1)}>+</Button>
                            <Button onClick={() => setNeedItemCount(prevState => prevState - 1)}>-</Button>
                        </ButtonGroup>
                    </Box>

                    <Grid sx={{my: 2}} container spacing={2}>
                        {Array.from({ length: needItemCount }).map((_, index) => {

                            return (
                                <NeedItem needItemArray={needItemArray}  setNeedItemArray={setNeedItemArray}/>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button onClick={onSave} fullWidth={true} variant="contained" sx={{my: 2}}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddTemplate;