import React, {FC, useEffect, useState} from 'react';
import {
    Autocomplete, Backdrop,
    Button,
    Checkbox, CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid, IconButton,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import dataIndexes from "../../../assets/PalletData300ml.json";
import dayjs from "dayjs";
import {collection, doc, onSnapshot, query, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {Add, Favorite, FavoriteBorder} from "@mui/icons-material";
import StartWork from "../StartWork/StartWork";

interface AddPlanProps {
    machine: string;
    setMachine: (value: string) => void;
}

const AddPlan:FC <AddPlanProps> = ({machine, setMachine}) => {
    const [isCheck, setIsCheck] = useState(false);

    const [palletTemplates, setPalletTemplates] = useState([]);

    useEffect(() => {
        setPalletTemplates([])

        const q = query(collection(db, "palletsTemplate"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setPalletTemplates((prev) => [...prev, doc.data()])
            });
        });
    }, []);

    const [data, setData] = useState({
        index: "",
        quantity: 0
    });

    const [isSending, setIsSending] = useState<boolean>(false);

    const addNewPlan = async () => {
       try {
           setIsSending(true)
           const template = {
               id: Date.now(),
               createDate: dayjs().format("YYYY-MM-DD"),
               isCurrent: false,
               machine: machine,
               ...data
           }
           await setDoc(doc(db, machine, "plan_" + template.id.toString()), {
               ...template
           });
           setData({
               index: "",
               quantity: 0
           })
       } catch (error) {
           console.log(error);
       } finally {
           setTimeout(() => {
               setIsSending(false)
           }, 250)
       }
    }

    const onInput = (value: string) => {
        const newString = value.toUpperCase().replace(" ", "-")
        setData((prev) => ({...prev, index: newString}))
    }

    if (!isCheck) {
        return (
            <>
                <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox
                            icon={<FavoriteBorder/>}
                            checkedIcon={<Favorite/>}
                            checked={isCheck}
                            onChange={(event, checked) => setIsCheck(true)}
                        />}
                        label={<p>Щоб додати новий план, встановіть цей прапорець</p>}
                    />
                </FormGroup>
                <StartWork machine={machine} setMachine={setMachine} />
            </>
        )
    }

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            icon={<FavoriteBorder/>}
                            checkedIcon={<Favorite/>}
                            checked={isCheck}
                            onChange={(event, checked) => setIsCheck(false)}
                        />}
                    label={<p>Щоб повернутися назад, встановіть цей прапорець</p>}
                />
            </FormGroup>

            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Grid sx={{alignItems: "center", mb: 8}} container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Autocomplete
                        disablePortal
                        fullWidth={true}
                        value={data.index}
                        onInput={(event) => onInput(event.target.value)}
                        onChange={(event, value) => setData((prev) => ({...prev, index: value ? value.toString() : ""}))}
                        options={palletTemplates ? palletTemplates.map(el => el.index) : []}
                        renderInput={(params) => <TextField {...params} label="Index"/>}
                    />
                </Grid>
                <Grid item xs={10} md={3.5}>
                    <TextField
                        id="outlined-basic"
                        fullWidth={true}
                        value={data.quantity}
                        onChange={(event) => setData((prev) => ({...prev, quantity: Number(event.target.value)}))}
                        label={<article>Кількість за планом</article>}
                        variant="outlined"
                        type={"Number"}
                    />
                </Grid>
                <Grid item xs={2} md={0.5}>
                    <IconButton onClick={addNewPlan} aria-label="add" size={"large"}>
                        <Add/>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

export default AddPlan;