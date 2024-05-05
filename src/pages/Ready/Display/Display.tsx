import React, {useEffect, useState} from 'react';
import {collection, query, onSnapshot} from 'firebase/firestore';
import {db} from '../../../firebase';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Display.module.css';
import {Alert, Backdrop, CircularProgress} from "@mui/material";
import {DeletePallet} from "../../../utils/Ready/Delete";

const Display = () => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const [data, setData] = useState([]);

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

    return (
        <div className={styles.Main}>
            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Grid item xs={12} md={6}>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    Ready pallets on stock
                </Typography>
                <List dense={true}>
                    {!data.length &&
                    <Alert severity="info"> <article>It's empty here... 🙈</article> </Alert>
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
