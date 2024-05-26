import React, {useEffect, useState} from 'react';
import {
    Autocomplete, Backdrop,
    Box,
    Button, CircularProgress,
    Container,
    Divider,
    Grid, IconButton,
    Paper,
    Slider,
    Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import {IOSSlider} from "../../../components/SliderStyle";
import {IItemTemplate} from "../../../types/Item";
import {collection, query, where, onSnapshot, setDoc, doc} from "firebase/firestore";
import {db} from "../../../firebase";
import NeedItem from "./NeedItem";
import {Add} from "@mui/icons-material";
import dayjs from "dayjs";

const AddTemplate = () => {
    const [isSending, setIsSending] = useState<boolean>(false);

    const [data, setData] = useState({
        index: "",
        description: "",
        atBox: 10,
        palletQta: 84,
    });

    const [itemsTemplate, setItemsTemplate] = useState<any>([]);


    const [needItemsCount, setNeedItemsCount] = useState<number>(1);
    const [needItem, setNeedItem] = useState<IItemTemplate[]>([]);

    useEffect(() => {
        setItemsTemplate([])

        const q = query(collection(db, "itemsTemplate"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setItemsTemplate((prev) => [...prev, doc.data()])
            });
        });
    }, []);



    const onInput = (value: any, type: string) => {
        if (type === "index") {
            const newString = value.toUpperCase().replace(" ", "-")
            setData((prev) => ({...prev, index: newString}))
        } else {
            setData((prev) => ({...prev, [type]: value}))
        }
    }

    const onAddTemplate = async () => {
        try {
            setIsSending(true)
            const template = {
                ...data,
                data: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
                jm: "Pieces",
                needItem: [...needItem]
            }

            await setDoc(doc(db, "palletsTemplate", data.index.replace("/", "\\")), {
                ...template
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Container sx={{p: 2, minHeight: 'calc(100dvh - 162px)'}} maxWidth="md">
            <Grid container spacing={2}>

                <Backdrop sx={{zIndex: 99}} open={isSending}>
                    <CircularProgress color="inherit"/>
                </Backdrop>

                <Grid item xs={12} md={12}>
                    <Button onClick={onAddTemplate} fullWidth={true} variant="contained" sx={{my: 2}}>
                        Add new template
                    </Button>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Paper sx={{p: 2}}>
                        <TextField
                            value={data.index}
                            onInput={(event) => onInput(event.target.value, 'index')}
                            fullWidth={true}
                            id="standard-basic"
                            label="New Index"
                            variant="standard"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={{p: 2}}>
                        <TextField
                            value={data.description}
                            onInput={(event) => onInput(event.target.value, 'description')}
                            fullWidth={true}
                            id="standard-basic"
                            label="New Description"
                            variant="standard"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <Stack my={1} spacing={2}>
                            <article style={{whiteSpace: 'nowrap'}}>At Box {data.atBox}</article>
                            <IOSSlider
                                value={data.atBox}
                                onChange={(event) => onInput(event.target.value, 'atBox')}
                                step={1}
                                max={12}
                                marks
                                aria-label="Slider"
                            />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <Stack my={1} spacing={2}>
                            <article style={{whiteSpace: 'nowrap'}}>At Pallet {data.palletQta}</article>
                            <IOSSlider
                                value={data.palletQta}
                                onChange={(event) => onInput(event.target.value, 'palletQta')}
                                step={1}
                                max={84}
                                aria-label="Slider"
                            />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack my={1} spacing={2}>
                        <article>
                            Need items screen
                        </article>

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {needItem.map((el, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{el.index}</TableCell>
                                            <TableCell>{el.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Grid>


                {Array.from({length: needItemsCount}).map((el, index) => (
                    <NeedItem
                        setNeedItemsCount={setNeedItemsCount}
                        setNeedItem={setNeedItem}
                        itemsTemplate={itemsTemplate}
                        key={index}
                    />
                ))}
            </Grid>
        </Container>
    );
};

export default AddTemplate;