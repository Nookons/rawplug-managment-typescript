import React, { FC, useEffect, useRef, useState } from 'react';
import {Alert, Autocomplete, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import { useAppSelector } from "../../../hooks/storeHooks";
import { IItem } from "../../../types/Item";
import { Link } from "react-router-dom";
import { ITEM_ROUTE } from "../../../utils/consts";
import MyPDFComponent from "./GeneratePdf";
import { useReactToPrint } from "react-to-print";
import PrintIcon from '@mui/icons-material/Print';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

import styles from './ReceiptReport.module.css'

const ReceiptReport: FC = () => {
    const { items } = useAppSelector(state => state.items);

    const [pickUser, setPickUser] = useState<string | null>(null);
    const [pickDate, setPickDate] = useState<string | null>(dayjs().format("YYYY-MM-DD"));
    const [arrayToDisplay, setArrayToDisplay] = useState<IItem[]>([]);
    const [removedDisplay, setRemovedDisplay] = useState<IItem[]>([]);
    const [removedArray, setRemovedArray] = useState<IItem[]>([]);

    useEffect(() => {
        const fetchRemovedItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "removed"));
                const removedItems = [];
                querySnapshot.forEach((doc) => {
                    removedItems.push(doc.data().item);
                });
                setRemovedArray(removedItems);
            } catch (error) {
                console.error("Error fetching removed items:", error);
                // Handle error, if necessary
            }
        };
        fetchRemovedItems();
    }, []);

    useEffect(() => {
        setArrayToDisplay([])
        setRemovedDisplay([])

        const filteredDisplay = items
            .filter(item => item.Created === pickUser)
            .filter(item => item.createdDate.slice(0, 10) === pickDate)

        const filteredRemovedDisplay = removedArray
            .filter(item => item.Created === pickUser)
            .filter(item => item.createdDate.slice(0, 10) === pickDate)

        setRemovedDisplay(filteredRemovedDisplay);
        setArrayToDisplay(filteredDisplay);
    }, [pickUser, pickDate]);

    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => contentToPrint.current,
        documentTitle: pickUser + ' | ' + pickDate,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: false,
    });

    const setDate = (date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setPickDate(formattedDate)
    }

    return (
        <div style={{ padding: 14, minHeight: "calc(100dvh - 160px)", backgroundColor: "white" }}>
            <div style={{ padding: 14 }} ref={contentToPrint}>
                <MyPDFComponent removedArray={removedDisplay} pickDate={pickDate} pickUser={pickUser} arrayToDisplay={arrayToDisplay} />
            </div>
            <div className={styles.InputsWrapper}>
                <Autocomplete
                    disablePortal
                    options={["nookon@icloud.com", "nikita@rawplug.com"]}
                    value={pickUser}
                    onChange={(event, value) => setPickUser(value)}
                    fullWidth={true}
                    renderInput={(params) => <TextField {...params} label="User" />}
                />
                {pickUser &&
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            defaultValue={dayjs()}
                            onChange={(date) => setDate(date)}
                            format={"dddd, MMMM DD, YYYY"}
                        />
                    </LocalizationProvider>
                }
            </div>
            {arrayToDisplay.length || removedArray.length ?
                <div style={{ margin: "14px 0", display: "flex", justifyContent: "flex-end" }}>
                    <Button variant={"contained"}  onClick={handlePrint}>
                        <PrintIcon />
                    </Button>
                </div>
                :
                <div style={{ marginTop: 24 }}>
                    <Alert severity="warning">
                        <article style={{ display: "flex", gap: 8, alignItems: "center" }}>On <h6>{pickDate}</h6> and for <h5>{pickUser}</h5> we can't find any item...</article>
                    </Alert>
                </div>
            }
            {arrayToDisplay.length > 0 &&
                <div>
                    <h5>Items at stock</h5>
                    <hr />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                        {arrayToDisplay.map((el: IItem) => (
                            <Card sx={{ minWidth: 340 }} variant={"outlined"} raised={true}>
                                <CardContent>
                                    <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                        <Link to={ITEM_ROUTE + "?_" + el.id}>{el.index}</Link> {el.createdDate}
                                    </Typography>
                                    <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                        {el.description}
                                    </Typography>
                                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8 }}>
                                        <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                            {el.fromDepartment}
                                        </Typography>
                                        <Typography variant={"h5"} marginTop={"12px"}>
                                            {el.quantity.toLocaleString()} {el.jm}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {removedDisplay.map((el: IItem) => (
                            <Card sx={{ minWidth: 340 }} style={{ backgroundColor: "rgba(0,0,0, 0.15)" }} variant={"outlined"} raised={true}>
                                <CardContent>
                                    <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                        <Link to={ITEM_ROUTE + "?_" + el.id}>{el.index}</Link> {el.createdDate}
                                    </Typography>
                                    <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                        {el.description}
                                    </Typography>
                                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8 }}>
                                        <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                            {el.fromDepartment}
                                        </Typography>
                                        <Typography variant={"h5"} marginTop={"12px"}>
                                            {el.quantity.toLocaleString()} {el.jm}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default ReceiptReport;
