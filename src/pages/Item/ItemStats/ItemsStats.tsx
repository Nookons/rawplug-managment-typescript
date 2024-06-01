import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box, CircularProgress,
    Container,
    Divider,
    Grid, IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import {IItem} from "../../../types/Item";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../firebase";
import Head from "./Head/Head";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import {Delete} from "@mui/icons-material";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {onDeleteItem, onRestoreItem} from "../../../utils/Items/DeleteItem";
import {useAppSelector} from "../../../hooks/storeHooks";

const ItemsStats = () => {
    const {user, loading, error} = useAppSelector(state => state.user)
    const currentIndex = window.location.href.split("_")[1]

    const [data, setData] = useState<IItem[]>([]);
    const [removedData, setRemovedData] = useState<IItem[]>([]);

    const [totalArray, setTotalArray] = useState<IItem[]>([]);


    useEffect(() => {
        setData([])
        setRemovedData([])

        const q = query(collection(db, "items"));
        const r = query(collection(db, "removed"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items: IItem[] = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().index === currentIndex) {
                    items.push(doc.data() as IItem);
                }
            });
            setData(items);
        });

        const rUnsubscribe = onSnapshot(r, (querySnapshot) => {
            const removedItems: IItem[] = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().item.index === currentIndex) {
                    removedItems.push(doc.data().item as IItem);
                }
            });
            setRemovedData(removedItems);
        });

    }, [currentIndex]);
    useEffect(() => {
        let tempArray: IItem[] = [];

        data.forEach(el => {
            tempArray.push({...el, removed: false});
        });

        removedData.forEach(el => {
            tempArray.push({...el, removed: true});
        });

        setTotalArray(tempArray);
    }, [data, removedData]);

    const [filteredArray, setFilteredArray] = useState([]);

    useEffect(() => {
        const sorted = totalArray.toSorted((a, b) => new Date(a.createdDate.replace(" at ", " ")).getTime() - new Date(b.createdDate.replace(" at ", " ")).getTime());
        const reversed = [...sorted].reverse();
        setFilteredArray(reversed)
    }, [totalArray]);

    const [isAction, setIsAction] = useState(false);

    const onTrashClick = async (type: string, currentItem: IItem) => {
        try {
            setIsAction(true)

            switch (type) {
                case "remove" :
                    await onDeleteItem(currentItem, user)
                    break;
                case "restore" :
                    await onRestoreItem(currentItem, user)
                    break;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsAction(false);
        }
    }


    return (
        <Container sx={{p: 2, minHeight: "calc(100dvh - 162px)"}} maxWidth="xl">
            <Backdrop sx={{zIndex: 99}} open={isAction}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Head
                        currentIndex={currentIndex}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Stack
                        my={2}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={2}
                    >
                        <Box sx={{border: "1px solid grey", px: 2, py: 1}}>
                            <article>Available pallets ▶️ {data.length}</article>
                        </Box>
                        <Box sx={{border: "1px solid grey", px: 2, py: 1}}>
                            <article>All pallets ▶️ {totalArray.length}</article>
                        </Box>
                    </Stack>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table" size={"small"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Qta</TableCell>
                                    <TableCell><article>Actions</article></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredArray.map((el, index) => {
                                    const currentItem = el

                                    return (
                                        <TableRow sx={{backgroundColor: el.removed && "#eeeeee"}}>
                                            <TableCell>
                                                <Link style={{whiteSpace: "nowrap"}} to={ITEM_ROUTE + "?_" + el.id}>{el.index}</Link>
                                            </TableCell>
                                            <TableCell><p>{el.quantity.toLocaleString()}</p></TableCell>
                                            <TableCell>
                                                {el.removed === false
                                                    ?
                                                    <IconButton onClick={() => onTrashClick('remove', currentItem)} aria-label="delete">
                                                        <Delete/>
                                                    </IconButton>
                                                    :
                                                    <IconButton onClick={() => onTrashClick('restore', currentItem)}aria-label="delete">
                                                        <RestoreFromTrashIcon/>
                                                    </IconButton>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ItemsStats;
