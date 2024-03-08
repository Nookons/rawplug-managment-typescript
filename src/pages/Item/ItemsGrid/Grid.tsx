import React, {FC} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {columns} from "./Columns";
import Box from "@mui/material/Box";
import {Button, Tooltip} from "@mui/material";
import {ITEM_ROUTE} from "../../../utils/consts";
import {useNavigate} from "react-router-dom";
import {IItem} from "../../../types/Item";

interface GridProps {
    revertArray: IItem[];
}

const Grid: FC<GridProps> = ({revertArray}) => {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        {
            field: 'index',
            headerName: 'Index',
            width: 250,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {

                return (
                    <Tooltip placement="right" title={`Open ${params.row.index}`} arrow>
                        <Button onClick={() => navigate(ITEM_ROUTE + "?_" + params.row.id)}><p>{params.row.index}</p></Button>
                    </Tooltip>
                )
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
            field: 'jm',
            headerName: 'JM',
            type: 'string',
            width: 100,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.jm}</p>;
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
            field: 'fromDepartment',
            headerName: 'Sender',
            type: 'string',
            width: 100,
            editable: false,
            renderCell: (params) => {
                const tempStatus = params.row.fromDepartment

                return <p>{tempStatus} ≫</p>
            }
        },
        {
            field: 'toDepartment\n',
            headerName: 'Recipient',
            type: 'string',
            width: 100,
            editable: false,
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.toDepartment}</p>;
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            width: 600,
            description: 'test',
            renderCell: (params: GridValueGetterParams) => {
                return <p>{params.row.description}</p>;
            }
        }
    ];

    return (
        <Box sx={{height: 'auto', width: '100%'}}>
            <DataGrid
                rows={revertArray}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                checkboxSelection={false}
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default Grid;