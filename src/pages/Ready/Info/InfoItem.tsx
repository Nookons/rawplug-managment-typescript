import React, {useEffect, useState} from 'react';
import PalletData175 from '../../../assets/PalletData175ml.json';
import PalletData300 from '../../../assets/PalletData300ml.json';
import {Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import styles from './InfoItem.module.css'

const InfoItem = () => {
    const href = window.location.href
    const id = href.split("_")[1]

    const [data, setData] = useState();

    useEffect(() => {
        const find = PalletData175.find((item) => item.id === Number(id))

        if (!find) {
            const find = PalletData300.find((item) => item.id === Number(id))
            setData(find)
        } else {
            setData(find)
        }
    }, []);

    return (
        <div className={styles.Main}>
            <div className={styles.Wrapper}>
                <Avatar
                    sx={{width: '100%', height: "auto"}}
                    src={`${data?.imgUrl}`} // Use template literals for string concatenation
                    variant="rounded"
                >
                    R
                </Avatar>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                }}>
                    <h2>{data?.index}</h2>
                    <article>{data?.description}</article>
                    <hr/>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <article>Capacity:</article>
                                    </TableCell>
                                    <TableCell>
                                        <article>{data?.capacity}</article>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <article>Pallet Boxes:</article>
                                    </TableCell>
                                    <TableCell>
                                        <article>{data?.palletQta}</article>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <article>Pallet Quantity:</article>
                                    </TableCell>
                                    <TableCell>
                                        <article>{data?.palletQta * data?.atBox}</article>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <article>At box:</article>
                                    </TableCell>
                                    <TableCell>
                                        <article>{data?.atBox}</article>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <article>Pallet:</article>
                                    </TableCell>
                                    <TableCell>
                                        <article>{data?.pallet}</article>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <h5>Need Item for 1 bottle</h5>
                    <hr/>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {data?.needItem.map((el, index) => (
                                    <TableRow>
                                        <TableCell>
                                            <article style={{textAlign: 'center'}}>{index + 1})</article>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <h6>{el.index}</h6>
                                                <p style={{color: "#7a7a7a"}}>{el.description}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p style={{whiteSpace: "nowrap"}}>📦 ({el.quantity}) {data.jm}</p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default InfoItem;