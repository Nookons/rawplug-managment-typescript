import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {IItem} from "../../../types/Item";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import styles from './Print.module.css'
import dayjs from "dayjs";


const ComponentToPrint = React.forwardRef((props: any, ref) => (
    <div  ref={ref}>
        <div className={styles.Main}>
            <h5>{props.alignment}</h5>
            <article>Print date ( {props.currentDate} )</article>

            {/* Добавляем уникальный ключ */}
            <TableContainer key={props.alignment} component={Paper} draggable={true} variant={"elevation"}>
                <Table aria-label="simple table" size={"small"} align={"left"} padding={"normal"} cellSpacing={2} cellPadding={15}>
                    <TableHead>
                        <TableRow>
                            <TableCell><h5>Index</h5></TableCell>
                            <TableCell><h5>Batch</h5></TableCell>
                            <TableCell><h5>Quantity</h5></TableCell>
                            {props.isShowBarrelWeight ?
                                <TableCell><h5>Barrels</h5></TableCell>
                                : null
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.Wrapper}>
                        {props.items.map((el: IItem) => {
                            let CM: string = '';
                            let CMB: string = '';

                            console.log(props.alignment);

                            switch (props.alignment) {
                                case 'EPOXID-B':
                                    CM = 'Q-CM-EPOXID-B'
                                    CMB = 'Q-CMB-EPOXID-B'
                                    break
                                case 'EPOXID-A':
                                    CM = 'Q-CM-EPOXID-A'
                                    CMB = 'Q-CMB-EPOXID-A'
                                    break
                                case 'PSF-STAND':
                                    CM = 'Q-CM-PSF-STAND-V3'
                                    CMB = 'Q-CMB-PSF-STAND-V3'
                                    break
                            }

                            if (el.type.toLowerCase() === "barrel" && (el.index === CM || el.index === CMB)) {

                                const rootClasses = [styles.PrintItem]

                                if (props.isShowBarrelWeight) {
                                    rootClasses.push(styles.ActiveBarrel)
                                }

                                return (
                                    <TableRow>
                                        <TableCell><article>{el.status.toLowerCase() === 'available' ? '✅' : '⛔'} {el.index}</article></TableCell>
                                        <TableCell><p># {el.batchNumber}</p></TableCell>
                                        <TableCell><p>{el.quantity} kg</p></TableCell>
                                        {props.isShowBarrelWeight ?
                                            <TableCell>
                                                {el.barrel?.first > 0 ? <div style={{display: "flex", gap: 4}}>
                                                    <p>🛢️ {el.barrel?.first} kg</p>
                                                    <p>🛢️ {el.barrel?.secondary} kg</p>
                                                </div> : <p>No data...</p>
                                                }
                                                {el.barrel?.first > 0 ? <div style={{display: "flex", gap: 4}}>
                                                    <p>🛢️ {el.barrel?.third} kg</p>
                                                    <p>🛢️ {el.barrel?.four} kg</p>
                                                </div> : <p>No data...</p>
                                                }
                                            </TableCell>
                                            : null
                                        }
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <p style={{fontSize: 10}}>Created by Managment ©</p>
        </div>
    </div>
));

export default ComponentToPrint;
