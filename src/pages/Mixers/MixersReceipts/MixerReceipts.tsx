import React, {useEffect, useState} from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../../../firebase";
import {
    Avatar,
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";

const MixerReceipts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "PWT70", "mixerReceipts"), (doc) => {
            console.log("Current data: ", doc.data().templats);
            setData(doc.data().templats)
        });
    }, []);

    return (
        <div style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: 14,
            minHeight: "calc(100dvh - 190px)"
        }}>
            {data.map((element, index) => {

                return (
                    <Card key={index} sx={{minWidth: 240}} variant={"outlined"} raised={true}>
                        <CardContent
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14
                            }}
                        >
                            <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                <h5>Receipt: {element.index}</h5>
                                <p style={{color: "gray"}}>{element.description}</p>
                            </Typography>

                            <Typography style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14
                            }} fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                <h5 style={{backgroundColor: "rgba(0,0,0, 0.15)", padding: 14, borderRadius: 4}}>ETAP (1) Mixing time: {element.firstStep.time}m</h5>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {Object.entries(element.firstStep).map(([key, value]) => {

                                                if (key !== "time") {
                                                    return (
                                                        <TableRow>
                                                            <TableCell><article>{key}</article></TableCell>
                                                            <TableCell><article>{value} kg</article></TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <h5 style={{backgroundColor: "rgba(0,0,0, 0.15)", padding: 14, borderRadius: 4}}>ETAP (2) Mixing time: {element.secondaryStep.time}m</h5>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {Object.entries(element.secondaryStep).map(([key, value]) => {

                                                if (key !== "time") {
                                                    return (
                                                        <TableRow>
                                                            <TableCell><article>{key}</article></TableCell>
                                                            <TableCell><article>{value} kg</article></TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <h5 style={{backgroundColor: "rgba(0,0,0, 0.15)", padding: 14, borderRadius: 4}}>ETAP (3) Mixing time: {element.thirdStep.time}m</h5>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {Object.entries(element.thirdStep).map(([key, value]) => {

                                                if (key !== "time") {
                                                    return (
                                                        <TableRow>
                                                            <TableCell><article>{key}</article></TableCell>
                                                            <TableCell><article>{value} kg</article></TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};

export default MixerReceipts;