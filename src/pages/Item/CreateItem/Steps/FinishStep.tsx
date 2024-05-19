import React, {FC} from 'react';
import {
    Alert,
    Autocomplete,
    Box, Button, Card,
    CardContent,
    InputAdornment,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {IItemTemplate} from "../../../../types/Item";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../../utils/consts";
import styles from "../../../Warehouse/Warehouse.module.css";
import BatterySaverIcon from "@mui/icons-material/BatterySaver";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import DeleteIcon from "@mui/icons-material/Delete";

interface FirstStepProps {
    data: IItemTemplate;
    setData: (value: string) => void;
}

const FinishStep: FC<FirstStepProps> = ({data, setData}) => {

    const onDescriptionChange = (value: string) => {
        setData((prevState) => ({...prevState, description: value}))
    }

    return (
        <>
            <Alert sx={{mb: 2}} severity="info">
                <article>Перевірте шаблон перед додаванням.</article>
            </Alert>
            <Card sx={{minWidth: 240}} variant={"outlined"} raised={true}>
                <CardContent>
                    <Typography variant="h6" gutterBottom component="h6">
                        {data.index} | {data.type}
                    </Typography>

                    <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                        {data.description}
                    </Typography>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8}}>
                        <Typography variant={"h5"} marginTop={"12px"}>
                            {data.palletQta.toLocaleString()} {data.jm}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default FinishStep;