import React, {FC} from 'react';
import {
    Button, Chip,
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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import OilBarrelIcon from '@mui/icons-material/OilBarrel';

const renderSkeletonOrValue = (value: any, skeletonProps: any) => (
    value ? value : <Skeleton {...skeletonProps} />
);

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
}

const SettingsItem: FC<SettingsItemProps> = ({currentItem, isBarrel}) => { // Destructuring props


    return (
        <div className={styles.Settings}>
            <Tooltip title={currentItem?.type} arrow followCursor={true} leaveDelay={250} placement={"right"}>
                <h4>{getSmileType(currentItem?.type)} {currentItem?.index}</h4>
            </Tooltip>
            <TableContainer style={{width: '100%'}} component={Paper}>
                <Table aria-label="simple table" padding={"normal"}>
                    <TableBody>
                        <TableRow>
                            <TableCell><AccessTimeFilledIcon/></TableCell>
                            <TableCell><article>{currentItem?.createdDate}</article></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><ManageHistoryIcon/></TableCell>
                            <TableCell><article>{currentItem?.lastChange}</article></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AddCircleIcon/></TableCell>
                            <TableCell><article>{currentItem?.quantity} | {currentItem?.jm}</article></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><ArrowCircleRightIcon/> </TableCell>
                            <TableCell><article>{currentItem?.fromDepartment} | {getMovement(currentItem?.fromDepartment)}</article></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><ArrowCircleLeftIcon/> </TableCell>
                            <TableCell><article>{currentItem?.toDepartment} | {getMovement(currentItem?.toDepartment)}</article></TableCell>
                        </TableRow>
                        {isBarrel ?
                            <TableRow>
                                <TableCell><OilBarrelIcon /> </TableCell>
                                <TableCell><article>{currentItem?.barrel?.first} kg | {currentItem?.barrel?.secondary} kg | {currentItem?.barrel?.third} kg | {currentItem?.barrel?.four} kg</article> </TableCell>
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
