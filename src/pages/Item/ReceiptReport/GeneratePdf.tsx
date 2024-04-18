import React, {FC, useEffect, useState} from 'react';
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

const getMixer = (from: string, type: string) => {

    switch (from) {
        case "PWT70":
            if (type.toLowerCase() === "barrel") {
                return "| Mixers"
            } else {
                return "🔄"
            }
        default:
            return ""
    }

}

const MyPDFComponent: FC<MyPDFComponentProps> = ({removedArray, arrayToDisplay, pickUser, pickDate}) => {
    let total = removedArray.length + arrayToDisplay.length;


    if (arrayToDisplay || removedArray) {
        return (
            <div style={{
                margin: 24,
                maxWidth: "100%",
                zIndex: -1, // This zIndex might cause issues. Should be a positive integer.
                position: "absolute",
                top: '3vw', // Using a percentage value without defining parent's height might cause unexpected behavior.
                left: 0,
                right: 0,
                overflow: "hidden"
            }}>
                <div style={{display: "grid",width: "300dpi" , gridTemplateColumns: ".20fr .7fr .25fr .25fr", gap: 8, marginBottom: 24}}>
                    <h5 style={{whiteSpace: "nowrap"}}>Report details:</h5>
                    <article style={{whiteSpace: "nowrap"}}>Person: {pickUser}</article>
                    <article style={{whiteSpace: "nowrap"}}>Date: {pickDate}</article>
                    <article style={{whiteSpace: "nowrap"}}>Total items: {total}</article>
                </div>
                <TableContainer component={Paper} variant="elevation" elevation={2}>
                    <Table aria-label="simple table" size={"small"} padding={"normal"}>
                        <TableHead>
                            <TableRow>
                                <TableCell><h5>N</h5>
                                </TableCell> {/* Header cells shouldn't contain block-level elements like <h5>. */}
                                <TableCell><h5>Index</h5>
                                </TableCell> {/* Header cells shouldn't contain block-level elements like <h5>. */}
                                <TableCell>Created</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            style={{padding: "14px !important"}}> {/* Using inline styles with !important might not be a good practice. */}
                            {arrayToDisplay.map((el: IItem, index) => (
                                <TableRow  key={el.id}>
                                    <TableCell>
                                        <article>{index + 1}</article>
                                        {/* Using <article> tag here is not semantically correct. */}
                                    </TableCell>
                                    <TableCell>
                                        <p style={{whiteSpace: "nowrap"}}>{el.index}</p>
                                    </TableCell>
                                    <TableCell><p>{el.createdDate}</p></TableCell>
                                    <TableCell><p>{el.fromDepartment} {getMixer(el.fromDepartment, el.type)}</p></TableCell>
                                    <TableCell><p
                                        style={{whiteSpace: "nowrap"}}>{el.quantity.toLocaleString()} {el.jm}</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {removedArray.map((el: IItem, index) => (
                                <TableRow style={{backgroundColor: "rgba(0,0,0, 0.05)"}}  key={el.id}>
                                    <TableCell>
                                        <article>{index + 1}</article>
                                        {/* Using <article> tag here is not semantically correct. */}
                                    </TableCell>
                                    <TableCell>
                                        <p style={{whiteSpace: "nowrap"}}>{el.index}</p>
                                    </TableCell>
                                    <TableCell><p>{el.createdDate}</p></TableCell>
                                    <TableCell><p>{el.fromDepartment} {getMixer(el.fromDepartment, el.type)}</p></TableCell>
                                    <TableCell><p
                                        style={{whiteSpace: "nowrap"}}>{el.quantity.toLocaleString()} {el.jm}</p>
                                    </TableCell>
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
