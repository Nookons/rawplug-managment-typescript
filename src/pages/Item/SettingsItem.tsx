import React, {FC} from 'react';
import styles from './Item.module.css'; // Corrected import path

import {VariantType} from "notistack";
import {ICurrentItem} from "./Item";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TagIcon from '@mui/icons-material/Tag';
import Barcode from "react-barcode";
import QrCodeIcon from '@mui/icons-material/QrCode';
import {getMovement} from "../../utils/GetMovement";


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
    currentItem: ICurrentItem;
    handleClickVariant: (variant: VariantType, title: string) => void;
}

const SettingsItem: FC<SettingsItemProps> = ({currentItem, handleClickVariant}) => {

    if (currentItem.item?.quantity) {
        return (
            <div className={styles.Settings}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><h3>{getSmileType(currentItem.item?.type)}</h3></TableCell>
                                <TableCell><h5>{currentItem.item?.index}</h5> <p style={{color: "gray"}}>{currentItem.item?.description}</p></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItem.item?.remarks ?
                                <TableRow>
                                    <TableCell><BookmarkIcon/> </TableCell>
                                    <TableCell>
                                        <article>{currentItem.item?.remarks}</article>
                                    </TableCell>
                                </TableRow>
                                : null
                            }
                            {currentItem.item?.batchNumber
                                ? <TableRow>
                                    <TableCell><TagIcon /></TableCell>
                                    <TableCell>
                                        <article style={{letterSpacing: "2.5px"}}>{currentItem.item?.batchNumber} <Barcode fontSize={0} height={30} value={currentItem.item?.batchNumber} /></article>
                                    </TableCell>
                                </TableRow>
                                : null
                            }
                            <TableRow>
                                <TableCell><AddCircleIcon/></TableCell>
                                <TableCell>
                                    <p>{currentItem.item?.quantity.toLocaleString()} {currentItem.item?.jm}</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><BlurCircularIcon/></TableCell>
                                <TableCell>
                                    <p>{currentItem.item?.status}</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><AccountCircleIcon/></TableCell>
                                <TableCell>
                                    <p>{currentItem.item?.Created}</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><AccessTimeFilledIcon/></TableCell>
                                <TableCell>
                                    <p>{currentItem.item?.createdDate}
                                        {currentItem.item?.lastChange && <p style={{color: "gray"}}>Changed: {currentItem.item?.lastChange} by {currentItem.item?.changePerson}</p>}
                                    </p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><ArrowCircleRightIcon/> </TableCell>
                                <TableCell>
                                    <p>{getMovement(currentItem.item?.fromDepartment)}</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><SystemUpdateAltIcon/> </TableCell>
                                <TableCell>
                                    <p>{getMovement(currentItem.item?.toDepartment)}</p>
                                </TableCell>
                            </TableRow>
                            {currentItem.item?.batchNumber &&
                                <TableRow>
                                    <TableCell><OilBarrelIcon/> </TableCell>
                                    <TableCell>
                                        <p>1) {currentItem.item?.barrel?.first} {currentItem.item?.jm}</p>
                                        <p>2) {currentItem.item?.barrel?.secondary} {currentItem.item?.jm}</p>
                                        <p>3) {currentItem.item?.barrel?.third} {currentItem.item?.jm}</p>
                                        <p>4) {currentItem.item?.barrel?.four} {currentItem.item?.jm}</p>
                                    </TableCell>
                                </TableRow>
                            }
                            <TableRow>
                                <TableCell><QrCodeIcon/> </TableCell>
                                <TableCell>
                                    <p><Barcode fontSize={14} width={1.15} height={30} value={currentItem.item?.PalletReceipt} /></p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
};

export default SettingsItem;
