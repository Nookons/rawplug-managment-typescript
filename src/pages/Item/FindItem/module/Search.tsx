import React, {FC, useEffect, useState} from 'react';
import {
    TextField,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody, TableContainer, Button, Tooltip
} from "@mui/material";
import {IItem} from "../../../../types/Item";
import {getMovement} from "../../../../utils/GetMovement";
import {useNavigate} from "react-router-dom";
import {ITEM_ROUTE} from "../../../../utils/consts";

interface SearchProps {
    items: IItem[];
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

const Search: FC<SearchProps> = ({items}) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<IItem[]>(items);

    const navigate = useNavigate();

    useEffect(() => {
        // Фильтрация элементов на основе введенного значения
        const filtered = items.filter(item =>
            item.PalletReceipt.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [inputValue, items]);

    return (
        <div>
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
                {filteredItems.slice(0, 5).map((item: IItem, index) => (
                    <TableContainer style={{
                        gap: 14,
                        backgroundColor: getColorByStatus(item.status),
                    }} component={Paper}>
                        <Table aria-label="simple table">
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
                                        <p>{item.PalletReceipt}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.description}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={index}>
                                    <TableCell>
                                        <p>Date:</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>Added: {item.createdDate}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>Last change: {item.lastChange}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={index}>
                                    <TableCell>
                                        <p>Movement:</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>From: {item.Sender + ' | ' + getMovement(item.Sender)}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>To: {item.Recipient + ' | ' + getMovement(item.Recipient)} </p>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={index}>
                                    <TableCell>
                                        <p>Created by:</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.Created}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.userUid}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={index}>
                                    <TableCell>
                                        <p>Quantity:</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.quantity + ' ' + item.JM}</p>
                                    </TableCell>
                                    <TableCell>
                                        {item.barrel?.first ? <p>{'1) ' + item.barrel.first + '  kg'} </p> : null}
                                        {item.barrel?.secondary ?
                                            <p>{'2) ' + item.barrel.secondary + '  kg'} </p> : null}
                                        {item.barrel?.third ? <p>{'3) ' + item.barrel.third + '  kg'} </p> : null}
                                        {item.barrel?.four ? <p>{'4) ' + item.barrel.four + '  kg'} </p> : null}
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

export default Search;
