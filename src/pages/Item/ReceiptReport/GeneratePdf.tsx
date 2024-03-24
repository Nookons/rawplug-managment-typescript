import React, {FC} from 'react';
import {Document, Page, Text} from '@react-pdf/renderer';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {IItem} from "../../../types/Item";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";

interface MyPDFComponentProps {
    arrayToDisplay: IItem[];
    pickUser: string;
    pickDate: string;
}

const MyPDFComponent: FC<MyPDFComponentProps> = ({arrayToDisplay, pickUser, pickDate}) => {
    if (arrayToDisplay) {
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
                    <article>Total items: {arrayToDisplay.length}</article>
                </div>
                <TableContainer component={Paper} variant="elevation" elevation={2}>
                    <Table aria-label="simple table" size={"small"} padding={"checkbox"}>
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
                                    <TableCell><p>{el.fromDepartment}</p></TableCell>
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
