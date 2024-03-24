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
import TagIcon from '@mui/icons-material/Tag';


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
            <TableContainer style={{width: '100%'}} >
                <Table aria-label="simple table" padding={"normal"}>
                    <TableBody>
                        <TableRow>
                            <TableCell><h2>{getSmileType(currentItem?.type)}</h2></TableCell>
                            <TableCell><h4>{currentItem?.index}</h4><p>{currentItem?.description}</p></TableCell>
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
                        {currentItem?.batchNumber
                        ? <TableRow>
                                <TableCell><TagIcon /></TableCell>
                                <TableCell>
                                    <article style={{letterSpacing: "2.5px"}}>{currentItem?.batchNumber} <Barcode fontSize={0} height={30} value={currentItem?.batchNumber} /></article>
                                </TableCell>
                            </TableRow>
                        : null
                        }
                        <TableRow>
                            <TableCell><AddCircleIcon/></TableCell>
                            <TableCell>
                                <p>{currentItem?.quantity.toLocaleString()} {currentItem?.jm}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><BlurCircularIcon/></TableCell>
                            <TableCell>
                                <p>{currentItem?.status} <IconButton onClick={onOpenItemClick} aria-label="add">
                                    <SyncIcon/> </IconButton></p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AccountCircleIcon/></TableCell>
                            <TableCell>
                                <p>{currentItem?.Created}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AccessTimeFilledIcon/></TableCell>
                            <TableCell>
                                <p>{currentItem?.createdDate}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><ArrowCircleRightIcon/> </TableCell>
                            <TableCell>
                                <p>{currentItem?.fromDepartment} | {getMovement(currentItem?.fromDepartment)}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><SystemUpdateAltIcon/> </TableCell>
                            <TableCell>
                                <p>{currentItem?.toDepartment} | {getMovement(currentItem?.toDepartment)}</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SettingsItem;
