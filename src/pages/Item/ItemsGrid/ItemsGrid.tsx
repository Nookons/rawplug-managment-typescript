import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import Box from '@mui/material/Box';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import MyLoader from "../../../components/Loader/MyLoader";
import {useNavigate} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import {IItem} from "../../../types/Item";
import {Skeleton} from "@mui/material";


const ItemsGrid = () => {
    const navigate = useNavigate();
    const {items, loading, error} = useAppSelector(state => state.items)

    const [revertArray, setRevertArray] = useState<IItem[]>([]);

    const onItemClick = (id: number) => {
        navigate(ITEM_ROUTE + "?_" + id);
    }

    useEffect(() => {
        if (items && items.length > 0) {
            const tempArray = [...items].reverse();
            setRevertArray(tempArray);
        }
    }, [items, loading]);

    const columns: GridColDef[] = [
        {
            field: 'index',
            headerName: 'Index',
            width: 200,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p onClick={() => onItemClick(params.row.id)}
                            style={{cursor: "pointer"}}>{params.row.index}</p>;
            },
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 100,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.type}</p>;
            }
        },
        {
            field: 'createdDate',
            headerName: 'Created Date',
            width: 200,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.createdDate}</p>;
            }
        },
        {
            field: 'Created',
            headerName: 'Created by',
            width: 150,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.Created}</p>;
            }
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 110,
            editable: true,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.quantity.toLocaleString()}</p>;
            }
        },
        {
            field: 'JM',
            headerName: 'JM',
            type: 'string',
            width: 100,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.JM}</p>;
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'string',
            width: 110,
            editable: false,
            renderCell: (params) => {
                const tempStatus = params.row.status

                switch (tempStatus) {
                    case 'Available' :
                        return (
                            <p style={{
                                backgroundColor: "rgb(195,235,233)",
                                padding: "4px 8px",
                                borderRadius: 4
                            }}>{tempStatus}</p>
                        )
                    case 'Odzysk' :
                        return (
                            <p style={{
                                backgroundColor: "#FFFC9B",
                                padding: "4px 8px",
                                borderRadius: 4
                            }}>{tempStatus}</p>
                        )
                    case 'Hold' :
                        return (
                            <p style={{
                                backgroundColor: "#F28585",
                                padding: "4px 8px",
                                borderRadius: 4
                            }}>{tempStatus}</p>
                        )
                    default:
                        return (
                            <p>{tempStatus}</p>
                        )
                }
            }
        },
        {
            field: 'Sender',
            headerName: 'Sender',
            type: 'string',
            width: 100,
            editable: false,
            renderCell: (params) => {
                const tempStatus = params.row.Sender

                return <p>{tempStatus} ≫</p>
            }
        },
        {
            field: 'Recipient',
            headerName: 'Recipient',
            type: 'string',
            width: 100,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.Recipient}</p>;
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            width: 700,
            description: 'test',
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.description}</p>;
            }
        }
    ];


    return (
        <div style={{padding: 14}}>
            <article>Data grid</article>
            <hr/>
            {!loading ?
                <Box sx={{height: 'auto', width: '100%'}}>
                    <DataGrid
                        rows={revertArray}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 12,
                                },
                            },
                        }}
                        pageSizeOptions={[12]}
                        checkboxSelection={false}
                        disableRowSelectionOnClick
                    />
                </Box>
                : <Skeleton variant="rectangular" style={{padding: '14px !important'}} width={'100%'} height={'60dvh'}/>
            }
        </div>
    );
};

export default ItemsGrid;