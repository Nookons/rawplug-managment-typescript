import React, {useEffect, useState} from 'react';
import {collection, query, onSnapshot} from 'firebase/firestore';
import {db} from '../../../firebase';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Display.module.css';
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {DeletePallet} from "../../../utils/Ready/Delete";
import {IItem} from "../../../types/Item";
import {LineChart, PieChart} from "@mui/x-charts";
import MyModal from "../../../components/Modal/MyModal";
import {Link} from "react-router-dom";
import {DISPLAY_ROUTE, HOME_ROUTE} from "../../../utils/consts";

const Display = () => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const [data, setData] = useState([]);

    const [graphicData, setGraphicData] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'pallets'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({id: doc.id, ...doc.data()});
            });
            setData(items);
        });

        // Cleanup function for onSnapshot
        return () => {
            unsubscribe();
        };
    }, []); // No dependencies, only runs on mount

    useEffect(() => {
        const indexTotals = [];

        if (data) {
            data.forEach((el) => {
                const isIndex = indexTotals.findIndex(item => item.label === el.index);
                const propertyToUpdate = el.quantity < el.maxQuantity ? 'notFull' : 'pallets';
                const propertyToNotUpdate = el.quantity < el.maxQuantity ? 'pallets' : 'notFull';

                if (isIndex === -1) {
                    const newEntry = {
                        label: el.index,
                        value: el.quantity,
                        [propertyToUpdate]: 1,
                        [propertyToNotUpdate]: 0
                    };
                    indexTotals.push(newEntry);
                } else {
                    indexTotals[isIndex].value += el.quantity;
                    indexTotals[isIndex][propertyToUpdate] += 1;
                }
            });
        }

        setGraphicData(indexTotals)
    }, [data]);


    const [isSending, setIsSending] = useState<boolean>(false);

    const [itemToRemove, setItemToRemove] = useState<any>();

    const openModal = (item: number) => {
        setItemToRemove(item)
        setConfirmModal(true)
    }

    const onDelete = async () => {
        try {
            setIsSending(true)
            const response = await DeletePallet(itemToRemove)

        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsSending(false);
                setConfirmModal(false);
            }, 250)
        }
    }

    const [isStatistic, setIsStatistic] = useState<boolean>(false);
    const [confirmModal, setConfirmModal] = useState<boolean>(false);

    return (
        <div className={styles.Main}>
            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>


            <Drawer open={isStatistic} onClose={() => setIsStatistic(false)}>
                <Box sx={{width: 350, p: 2}} role="presentation" onClick={() => setIsStatistic(false)}>
                    {graphicData.length ?
                        <PieChart
                            onItemClick={(event, pieItemIdentifier, item) => event.stopPropagation()}
                            series={[
                                {
                                    arcLabel: (item) => `${item.label?.slice(0, 1)}`,
                                    arcLabelMinAngle: 45,
                                    data: graphicData.map(el => el),
                                    innerRadius: 30,
                                    outerRadius: 130,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                    startAngle: -90,
                                    endAngle: 360,
                                    cx: 165,
                                    cy: 150,
                                    highlightScope: {faded: 'global', highlighted: 'item'},
                                    faded: {innerRadius: 30, additionalRadius: -5, color: 'gray'},
                                }
                            ]}
                            slotProps={{
                                legend: {hidden: true},
                            }}
                            width={350}
                            height={300}
                        />
                        : <Alert severity="info">
                            <article>It's empty here... 🙈</article>
                        </Alert>
                    }


                    <List>
                        {graphicData.map((el, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemText
                                        primary={<h5>{el.label}</h5>}
                                        secondary={
                                            <Box sx={{display: "flex", gap: 2, mt: 1}}>
                                                <article>
                                                    All qunatity: {el.value.toLocaleString()}
                                                </article>
                                                {el.pallets > 0 && <p>🟢 {el.pallets}  </p>}
                                                {el.notFull > 0 && <p>🟡 {el.notFull}  </p>}
                                            </Box>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Button fullWidth={true} onClick={() => setIsStatistic(false)} variant={"contained"}>Close</Button>
                </Box>
            </Drawer>

            <Button fullWidth={true} onClick={() => setIsStatistic(true)} variant={"contained"}>Open statistic</Button>

            <MyModal isActive={confirmModal} setIsActive={setConfirmModal}>
                <div>
                    <Typography variant="h5" gutterBottom component="h6" display={"inline-flex"} textAlign={"center"}>
                        Are you sure you want to remove this item?
                    </Typography>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: 14
                    }}>
                        <Button onClick={onDelete} fullWidth={true} variant="contained" sx={{my: 2}} color={"success"}>
                            Yes
                        </Button>
                        <Button onClick={() => setConfirmModal(false)} fullWidth={true} variant="contained" sx={{my: 2}} color={"error"}>
                            No
                        </Button>
                    </div>
                </div>
            </MyModal>

            <TableContainer sx={{my: 2}} component={Paper} variant={"outlined"}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h5>Index</h5></TableCell>
                            <TableCell><h5>Quantity</h5></TableCell>
                            <TableCell><h5>Remove</h5></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((el, index) => (
                            <TableRow
                                sx={{ background: el.quantity < el.maxQuantity && "radial-gradient(circle, #ffffff 0%, #ffffdc 100%)",}}
                                key={index}>
                                <TableCell>
                                    <Link to={DISPLAY_ROUTE} style={{whiteSpace: "nowrap"}}>{el.index}</Link>
                                    <p style={{color: "#737373"}}>{el.created}</p>
                                </TableCell>
                                <TableCell sx={{padding: 1, textAlign: "center"}}>
                                    <p>{el.quantity.toLocaleString()} <span style={{color: "#737373"}}>pcs</span></p>
                                </TableCell>
                                <TableCell sx={{padding: 1, textAlign: "center"}}>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon onClick={() => openModal(el)}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!data.length && <Alert severity="info">
                <article>It's empty here... 🙈</article>
            </Alert>}
        </div>
    );
};

export default Display;
