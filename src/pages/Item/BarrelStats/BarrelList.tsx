import React, {FC, useEffect, useMemo, useState} from 'react';
import {IItem} from '../../../types/Item';
import {
    Box, Button,
    Divider, Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import barrelCheck from "../../../utils/PDF/BarrelCheck";

interface BarrelListProps {
    items: IItem[];
    searchTags: string[] | null;
}

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

const BarrelList: FC<BarrelListProps> = ({items, searchTags}) => {
    let offset = window.innerWidth;

    const [fullArray, setFullArray] = useState<IItem[]>([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const [sortedArray, setSortedArray] = useState<IItem[]>([]);


    const filteredAndSortedItems = (searchType: string) => {
        const filteredItems = items.filter(el => el.index === searchType);
        const sortedArray = [...filteredItems].sort((a, b) => b.batchNumber - a.batchNumber);
        return sortedArray;
    }

    useEffect(() => {
        setFullArray([])
        setTotalQuantity(0)

        if (searchTags) {
            let temporaryArray: IItem[] = [];

            searchTags.forEach(element => {
                const response = filteredAndSortedItems(element)
                temporaryArray.push(...response)
            })

            setFullArray([...temporaryArray])
        }
    }, [searchTags]);

    useEffect(() => {
        const sortedArray = fullArray.sort((a, b) => b.batchNumber - a.batchNumber);
        setSortedArray(sortedArray);

        const totalQuantity = sortedArray.reduce((sum, el) => sum + el.quantity, 0);
        setTotalQuantity(totalQuantity);
    }, [fullArray]);

    const handleGeneratePDF = async () => {
        setTimeout(async () => {
            await barrelCheck(sortedArray);
        }, 250);
    };

    return (
        <div>
            <Button
                fullWidth={true}
                onClick={handleGeneratePDF}
                variant={"contained"}
                sx={{mb: 2}}
            >
                Create check list
            </Button>
            <Grid container sx={{mb: 2}} spacing={2}>
                <Grid item xs={6} md={6}>
                    <Paper sx={{p: 1}}>
                        <article>Available pallets: ( {fullArray.length} )</article>
                    </Paper>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Paper sx={{p: 1}}>
                        <article>Total: ( {totalQuantity.toLocaleString()} kg )</article>
                    </Paper>
                </Grid>
            </Grid>

            <TableContainer id="pdf-content" component={Paper} variant={"elevation"}>
                <Table aria-label="simple table" size={"small"} align={"left"} padding={"normal"} cellSpacing={2}
                       cellPadding={15}>
                    <TableHead>
                        <TableRow>
                            <TableCell><h5>Index</h5></TableCell>
                            <TableCell><h5>Batch</h5></TableCell>
                            <TableCell><h5>Quantity</h5></TableCell>
                            {offset > 1000 ? <TableCell><h5>Remarks</h5></TableCell> : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedArray.map((el, index) => (
                            <TableRow style={{backgroundColor: el.quantity < 800 && "rgba(255,213,0,0.25)"}}
                                      key={index}>
                                <TableCell>
                                    <article style={{whiteSpace: "nowrap"}}>
                                        <Link to={ITEM_ROUTE + "?_" + el.id}>
                                            {el.index.slice(5)
                                                .replace('HYBRYDA', "HYB")
                                                .replace("STANDART", "STD")}
                                        </Link></article>
                                </TableCell>
                                <TableCell>
                                    <article
                                        style={{whiteSpace: "nowrap"}}>{getStatus(el.status)} {el.batchNumber} {el.quantity < 800 && "🔄 "}</article>
                                </TableCell>
                                <TableCell>
                                    <article>{el.quantity.toLocaleString()} kg</article>
                                </TableCell>
                                {offset > 1000 ? <TableCell>
                                    <article>{el.remarks}</article>
                                </TableCell> : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BarrelList;
