import React, {useEffect, useState} from 'react';
import styles from './Item.module.css'

import SettingsItem from "./SettingsItem";
import {Alert, Autocomplete, Backdrop, Button, CircularProgress, TextField, Tooltip} from "@mui/material";
import {SnackbarProvider, VariantType, useSnackbar, enqueueSnackbar} from 'notistack';
import {doc, onSnapshot, updateDoc} from "firebase/firestore"
import {db} from "../../firebase";
import {IItem} from "../../types/Item";

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {onDeleteItem} from "../../utils/Items/DeleteItem";
import {useAppSelector} from "../../hooks/storeHooks";
import {HOME_ROUTE} from "../../utils/consts";
import MyModal from "../../components/Modal/MyModal";
import MyButton from "../../components/MyButton/MyButton";
import dayjs from "dayjs";

export interface ICurrentItem {
    loading: boolean;
    error: string;
    item: IItem | null;
}

const Item = () => {
    const navigate = useNavigate();
    const {user, loading, error} = useAppSelector(state => state.user)

    const currentURL = window.location.href;
    const id = currentURL.split('_')[1]

    const [currentItem, setCurrentItem] = useState<ICurrentItem>({loading: false, error: "", item: null,});
    const [editModal, setEditModal] = useState(false);

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };

    useEffect(() => {
        setCurrentItem((prevState) => ({...prevState, loading: true}))
        const unsub = onSnapshot(doc(db, "items", "item_" + id), (doc) => {
            try {
                if (doc.exists()) {
                    setCurrentItem({loading: false, error: "", item: doc.data() as IItem})
                } else {
                    throw new Error("Document does not exist, it's look like he removed")
                }
            } catch (error) {
                handleClickVariant("error", error.toString())
                setCurrentItem((prevState) => ({...prevState, loading: false, error: error.toString()}))
            }
        });
    }, []);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const actions = [
        { icon: <EditIcon />, name: 'Edit' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <DeleteIcon />, name: 'Remove' },
        {
            icon: currentItem.item?.status === "Hold" ? <LockOpenIcon /> :  <LockIcon />,
            name: currentItem.item?.status === "Hold" ? 'Unlock' : 'Lock'
        }
    ];

    const onChangeStatus = async (name: string) => {
        const itemRef = doc(db, "items", "item_" + currentItem.item?.id);

        switch (name) {
            case "Lock":
                const answer = prompt('' +
                    'Eng: Please add a reason why you are blocking this item  ' +
                    'UA: Будь ласка, додайте причину, чому ви блокуєте цей пункт'
                )
                if (answer) {
                    try {
                        await updateDoc(itemRef, {
                            ...currentItem.item,
                            remarks: answer,
                            status: "Hold",
                            lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
                            changePerson: user.email
                        });
                        handleClickVariant("success", "Item was blocked because  " + answer)
                    } catch (error) {
                        handleClickVariant("error", error.toString())
                    }
                } else {
                    handleClickVariant("error", "Item was not blocked cause you don't write the reason")
                }
                break
            case "Unlock":
                try {
                    await updateDoc(itemRef, {
                        ...currentItem.item,
                        status: "Available",
                        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
                        changePerson: user.email
                    });
                    handleClickVariant("success", "Item unlocked")
                } catch (error) {
                    handleClickVariant("error", error.toString())
                }
                break
            case "Remove":
                try {
                    const response = await onDeleteItem(currentItem.item, user)
                    if (response) {
                        handleClickVariant("success", "Item was removed success")
                        navigate(HOME_ROUTE);
                    }
                } catch (error) {
                    handleClickVariant("error", error.toString())
                }
                break
            case "Edit":
                setEditModal(true)
                break
            default:
                console.log("Not egual any case")
        }
    }

    const [editData, setEditData] = useState({
        quantity: 0,
        jm: '',
        fromDepartment: '',
        toDepartment: '',
    });

    useEffect(() => {
        setEditData((prevState) => ({
            ...prevState,
            quantity: currentItem.item?.quantity,
            jm: currentItem.item?.jm,
            fromDepartment: currentItem.item?.fromDepartment,
            toDepartment: currentItem.item?.toDepartment,
        }))
    }, [currentItem.item]);

    const onAddEditClick = async () => {
        const itemRef = doc(db, "items", "item_" + currentItem.item?.id);
        console.log(editData);

        try {
            await updateDoc(itemRef, {
                ...editData,
                lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
                changePerson: user.email
            });
            handleClickVariant("success", "Item was success changed")
            setEditModal(false)
        } catch (error) {
            handleClickVariant("error", error.toString())
        }
    }

    return (
        <div style={{
            backgroundColor: currentItem.item?.status === "Available"
                ? 'rgb(38, 118, 104)'
                : 'rgb(207,87,66)'
        }} className={styles.Main}>
            <Backdrop style={{zIndex: 99}} open={currentItem.loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <MyModal isActive={editModal} setIsActive={setEditModal}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14
                }}>
                    <div style={{display: "grid", gridTemplateColumns: "1fr 0.5fr", gap: 8}}>
                        <TextField
                            onChange={(event) => setEditData((prevState) => ({...prevState, quantity: event.target.value}))}
                            fullWidth={true}
                            type={"Number"}
                            id="outlined-basic"
                            defaultValue={currentItem.item?.quantity}
                            label="Quantity"
                            variant="outlined"
                        />
                        <Autocomplete
                            onChange={(event, value) => setEditData((prevState) => ({...prevState, jm: value}))}
                            disablePortal
                            defaultValue={currentItem.item?.jm}
                            options={["Peaces", "kg"]}
                            renderInput={(params) => <TextField {...params} label="Type"/>}
                        />
                    </div>
                    <Autocomplete
                        onChange={(event, value) => setEditData((prevState) => ({...prevState, fromDepartment: value}))}
                        disablePortal
                        defaultValue={currentItem.item?.fromDepartment}
                        options={["PWT70", "PWT30", "PWT10", "MSP"]}
                        renderInput={(params) => <TextField {...params} label="From"/>}
                    />
                    <Autocomplete
                        onChange={(event, value) => setEditData((prevState) => ({...prevState, toDepartment: value}))}
                        disablePortal
                        defaultValue={currentItem.item?.toDepartment}
                        options={["PWT70", "PWT30", "PWT10", "MSP"]}
                        renderInput={(params) => <TextField {...params} label="To"/>}
                    />
                    <MyButton click={onAddEditClick}>Save</MyButton>
                </div>
            </MyModal>
            <div className={styles.Wrapper}>
                <SettingsItem currentItem={currentItem} handleClickVariant={handleClickVariant} />
            </div>
            <Box sx={{
                position: "fixed",
                top: 0,
                pointerEvents: !open && 'None',
                right: 0,
                left: 0,
                bottom: 0,
                transform: 'translateZ(0px)',
                flexGrow: 1
            }}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => onChangeStatus(action.name)}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </div>
    );
};

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={5000}
            maxSnack={3}>
            <Item/>
        </SnackbarProvider>
    );
}
