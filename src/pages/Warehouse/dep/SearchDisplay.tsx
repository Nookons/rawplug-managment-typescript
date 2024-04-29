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
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';
import {UpdateItem} from "../../../utils/Items/UpdateItem";
import {addToUse} from "../../../utils/Items/AddToUse";
import MyModal from "../../../components/Modal/MyModal";

interface SearchDisplayProps {
    data: IItem[];
}

const SearchDisplay: FC<SearchDisplayProps> = ({data}) => {
    const {enqueueSnackbar} = useSnackbar();
    const {user, loading, error} = useAppSelector(state => state.user)

    const [backDrop, setBackDrop] = useState<boolean>(false);
    const [selectModal, setSelectModal] = useState(false);

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };

    const [quantity, setQuantity] = useState(0);

    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

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

    const onSelectMachineClick = (item: IItem) => {
        setSelectModal(true)
        setSelectedItem(item)
    }

    const onUseClick = async (machine: string) => {
        try {
            setBackDrop(true)

            const data = {
                palletID: selectedItem?.id,
                palletIndex: selectedItem?.index,
                palletType: selectedItem?.type,
            }

            await addToUse({machine, user, data})

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

                <MyModal isActive={selectModal} setIsActive={setSelectModal}>
                    <article>Item: {selectedItem?.id}</article>
                    <article>Quantity: {selectedItem?.quantity}</article>
                    <div style={{
                        display: "flex",
                        gap: 14,
                        flexDirection: "column",
                        marginTop: 14
                    }}>
                        <Button onClick={() => onUseClick('nap03')} fullWidth={true} variant={"contained"}>Nap-03</Button>
                        <Button onClick={() => onUseClick('nap02')} fullWidth={true} variant={"contained"}>Nap-02</Button>
                        <Button fullWidth={true} variant={"contained"}>Nap-01</Button>
                    </div>
                </MyModal>

                <div className={styles.MainInfo}>
                    <Typography variant="h6" gutterBottom component="h6">
                        ({data.length} pallets)
                    </Typography>
                    <Typography variant="h6" gutterBottom component="h6">
                        ({quantity.toLocaleString() + " " + data[0].jm})
                    </Typography>
                </div>
                {data.map((el: IItem) => (
                    <Card style={{backgroundColor: el.status === "On Machine" &&  "#ffd7d7"}} sx={{minWidth: 340}} variant={"outlined"} raised={true}>
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
                            {el.status === "On Machine" &&
                                <Alert sx={{my: 2}} severity="info"><p>This is on machine</p></Alert>
                            }
                            {el.status !== "On Machine" ?
                                <div className={styles.itemButtonGroup}>
                                    <Button onClick={() => onSelectMachineClick(el)} variant="contained"
                                            fullWidth={true} color={"success"}>
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
                                :
                                <div>
                                    <Button onClick={() => onRemove(el)} variant="contained" fullWidth={true}
                                            color={"error"}>
                                        <DeleteIcon/>
                                    </Button>
                                </div>
                            }
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