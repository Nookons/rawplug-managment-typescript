import React, {useEffect, useState} from 'react';
import {Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Nap from "./Nap";
import {useAppSelector} from "../../../hooks/storeHooks";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../firebase";

const AdminDisplay = () => {
    const {items} = useAppSelector(state => state.items);
    const [stockArray, setStockArray] = useState([]);

    const [dataNap01, setDataNap01] = useState([]);
    const [dataNap02, setDataNap02] = useState([]);
    const [dataNap03, setDataNap03] = useState([]);

    useEffect(() => {
        const q1 = query(collection(db, "nap01"));
        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
            const tempData = [];
            querySnapshot.forEach((doc) => {
                tempData.push(doc.data());
            });
            setDataNap01(tempData);
        });

        const q2 = query(collection(db, "nap02"));
        const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
            const tempData = [];
            querySnapshot.forEach((doc) => {
                tempData.push(doc.data());
            });
            setDataNap02(tempData);
        });

        const q3 = query(collection(db, "nap03"));
        const unsubscribe3 = onSnapshot(q3, (querySnapshot) => {
            const tempData = [];
            querySnapshot.forEach((doc) => {
                tempData.push(doc.data());
            });
            setDataNap03(tempData);
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        };
    }, []);

    useEffect(() => {
        setStockArray([])
    }, [dataNap01, dataNap02, dataNap03]);

    useEffect(() => {
        console.log(stockArray);
    }, [stockArray]);

    return (
        <Container sx={{minHeight: 'calc(100dvh - 162px)', p: 2}} maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Paper sx={{p: 2}} elevation={8}>
                        <Nap
                            data={dataNap01}
                            items={items}
                            stockArray={stockArray}
                            setStockArray={setStockArray}
                            machine="nap01"
                        />
                        <br/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={{p: 2}} elevation={8}>
                        <Nap
                            data={dataNap02}
                            items={items}
                            stockArray={stockArray}
                            setStockArray={setStockArray}
                            machine="nap02"
                        />
                        <br/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={{p: 2}} elevation={8}>
                        <Nap
                            data={dataNap03}
                            items={items}
                            stockArray={stockArray}
                            setStockArray={setStockArray}
                            machine="nap03"
                        />
                        <br/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDisplay;
