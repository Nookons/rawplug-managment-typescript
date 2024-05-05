import React, {useEffect, useState} from 'react';
import PalletData175 from '../../../assets/PalletData175ml.json';
import PalletData300 from '../../../assets/PalletData300ml.json';
import {
    Accordion, AccordionDetails, AccordionSummary, Alert,
    Avatar,
    Box,
    Card,
    CardContent,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField, Typography,
} from '@mui/material';
import {ExpandMore} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {HOME_ROUTE, INFO_FULL_ITEM_ROUTE} from "../../../utils/consts"; // If you have styles, import them here
import styles from './InfoPage.module.css'

const InfoPage = () => {
    const [value, setValue] = useState<string>("");

    const [data175, setData175] = useState<any[]>([]);
    const [data300, setData300] = useState<any[]>([]);

    useEffect(() => {
        const filtered175 = PalletData175.filter(item => item.index?.toString().includes(value.toUpperCase()));
        const filtered300 = PalletData300.filter(item => item.index?.toString().includes(value.toUpperCase()));

        setData175(filtered175);
        setData300(filtered300);

    }, [value]);

    return (
        <div className={styles.Main}>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Search..."
                    variant="outlined"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    fullWidth={true}
                    sx={{my: 2}}
                />
            </div>
            <div className={styles.Wrapper}>
                <TableContainer component={Paper}>
                    <div>
                        <Alert severity="info"><article>We have {data175.length} template for (175) ml</article></Alert>
                    </div>
                    <Table aria-label="simple table">
                        {data175.map((el, index) => (
                            <TableBody>
                                <TableCell><article>{index + 1}</article></TableCell>
                                <TableCell>
                                    <Avatar
                                        sx={{ width: 56, height: 56 }}
                                        src={`${el?.imgUrl}`} // Use template literals for string concatenation
                                        variant="rounded"
                                    >
                                        R
                                    </Avatar>
                                </TableCell>
                                <TableCell><Link to={INFO_FULL_ITEM_ROUTE + "?_" + el.id}>{el.index}</Link></TableCell>
                            </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                <TableContainer component={Paper}>
                    <div>
                        <Alert severity="info"><article>We have {data300.length} template for (300) ml</article></Alert>
                    </div>
                    <Table aria-label="simple table">
                        {data300.map((el, index) => (
                            <TableBody>
                                <TableCell><article>{index + 1}</article></TableCell>
                                <TableCell>
                                    <Avatar
                                        sx={{ width: 56, height: 56 }}
                                        src={`${el?.imgUrl}`} // Use template literals for string concatenation
                                        variant="rounded"
                                    >
                                        R
                                    </Avatar>
                                </TableCell>
                                <TableCell><Link to={INFO_FULL_ITEM_ROUTE + "?_" + el.id}>{el.index}</Link></TableCell>
                            </TableBody>
                        ))}
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default InfoPage;
