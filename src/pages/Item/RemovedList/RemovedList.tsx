import React, { useEffect, useState } from 'react';
import { IItem } from '../../../types/Item';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from '../../../hooks/storeHooks';
import {Button, Tooltip} from "@mui/material";
import {ITEM_ROUTE} from "../../../utils/consts";
import {Link} from "react-router-dom";

const RemovedList = () => {
    const { removed, loading } = useAppSelector(state => state.removed);
    const [revertArray, setRevertArray] = useState<IItem[]>([]);

    useEffect(() => {
        const reversed = [...removed].reverse().map((item, index) => ({
            ...item,
            id: index + 1, // or you can use a unique identifier if you have one
        }));
        setRevertArray(reversed);
    }, [removed, loading]);

    const columns: GridColDef[] = [
        {
            field: 'person',
            headerName: 'Person',
            width: 200,
            editable: true,
            renderCell: (params: GridValueGetterParams) => {
                return (
                    <Tooltip placement="right" title={'Removed by'} arrow>
                        <p>{params.row.person}</p>
                    </Tooltip>
                )
            },
        },
        {
            field: 'timeStamp',
            headerName: 'TimeStamp',
            width: 200,
            editable: true,
            renderCell: (params: GridValueGetterParams) => {
                return (
                    <Tooltip placement="left" title={'Removed time'} arrow>
                        <p>{params.row.timeStamp}</p>
                    </Tooltip>
                )
            },
        },
        {
            field: 'index',
            headerName: 'Index',
            width: 200,
            editable: true,
            renderCell: (params: GridValueGetterParams) => {
                return (
                    <Tooltip placement="left" title={'Removed Index'} arrow>
                        <Link to={ITEM_ROUTE + "?_" + params.row.item.id + "_removed"}>{params.row.item.index}</Link>
                    </Tooltip>
                )
            },
        },
        {
            field: 'quantity',
            headerName: 'quantity',
            width: 100,
            editable: true,
            renderCell: (params: GridValueGetterParams) => {
                return (
                    <Tooltip placement="left" title={'Removed quantity'} arrow>
                        <p>{params.row.item.quantity.toLocaleString()}</p>
                    </Tooltip>
                )
            },
        },
    ];


    return (
        <div style={{ padding: 14, backgroundColor: 'white', overflow: 'hidden' }}>
            <h5>Removed List...</h5>
            <hr/>
            <div>
                {!loading ? (
                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={revertArray}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                ) : (
                    <Skeleton variant="rectangular" style={{ padding: '14px' }} width="100%" height="60vh" />
                )}
            </div>
        </div>
    );
};

export default RemovedList;
