import React, {FC, useEffect, useState} from 'react';
import {
    TextField,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody, TableContainer, Button, Tooltip, Autocomplete, CircularProgress, Alert
} from "@mui/material";
import {IItem} from "../../../../types/Item";
import {getMovement} from "../../../../utils/GetMovement";
import {Link, useNavigate} from "react-router-dom";
import {ITEM_ROUTE} from "../../../../utils/consts";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../../firebase";

interface SearchProps {
    items: IItem[];
}

const getColorByStatus = (status: string) => {
    switch (status.toLowerCase()) {
        case 'odzysk' :
            return '#FFFC9B'
        case 'hold' :
            return '#F28585'
        default:
            return 'rgb(243,243,243)'
    }
}

const Search: FC<SearchProps> = ({items}) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [indexValue, setIndexValue] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<IItem[]>([]);



    useEffect(() => {
        setFilteredItems([])

        const filteredIndex = items.filter(item =>
            item.index?.toString().includes(indexValue ? indexValue.toUpperCase() : '')
        );

        const filtered = filteredIndex.filter(item =>
            item.quantity?.toString().includes(inputValue)
        );

        setFilteredItems(filtered);

        console.log(filteredItems)
    }, [inputValue, indexValue, items]);

    const options = Array.from(new Set(items.map(item => item.index)));

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: 24
        }}>
            <Autocomplete
                disablePortal
                options={options} // Access myIndex property from indexTemplate object
                fullWidth={true}
                onChange={(event, value) => setIndexValue(value)}
                renderInput={(params) => <TextField {...params} label="Index" />}
            />
            <TextField
                fullWidth={true}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                id="outlined-basic"
                label="Search by quantity"
                variant="outlined"
                type={"Number"}
                placeholder="Please write pallet quantity here for search..."
            />

            {
                filteredItems.length > 0
                    ?   <Alert severity="info"><p>We find {filteredItems.length} items for you ❤️</p></Alert>
                    :   <Alert severity="error"><p>This product doesn't exist 😕</p></Alert>
            }

            <div style={{display: "flex", flexDirection: "column", gap: 14, padding: "14px 0"}}>
                {filteredItems.slice(0, 25).map((item: IItem, index) => (
                    <TableContainer key={index} style={{
                        gap: 14,
                        backgroundColor: getColorByStatus(item.status),
                    }} component={Paper} variant={"elevation"}>
                        <Table aria-label="simple table">
                            {/*<TableHead>
                                <TableRow>
                                    <TableCell>Target</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>*/}
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Link to={ITEM_ROUTE + "?_" + item.id}><h5>{item.index}</h5></Link>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.createdDate}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <p>{item.fromDepartment}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.quantity + ' ' + item.jm}</p>
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
