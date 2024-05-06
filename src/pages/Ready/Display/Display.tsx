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
    ListItemText
} from "@mui/material";
import {DeletePallet} from "../../../utils/Ready/Delete";
import {IItem} from "../../../types/Item";
import {LineChart, PieChart} from "@mui/x-charts";

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

                if (isIndex === -1) {
                    indexTotals.push({
                        label: el.index,
                        value: el.quantity,
                        pallets: 1
                    });
                } else {
                    indexTotals[isIndex].value += el.quantity;
                    indexTotals[isIndex].pallets += 1;
                }
            });
        }

        setGraphicData(indexTotals)
    }, [data]);


    const [isSending, setIsSending] = useState<boolean>(false);

    const onDelete = async (id: number) => {
        try {
            setIsSending(true)
            const response = await DeletePallet(id)

        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsSending(false);
            }, 250)
        }
    }

    const [isStatistic, setIsStatistic] = useState<boolean>(false);

    return (
        <div className={styles.Main}>
            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>


            <Drawer open={isStatistic} onClose={() => setIsStatistic(false)}>
                <Box sx={{ width: 350, p: 2}} role="presentation" onClick={() => setIsStatistic(false)}>
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
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -5, color: 'gray' },
                                }
                            ]}
                            slotProps={{
                                legend: { hidden: true },
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
                                        secondary={<article>All qunatity: {el.value.toLocaleString()} | Pallets: {el.pallets}</article>}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Button fullWidth={true} onClick={() => setIsStatistic(false)} variant={"contained"}>Close</Button>
                </Box>
            </Drawer>

            <Button fullWidth={true} onClick={() => setIsStatistic(true)} variant={"contained"}>Open statistic</Button>

            <Grid item xs={12} md={6}>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    Ready pallets on stock
                </Typography>
                <List dense={true}>
                    {!data.length &&
                        <Alert severity="info">
                            <article>It's empty here... 🙈</article>
                        </Alert>
                    }
                    {data.map((item) => (
                        <ListItem
                            key={item.id}
                            sx={{gap: 2}}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon onClick={() => onDelete(item.id)}/>
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar sx={{width: 76, height: 76}} variant={"rounded"} src={item?.imgUrl}>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<article>{item?.index} <p style={{color: "#737373"}}>{item?.created}</p>
                                </article> || 'Unnamed Item'}
                                secondary={<p
                                    style={{color: "#737373"}}>{item?.quantity.toLocaleString()} (pcs)</p> || 'Unnamed Item'}
                            />

                        </ListItem>
                    ))}
                </List>
            </Grid>
        </div>
    );
};

export default Display;
