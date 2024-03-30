import React, {FC} from 'react';
import {Document, Page, Text} from '@react-pdf/renderer';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {IItem} from "../../../types/Item";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";

interface MyPDFComponentProps {
    removedArray: IItem[];
    arrayToDisplay: IItem[];
    pickUser: string | null;
    pickDate: string | null;
}

const MyPDFComponent: FC<MyPDFComponentProps> = ({removedArray, arrayToDisplay, pickUser, pickDate}) => {
    let total = 0;

    if (removedArray && arrayToDisplay) {
        total = arrayToDisplay.length + removedArray.length
    }

    if (arrayToDisplay && removedArray) {
        return (
            <div style={{
                margin: 24,
                maxWidth: "100%",
                zIndex: -1,
                position: "absolute",
                top: '3vw',
                left: 0,
                right: 0
            }}>
                <div style={{display: "grid", gridTemplateColumns: ".20fr .7fr .25fr .25fr", gap: 8, marginBottom: 24}}>
                    <h5>Report details:</h5>
                    <article>Person: {pickUser}</article>
                    <article>Date: {pickDate}</article>
                    <article>Total items: {total}</article>
                </div>
                <TableContainer component={Paper} variant="elevation" elevation={2}>
                    <Table aria-label="simple table" size={"small"} padding={"normal"}>
                        <TableHead>
                            <TableRow>
                                <TableCell><h5>N</h5></TableCell>
                                <TableCell><h5>Index</h5></TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{padding: "14px !important"}}>
                            {arrayToDisplay.map((el: IItem, index) => (
                                <TableRow key={el.id}>
                                    <TableCell>
                                        <article>{index + 1}</article>
                                    </TableCell>
                                    <TableCell>
                                        <p style={{whiteSpace: "nowrap"}}>{el.index}</p>
                                    </TableCell>
                                    <TableCell><p>{el.createdDate.slice(10)}</p></TableCell>
                                    <TableCell><p>{
                                        el.fromDepartment
                                            .replace("PWT70", "PWT70 | Mixers")
                                    }</p></TableCell>
                                    <TableCell><p style={{whiteSpace: "nowrap"}}>{el.quantity.toLocaleString()} {el.jm}</p></TableCell>
                                </TableRow>
                            ))}
                            {removedArray.length > 0 &&
                                <div style={{
                                display: "flex",
                                justifyContent: "center",
                                padding: "8px 0"
                            }}>🔴
                            </div>
                            }
                            {removedArray.map((el: IItem, index) => (
                                <TableRow style={{backgroundColor: "rgba(0,0,0,0.05)"}} key={el.id}>
                                    <TableCell>
                                        <article>{index + 1}</article>
                                    </TableCell>
                                    <TableCell>
                                        <p style={{whiteSpace: "nowrap"}}>{el.index}</p>
                                    </TableCell>
                                    <TableCell><p>{el.createdDate.slice(10)}</p></TableCell>
                                    <TableCell><p>{
                                        el.fromDepartment
                                            .replace("PWT70", "PWT70 | Mixers")
                                    }</p></TableCell>
                                    <TableCell><p style={{whiteSpace: "nowrap"}}>{el.quantity.toLocaleString()} {el.jm}</p></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    return (
        <div>None data...</div>
    )
};

export default MyPDFComponent;
