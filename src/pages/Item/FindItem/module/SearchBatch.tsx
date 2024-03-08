import React, {FC, useEffect, useState} from 'react';
import {IItem} from "../../../../types/Item";
import {useNavigate} from "react-router-dom";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip} from "@mui/material";
import {ITEM_ROUTE} from "../../../../utils/consts";
import {getMovement} from "../../../../utils/GetMovement";

interface SearchBatchProps {
    items: IItem[]
}


const getColorByStatus = (status: string) => {
    switch (status.toLowerCase()){
        case 'odzysk' :
            return '#FFFC9B'
        case 'hold' :
            return '#F28585'
        default:
            return 'rgb(195,235,233)'
    }
}

const SearchBatch: FC<SearchBatchProps> = ({items}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<IItem[]>(items);

    const navigate = useNavigate();

    useEffect(() => {
        // Фильтрация элементов на основе введенного значения
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
                onChange={(event) => setInputValue(event.target.value)}
                id="outlined-basic"
                label="Search"
                variant="outlined"
                placeholder="Please write pallet index here for search..."
            />

            <div style={{display: "flex", flexDirection: "column", gap: 14, padding: "14px 0"}}>
                {filteredItems.slice(0, 10).map((item: IItem, index) => (
                    <TableContainer style={{
                        gap: 14,
                        backgroundColor: getColorByStatus(item.status),
                    }} component={Paper}>
                        <Table aria-label="simple table" padding={"checkbox"}>
                            {/*<TableHead>
                                <TableRow>
                                    <TableCell>Target</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>*/}
                            <TableBody>
                                <TableRow key={index}>
                                    <TableCell>
                                        <Tooltip title={`Open ${item.index}`} arrow>
                                            <Button onClick={() => navigate(ITEM_ROUTE + "?_" + item.id)}><p>{item.index}</p></Button>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <p style={{padding: 14, whiteSpace: "nowrap"}}>Status: {item.status.toLowerCase() === 'available' ? '✅ ' : '⛔ '}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <p style={{padding: 14, whiteSpace: "nowrap"}}>Batch number: {item.batchNumber}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p style={{padding: 14, whiteSpace: "nowrap"}}>Quantity: {item.quantity} kg</p>
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