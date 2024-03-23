import React, {FC, useEffect, useState} from 'react';
import {IItem} from "../../../../types/Item";
import {Link, useNavigate} from "react-router-dom";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip} from "@mui/material";
import {ITEM_ROUTE} from "../../../../utils/consts";
import {getMovement} from "../../../../utils/GetMovement";

interface SearchBatchProps {
    items: IItem[]
}


const SearchBatch: FC<SearchBatchProps> = ({items}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<IItem[]>(items);

    const navigate = useNavigate();

    useEffect(() => {
        const filtered = items.filter(item =>
            item.batchNumber?.toString().includes(inputValue.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [inputValue, items]);

    return (
        <div style={{minHeight: "calc(100dvh - 260px)"}}>
            <TextField
                fullWidth={true}
                value={inputValue}
                type={"Number"}
                onChange={(event) => setInputValue(event.target.value)}
                id="outlined-basic"
                label="Search"
                variant="outlined"
                placeholder="Please write batch here for search..."
            />

            <div style={{display: "flex", flexDirection: "column", gap: 14, padding: "14px 0"}}>
                {filteredItems.slice(0, 10).map((item: IItem, index) => (
                    <TableContainer style={{ backgroundColor: "#efefef" }}>
                        <Table aria-label="simple table" padding={"checkbox"}>
                            <TableBody>
                                <TableRow key={index}>
                                    <TableCell>
                                        <Tooltip title={`Open ${item.index}`} arrow>
                                            <h5 style={{padding: 4}}><Link to={ITEM_ROUTE + "?_" + item.id}>{item.index}</Link></h5>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <p style={{padding: "14px 4px", whiteSpace: "nowrap"}}>Status: {item.status.toLowerCase() === 'available' ? '✅ ' : '⛔ '}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <p style={{padding: 4, whiteSpace: "nowrap"}}>Batch number: {item.batchNumber}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p style={{padding: 4, whiteSpace: "nowrap"}}>Quantity: {item.quantity} kg</p>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))}
            </div>
        </div>
    );
};

export default SearchBatch;