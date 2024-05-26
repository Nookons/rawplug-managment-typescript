import React, {FC, useEffect, useState} from 'react';
import AddPlan from "../AddPlan/AddPlan";
import {
    Box,
    Button,
    Container, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField
} from "@mui/material";
import dayjs from "dayjs";
import {collection, deleteDoc, doc, onSnapshot, query, setDoc, where} from "firebase/firestore";
import {db} from "../../../firebase";
import {IMachine} from "../MachineScreen";

interface StartWorkProps {
    machine: string;
    setMachine: (value: string) => void;
}

const StartWork: FC<StartWorkProps> = ({machine, setMachine}) => {
    const currentDate = dayjs().format("YYYY-MM-DD")
    const [plansData, setPlansData] = useState([]);

    const [isDialog, setIsDialog] = useState<boolean>(false);

    const [current, setCurrent] = useState<IMachine | null>(null);

    useEffect(() => {
        const q = query(collection(db, machine), where("isCurrent", "==", false));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempArray = []
            querySnapshot.forEach((doc) => {
                tempArray.push(doc.data())
            });
            setPlansData(tempArray as IMachine[])
        });
    }, [machine]);

    const onStart = async () => {
        try {
            await setDoc(doc(db, machine, "current"), {
                ...current,
                createDate: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
                isCurrent: true,
                currentQta: 0
            });

            await deleteDoc(doc(db, machine, 'plan_' + current.id));
            setIsDialog(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onOpenDialog = (data: any) => {
        setCurrent(data)
        setIsDialog(true)
    }


    return (
        <Grid container spacing={2}>

            <Dialog
                open={isDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Ви дійсно хочете розпочати цей продукт?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Після запуску ви не зможете змінити цей індекс... ❤️
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialog(false)}>Disagree</Button>
                    <Button onClick={() => onStart()} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>

            <Grid item xs={12} md={12}>
                <Stack my={1} spacing={2}>
                    {plansData.map(el => (
                        <Grid sx={{
                            alignItems: "center",
                            background: "#43ff00 linear-gradient(270deg, #43ff00 0%, #ffffff 100%)",
                            p: 2,
                            borderRadius: 2
                        }} container spacing={2}>
                            <Grid sx={{p: "0 !important"}} item xs={4} md={4}>
                                <article>{el.index}</article>
                            </Grid>
                            <Grid sx={{p: "0 !important", textAlign: "center"}} item xs={4} md={4}>
                                <article>{el.quantity.toLocaleString()}</article>
                            </Grid>
                            <Grid sx={{p: "0 !important", textAlign: "right"}} item xs={4} md={4}>
                                <Button onClick={() => onOpenDialog(el)} variant="contained">Почати</Button>
                            </Grid>
                        </Grid>
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default StartWork;