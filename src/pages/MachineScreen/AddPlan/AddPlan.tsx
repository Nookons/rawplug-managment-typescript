import React, {FC, useState} from 'react';
import {
    Autocomplete,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid, IconButton,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import dataIndexes from "../../../assets/PalletData300ml.json";
import dayjs from "dayjs";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {Add, Favorite, FavoriteBorder} from "@mui/icons-material";
import StartWork from "../StartWork/StartWork";

interface AddPlanProps {
    machine: string;
    setMachine: (value: string) => void;
}

const AddPlan:FC <AddPlanProps> = ({machine, setMachine}) => {
    const [isCheck, setIsCheck] = useState(false);

    const [data, setData] = useState({
        index: "",
        quantity: 0
    });

    const addNewPlan = async () => {
        const template = {
            id: Date.now(),
            createDate: dayjs().format("YYYY-MM-DD"),
            machine: machine,
            ...data
        }
        await setDoc(doc(db, machine, "plan_" + template.id.toString()), {
            ...template
        });
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
            <Grid sx={{alignItems: "center"}} container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Autocomplete
                        disablePortal
                        fullWidth={true}
                        value={data.index}
                        onChange={(event, value) => setData((prev) => ({...prev, index: value ? value.toString() : ""}))}
                        options={dataIndexes ? dataIndexes.map(el => el.index) : []}
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