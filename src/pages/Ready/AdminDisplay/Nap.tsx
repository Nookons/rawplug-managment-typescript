import React, { FC, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import NeedDisplay from "./NeedDisplay";
import {useAppSelector} from "../../../hooks/storeHooks";
import {IItem, IItemTemplate} from "../../../types/Item";

interface Nap01Props {
    data: any[];
    items: IItem[];
    stockArray: any[];
    setStockArray: (newStockArray: any[]) => void;
    machine: string
}

const Nap: FC<Nap01Props> = ({ data, items , stockArray, setStockArray, machine }) => {
    const [totalArray, setTotalArray] = useState([]);


    useEffect(() => {
        setTotalArray([]);
    }, [data]);

    useEffect(() => {
        if (totalArray.length) {
            setStockArray((prev) => {
                const newArray = [];
                totalArray.forEach(i => {
                    const existingIndex = prev.findIndex(el => el.index === i.index);
                    if (existingIndex === -1) {
                        newArray.push({
                            index: i.index || "",
                            value: i.value || 0,
                        });
                    } else {
                        prev[existingIndex].value += i.value || 0;
                    }
                });

                console.log(newArray);
                // Concatenate the previous array with the new array, then filter out duplicates
                return prev.concat(newArray).filter((item, index, array) => array.findIndex(el => el.index === item.index) === index);
            });
        }
    }, [totalArray]);



    return (
        <div>
            <h4>{machine}</h4>
            <hr />
            <Grid container spacing={1}>
                {data && data.map((el, index) => {
                    const value = el.quantity - (el.currentQta ? el.currentQta : 0) ;
                    const currentQta = el.currentQta ? el.currentQta : 0;

                    if (value > 0) {
                        return (
                            <Grid key={index} item xs={12} md={4}>
                                <NeedDisplay
                                    data={data}
                                    currentQta={currentQta}
                                    setTotalArray={setTotalArray}
                                    index={el.index}
                                    quantity={value}
                                />
                            </Grid>
                        );
                    }
                })}
            </Grid>
            <hr />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Remains</TableCell>
                            <TableCell>Stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {totalArray.map((el, index) => {
                            let stock = 0;

                            items.forEach((i) => {
                                if (i.index === el.index) {
                                    stock += i.quantity
                                }
                            })

                            let remain = stock - el.value;

                            return (
                                <TableRow sx={{background: remain < 2000
                                        && "linear-gradient(90deg, #ffffff 0%, #ffe6cc 50%, #f7baba 100%)"
                                }} key={index}>
                                    <TableCell><p style={{whiteSpace: "nowrap"}}>{el.index}</p></TableCell>
                                    <TableCell><p>{el.value.toLocaleString()}</p></TableCell>
                                    <TableCell><p>{remain.toLocaleString()}</p></TableCell>
                                    <TableCell><p>{stock.toLocaleString()}</p></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Nap;
