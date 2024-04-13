import React, {FC, useEffect, useState} from 'react';
import styles from "../Warehouse.module.css";
import {IItem} from "../../../types/Item";
import {Alert, Backdrop, Button, Card, CardContent, Chip, CircularProgress, Skeleton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import BatterySaverIcon from "@mui/icons-material/BatterySaver";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import DeleteIcon from "@mui/icons-material/Delete";
import {onDeleteItem} from "../../../utils/Items/DeleteItem";
import {useAppSelector} from "../../../hooks/storeHooks";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import {UpdateItem} from "../../../utils/Items/UpdateItem";

interface SearchDisplayProps {
    data: IItem[];
}

const SearchDisplay: FC<SearchDisplayProps> = ({data}) => {
    const { enqueueSnackbar } = useSnackbar();
    const {user, loading, error} = useAppSelector(state => state.user)

    const [backDrop, setBackDrop] = useState<boolean>(false);

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(0);

        data.forEach(el => {
            setQuantity((prevState) => (prevState + el.quantity))
        })
    }, [data]);

    const onRemove = async (item: IItem) => {
        try {
            setBackDrop(true)
            const response = await onDeleteItem(item, user)
            handleClickVariant('success', "item was delete")
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setBackDrop(false)
            }, 250)
        }
    }
    const onUseClick = async (item: IItem) => {
        try {
            setBackDrop(true)
            const id = item.id
            const data = {
                status: "On machine"
            }
            const response = await UpdateItem({id, user, data})
            handleClickVariant('success', "item was added")
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setBackDrop(false)
            }, 250)
        }
    }

    if (data && data.length) {
        return (
            <div className={styles.itemWrapper}>
                <Backdrop style={{zIndex: 9}} open={backDrop}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <div className={styles.MainInfo}>
                    <Typography variant="h6" gutterBottom component="h6">
                        ({data.length} pallets)
                    </Typography>
                    <Typography variant="h6" gutterBottom component="h6">
                        ({quantity.toLocaleString() + " " + data[0].jm})
                    </Typography>
                </div>
                {data.map((el: IItem) => (
                    <Card sx={{minWidth: 340}} variant={"outlined"} raised={true}>
                        <CardContent>
                            <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                <Link to={ITEM_ROUTE + "?_" + el.id}>{el.index} </Link>
                                {el.createdDate} by {el.Created}
                            </Typography>
                            {el.lastChange &&
                                <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                    Last changed: {el.lastChange}
                                </Typography>
                            }
                            <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                {el.description}
                            </Typography>
                            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8}}>
                                <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                    {el.fromDepartment} ➡️ {el.toDepartment}
                                </Typography>
                                <Typography variant={"h5"} marginTop={"12px"}>
                                    {el.quantity.toLocaleString()} {el.jm}
                                </Typography>
                            </div>
                            <div className={styles.itemButtonGroup}>
                                <Button onClick={() => onUseClick(el)} variant="contained" fullWidth={true} color={"success"}>
                                    <BatterySaverIcon/> Add on use
                                </Button>
                                <Button variant="contained" fullWidth={true} color={"info"}>
                                    <AddBusinessIcon/> Send to MSP
                                </Button>
                                <Button onClick={() => onRemove(el)} variant="contained" fullWidth={true}
                                        color={"error"}>
                                    <DeleteIcon/>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (data && !data.length) {
        return (
            <Alert severity="info">Sorry, we don't have that item.</Alert>
        )
    }

    return (
        <>
            <Skeleton variant="rectangular" width={"50vw"} height={60}/>
        </>
    )
};

export default function IntegrationNotistack({data}) {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={5000}
            maxSnack={3}
        >
            <SearchDisplay data={data}/>
        </SnackbarProvider>
    );
}