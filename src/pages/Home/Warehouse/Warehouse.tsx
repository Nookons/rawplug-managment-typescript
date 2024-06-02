import React, {useEffect, useState} from 'react';
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../firebase";
import {IItem, IItemTemplate} from "../../../types/Item";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppSelector} from "../../../hooks/storeHooks";
import {Link} from "react-router-dom";
import {HOME_ROUTE, ITEMS_STATS_ROUTE} from "../../../utils/consts";

const Warehouse = () => {
    const {items, loading, error} = useAppSelector(state => state.items)
    const [itemsTemplate, setItemsTemplate] = useState<IItemTemplate[]>([]);
/*
    useEffect(() => {
        setItemsTemplate([])

        const q = query(collection(db, "itemsTemplate"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setItemsTemplate((prev) => [...prev, doc.data()])
            });
        });
    }, []);*/



    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><p>Index</p></TableCell>
                        <TableCell><p>Quantity</p></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itemsTemplate.map((el, index) => {
                        let pallets = 0;
                        let value = 0;

                        items.forEach((i: IItem) => {
                            if (i.index === el.index) {
                                pallets += 1
                                value += i.quantity
                            }
                        })

                        if (value > 0) {
                            return (
                                <TableRow>
                                    <TableCell><Link to={ITEMS_STATS_ROUTE + "?_" + el.index}>{el.index}</Link></TableCell>
                                    <TableCell><article>{value.toLocaleString()}</article></TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Warehouse;