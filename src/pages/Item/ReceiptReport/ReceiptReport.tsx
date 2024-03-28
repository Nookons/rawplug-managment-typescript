import React, {FC, useEffect, useRef, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Tooltip
} from "@mui/material";
import {useAppSelector} from "../../../hooks/storeHooks";
import {IItem} from "../../../types/Item";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import MyButton from "../../../components/MyButton/MyButton";
import styles from './ReceiptReport.module.css';
import MyPDFComponent from "./GeneratePdf";
import {useReactToPrint} from "react-to-print";
import PrintIcon from '@mui/icons-material/Print';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


const ReceiptReport: FC = () => {
    const {items} = useAppSelector(state => state.items);


    const [uniqUser, setUniqUser] = useState<string[]>([]);
    const [uniqDate, setUniqDate] = useState<string[]>([]);
    const [pickUser, setPickUser] = useState<string | null>(null);
    const [pickDate, setPickDate] = useState<any | null>(dayjs().format("YYYY-MM-DD"));
    const [arrayToDisplay, setArrayToDisplay] = useState<IItem[]>([]);



    useEffect(() => {
        const tempArrayUsers: string[] = [];

        items.forEach((el: IItem) => {
            if (!tempArrayUsers.includes(el.Created)) {
                tempArrayUsers.push(el.Created);
            }
        });

        setUniqUser(tempArrayUsers);
    }, [items]);

    useEffect(() => {
        if (pickUser) {
            const tempArrayDates: string[] = [];

            items.forEach((el: IItem) => {
                if (el.Created === pickUser && !tempArrayDates.includes(el.createdDate.slice(0, 10))) {
                    tempArrayDates.push(el.createdDate.slice(0, 10));
                }
            });

            setUniqDate(tempArrayDates);
        }
    }, [pickUser, items]);

    useEffect(() => {
        if (pickDate) {
            const filteredByUser = items.filter(item => item.Created === pickUser);
            const filteredByDate = filteredByUser.filter(item => item.createdDate.slice(0, 10) === pickDate);
            setArrayToDisplay(filteredByDate.reverse());
        }
    }, [pickDate, pickUser, items]);

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: pickUser + ' | ' + pickDate,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    const setDate = (date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setPickDate(formattedDate)
    }

    useEffect(() => {
        console.log(arrayToDisplay);
    }, [arrayToDisplay]);


    return (
        <div style={{padding: 14, minHeight: "calc(100dvh - 160px)", backgroundColor: "white"}}>
            <div style={{padding: 14}} ref={contentToPrint}>
                <MyPDFComponent pickDate={pickDate} pickUser={pickUser} arrayToDisplay={arrayToDisplay}/>
            </div>
            <div className={styles.InputsWrapper}>
                <Autocomplete
                    disablePortal
                    options={uniqUser}
                    value={pickUser}
                    onChange={(event, value) => setPickUser(value)}
                    fullWidth={true}
                    renderInput={(params) => <TextField {...params} label="User"/>}
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
            {arrayToDisplay.length > 0 &&
                <div style={{margin: "14px 0", display: "flex", justifyContent: "flex-end"}}>
                    <MyButton click={() => {
                        handlePrint(null, () => contentToPrint.current);
                    }}>
                        <PrintIcon/>
                    </MyButton>
                </div>

            }
            {arrayToDisplay.length > 0 ?
                <TableContainer component={Paper} variant="elevation">
                    <Table aria-label="simple table" size={"small"}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Index</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arrayToDisplay.map((el: IItem) => (
                                <TableRow key={el.id}>
                                    <TableCell>
                                        <Link to={ITEM_ROUTE + "?_" + el.id}>
                                            {el.index}
                                        </Link>
                                    </TableCell>
                                    <TableCell><p>{el.createdDate.slice(10)}</p></TableCell>
                                    <TableCell><p>{el.quantity.toLocaleString()}</p></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <div style={{marginTop: 24}}>
                    {pickUser &&
                        <Alert severity={"info"} variant={"filled"}>
                            We can't find any item for {pickDate}
                        </Alert>
                    }
                </div>
            }
        </div>
    );
};

export default ReceiptReport;
