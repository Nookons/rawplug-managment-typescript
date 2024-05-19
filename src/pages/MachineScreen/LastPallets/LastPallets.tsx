import React, {FC, useEffect, useState} from 'react';
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../../firebase";
import {IMachine} from "../MachineScreen";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import {PALLET_ROUTE} from "../../../utils/consts";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import palletsByIdPdf from "../../../utils/PDF/PalletsById";

interface LastPalletsProps {
    id: number
}

const LastPallets: FC<LastPalletsProps> = ({id}) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, "readyPallets"), where("planId", "==", id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempArray = []
            querySnapshot.forEach((doc) => {
                tempArray.push(doc.data())
            });
            console.log(tempArray);
            setData(tempArray)
        });
    }, [id]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const generatePalletsPdf = async () => {
        try {
            const response = await palletsByIdPdf(data, id)
        } catch (error) {
            console.log(error);
        }
    }

    if (data.length) {
        return (
            <TableContainer component={Paper}>
                <IconButton onClick={generatePalletsPdf} sx={{mx: 1}} aria-label="add">
                    <PictureAsPdfIcon/>
                </IconButton>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Qta</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((el, index) => {

                            return (
                                <TableRow>
                                    <TableCell><Link to={PALLET_ROUTE}>{el.index}</Link></TableCell>
                                    <TableCell><p>{el.quantity}</p></TableCell>
                                    <TableCell><p>{el.createDate.slice(24)}</p></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

export default LastPallets;