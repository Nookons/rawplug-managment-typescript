import React, {FC, useEffect, useState} from 'react';
import {IItem} from '../../../types/Item';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import styles from "../Print/Print.module.css";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";

interface BarrelListProps {
    searchType: string;
    items: IItem[];
}

const BarrelList: FC<BarrelListProps> = ({searchType, items}) => {
    const [tempArray, setTempArray] = useState<IItem[]>([]);
    const [allQuantity, setAllQuantity] = useState<number>(0);

    let offset = window.innerWidth;

    useEffect(() => {
        let quantitySum = 0;
        const filteredItems = items.filter(el => el.index === searchType);

        filteredItems.forEach(el => {
            quantitySum += el.quantity;
        });

        const sortedArray = [...filteredItems].sort((a, b) => a.batchNumber - b.batchNumber).reverse();

        setTempArray(sortedArray);
        setAllQuantity(quantitySum);

        console.log(filteredItems);
    }, [searchType, items]);

    return (
        <div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", margin: "14px 0", gap: 4, justifyContent: "center", alignItems: "center"}}>
                <div style={{padding: 14, backgroundColor: "#eaeaea"}}>
                    <article>Available pallets: ({tempArray.length})</article>
                </div>
                <div style={{padding: 14, backgroundColor: "#eaeaea"}}>
                    <article>Total weight: ({allQuantity.toLocaleString()} kg)</article>
                </div>
            </div>
            <TableContainer key={searchType} variant={"elevation"}>
                <Table aria-label="simple table" size={"small"} align={"left"} padding={"normal"} cellSpacing={2}
                       cellPadding={15}>
                    <TableHead>
                        <TableRow>
                            <TableCell><h5>Index</h5></TableCell>
                            <TableCell><h5>Batch</h5></TableCell>
                            <TableCell><h5>Quantity</h5></TableCell>
                            {offset > 1000 ? <TableCell ><h5>Remarks</h5></TableCell> : null}
                        </TableRow>
                    </TableHead>
                    {tempArray.map((el, index) => (
                        <TableBody className={styles.Wrapper}>
                            <TableRow>
                                <TableCell>
                                    <article style={{whiteSpace: "nowrap"}}>
                                        <Link to={ITEM_ROUTE + "?_" + el.id} >
                                            {el.index.slice(5)
                                                .replace('HYBRYDA', "HYB")
                                                .replace("STANDART", "STD")}
                                        </Link></article>
                                </TableCell>
                                <TableCell><p
                                    style={{whiteSpace: "nowrap"}}>{el.status.toLowerCase() === 'available' ? '✅' : '⛔'} {el.batchNumber}</p>
                                </TableCell>
                                <TableCell ><p>{el.quantity.toLocaleString()} kg</p></TableCell>
                                {offset > 1000 ? <TableCell ><p>{el.remarks}</p></TableCell> : null}
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>
    );
};

export default BarrelList;
