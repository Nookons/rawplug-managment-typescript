import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useAppSelector } from "../../../hooks/storeHooks";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import { IItem } from "../../../types/Item";
import {ITEM_ROUTE} from "../../../utils/consts";


const getStatus = (status: string) => {
    switch (status) {
        case "Available":
            return "✅"
        case "Hold":
            return "⛔"
        default:
            return "⚠️"
    }
}

const ByBatch = () => {
    const navigation = useNavigate();

    const { items, loading, error } = useAppSelector(state => state.items);
    const options = Array.from(new Set(items.map(item => item.index)));

    const [searchValue, setSearchValue] = useState<string>("");
    const [searchData, setSearchData] = useState<IItem[]>([]);

    const setSearch = (value: string) => {
        if (value?.length) {
            console.log(searchValue);
            navigation("?_" + value);
            setSearchValue(value);
        }
    }

    useEffect(() => {
        const filtered = items.filter(item =>
            item.batchNumber?.toString().includes(searchValue)
        );
        setSearchData(filtered);
    }, [searchValue, items]);

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Batch"
                variant="outlined"
                placeholder="Please write here the batch number for search"
                type="number"
                fullWidth={true}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
            />
            <TableContainer sx={{my: 2}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Batch</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchData.map((el, index) => (
                            <TableRow>
                                <TableCell><Link to={ITEM_ROUTE + "?_" + el.id}>{
                                    el.index
                                        .replace("STANDART", "STD")
                                        .replace("Q-CM-", "")
                                        .replace("Q-CMB-", "")
                                }</Link></TableCell>
                                <TableCell>
                                    <article>{getStatus(el.status)} {el.batchNumber}</article>
                                </TableCell>
                                <TableCell><p>{el.quantity.toLocaleString()} {el.jm}</p></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ByBatch;
