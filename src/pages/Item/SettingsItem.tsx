import React, {FC, useCallback, useState} from 'react';
import {
    Backdrop,
    Button, Chip, CircularProgress, IconButton,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import styles from './Item.module.css'; // Corrected import path
import {IItem} from "../../types/Item";
import {getMovement} from "../../utils/GetMovement";
import Barcode from "react-barcode";

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import {useAppDispatch} from "../../hooks/storeHooks";
import {openItem} from "../../store/reducers/item/itemsSlice";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';


import SyncIcon from '@mui/icons-material/Sync';
import {VariantType} from "notistack";

const getSmileType = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
        case "barrel":
            return '🛢️';
        case "carton":
            return '📦';
        case "cartridge":
            return '🍾';
        case "chemical":
            return '🚰';
        default:
            return '';
    }
}


interface SettingsItemProps {
    currentItem: IItem | undefined;
    isBarrel: boolean;
    handleClickVariant: (variant: VariantType, title: string) => void;
}

const SettingsItem: FC<SettingsItemProps> = ({currentItem, isBarrel, handleClickVariant}) => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const onOpenItemClick = () => {
        //Create here function to changed status on back end and validation data before changed

        try {
            setLoading(true)
            const id = currentItem?.id
            dispatch(openItem(id))
            handleClickVariant('success', 'Changed')
        } catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
                handleClickVariant('info', 'I\'m sorry to inform you that this function is currently not operational. However, we are working on addressing this issue and it will be resolved in the next release.')
                setLoading(false)
            }, 250)
        }
    }

    return (
        <div className={styles.Settings}>
            <Backdrop open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <TableContainer style={{width: '100%'}} component={Paper}>
                <Table aria-label="simple table" padding={"normal"}>
                    <TableBody>
                        <TableRow>
                            <TableCell><h2>{getSmileType(currentItem?.type)}</h2></TableCell>
                            <TableCell><span>{currentItem?.batchNumber}</span> <h4>{currentItem?.index}</h4><p>{currentItem?.description}</p></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AccessTimeFilledIcon/></TableCell>
                            <TableCell>
                                <article>{currentItem?.createdDate}</article>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><ManageHistoryIcon/></TableCell>
                            <TableCell>
                                <article>{currentItem?.lastChange}</article>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><BlurCircularIcon/></TableCell>
                            <TableCell>
                                <article>{currentItem?.status} <IconButton onClick={onOpenItemClick} aria-label="add">
                                    <SyncIcon/> </IconButton></article>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AccountCircleIcon/></TableCell>
                            <TableCell>
                                <article>{currentItem?.Created}</article>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AddCircleIcon/></TableCell>
                            <TableCell>
                                <article>{currentItem?.quantity.toLocaleString()} {currentItem?.jm}</article>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><ArrowCircleRightIcon/> </TableCell>
                            <TableCell>
                                <article>{currentItem?.fromDepartment} | {getMovement(currentItem?.fromDepartment)}</article>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><SystemUpdateAltIcon/> </TableCell>
                            <TableCell>
                                <article>{currentItem?.toDepartment} | {getMovement(currentItem?.toDepartment)}</article>
                            </TableCell>
                        </TableRow>
                        {currentItem?.remarks ?
                            <TableRow>
                                <TableCell><BookmarkIcon/> </TableCell>
                                <TableCell>
                                    <article>{currentItem?.remarks}</article>
                                </TableCell>
                            </TableRow>
                        : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SettingsItem;
