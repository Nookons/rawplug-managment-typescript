import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";


import styles from './ReceiptReport.module.css'
import {
    Alert,
    Chip,
    Container, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../../firebase";
import {IMachine} from "../../MachineScreen/MachineScreen";
import {IItem} from "../../../types/Item";
import {Add} from "@mui/icons-material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ReceiptReport: FC = () => {
    const {user, loading, error} = useAppSelector(state => state.user);

    const [data, setData] = useState<IItem[]>([]);

    const [dataByDate, setDataByDate] = useState([]);


    useEffect(() => {
        if (user && user.email) {
            const q = query(collection(db, "items"), where("Created", "==", user.email));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tempArray: IItem[] = [];
                querySnapshot.forEach((doc) => {
                    tempArray.push(doc.data() as IItem);
                });
                setData(tempArray.reverse());
            });

            // Clean up the subscription on unmount
            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        const indexTotals: { createdDate: string; dateItems: IItem[]; value: number }[] = [];

        data.forEach((el: IItem) => {
            const dateIndex = indexTotals.findIndex(item => item.createdDate.slice(0, 10) === el.createdDate.slice(0, 10));

            if (dateIndex === -1) {
                indexTotals.push({
                    createdDate: el.createdDate.slice(0, 10),
                    dateItems: [el],
                    value: el.quantity,
                });
            } else {
                indexTotals[dateIndex].dateItems.push(el);
                indexTotals[dateIndex].value += el.quantity;
            }
        });
        setDataByDate(indexTotals)
    }, [data]);



    return (
        <Container sx={{minHeight: "calc(100dvh - 162px)", p: 2}} maxWidth="md">
            <article> Here you have personal statistic for: {user?.email} </article>
            <hr/>
            {dataByDate.slice(0, 5).map((item) => (
                <>
                    <Paper sx={{
                        p: 2,
                        my: 2,
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}>
                        <article>{item.createdDate}</article>
                        <IconButton aria-label="add">
                            <PictureAsPdfIcon/>
                        </IconButton>
                    </Paper>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {item.dateItems.map((el) => (
                                    <TableRow>
                                        <TableCell><p>{el.index}</p></TableCell>
                                        <TableCell><p>{el.fromDepartment}</p></TableCell>
                                        <TableCell><p style={{whiteSpace: "nowrap"}}>{el.quantity.toLocaleString()} {el.jm.replace("Pieces", "Pcs")}</p></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ))}
        </Container>
    );
};

export default ReceiptReport;
