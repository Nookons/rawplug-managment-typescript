import React, {FC, useEffect, useState} from 'react';
import AddPlan from "../AddPlan/AddPlan";
import {Button, Container, Divider, Grid, MenuItem, Stack, TextField} from "@mui/material";
import dayjs from "dayjs";
import {collection, deleteDoc, doc, onSnapshot, query, setDoc, where} from "firebase/firestore";
import {db} from "../../../firebase";
import {IMachine} from "../MachineScreen";

interface StartWorkProps {
    machine: string;
    setMachine: (value: string) => void;
}

const StartWork:FC <StartWorkProps> = ({machine, setMachine}) => {
    const currentDate = dayjs().format("YYYY-MM-DD")
    const [plansData, setPlansData] = useState([]);


    useEffect(() => {
        const q = query(collection(db, machine), where("createDate", "==", currentDate));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempArray = []
            querySnapshot.forEach((doc) => {
                tempArray.push(doc.data())
            });
            setPlansData(tempArray as IMachine[])
        });
    }, [machine]);

    const onStart = async (data: IMachine) => {
        await setDoc(doc(db, machine, "current"), {
            ...data,
            createDate: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
            currentQta: 0
        });

        await deleteDoc(doc(db, machine, 'plan_' + data.id));
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                {plansData.map(el => (
                    <Stack
                        my={1}
                        direction="row"
                        sx={{
                            alignItems: "center",
                            background: "#43ff00 linear-gradient(270deg, #43ff00 0%, #ffffff 100%)",
                            p: 2,
                            borderRadius: 2
                        }}
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={2}
                    >
                        <article>{el.index}</article>
                        <article>{el.quantity.toLocaleString()}</article>
                        <Button onClick={() => onStart(el)} variant="contained">Почати</Button>
                    </Stack>
                ))}
            </Grid>
        </Grid>
    );
};

export default StartWork;