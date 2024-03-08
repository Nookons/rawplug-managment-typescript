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
            <article style={{color: 'gray', fontSize: 12}}>Print date ( {props.currentDate} ) All quantity ( {props.allQuantity.toLocaleString()} kg )</article>
            {/*<p style={{color: 'gray', fontSize: 12}}>
                This document introduces a unique system to track barrels (called a "batch number") in a specific area.
                It uses a combination of numbers to make it easy and quick to find a particular barrel in the accounting records.
                In addition, each barrel has its current weight recorded,
                which is important for keeping track of inventory and checking the quality of the contents.
            </p>*/}

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
                            <TableCell><h5>Remarks</h5></TableCell>
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
                                case 'PSF-LATO':
                                    CM = 'Q-CM-PSF-LATO'
                                    CMB = 'Q-CMB-PSF-LATO'
                                    break
                                case 'PSF-ZIMA':
                                    CM = 'Q-CM-PSF-ZIMA'
                                    CMB = 'Q-CMB-PSF-ZIMA'
                                    break
                                case 'PSF-GREY':
                                    CM = 'Q-CM-PSF-GREY'
                                    CMB = 'Q-CMB-PSF-GREY'
                                    break
                                case 'PSF-STONE':
                                    CM = 'Q-CM-PSF-STONE'
                                    CMB = 'Q-CMB-PSF-STONE'
                                    break
                                case 'HYBRYDA-STANDART':
                                    CM = 'Q-CM-HYBRYDA-STANDART'
                                    CMB = 'Q-CMB-HYBRYDA-STANDART'
                                    break
                                case 'HYBRYDA-LATO':
                                    CM = 'Q-CM-HYBRYDA-LATO'
                                    CMB = 'Q-CMB-HYBRYDA-LATO'
                                    break
                                case 'HYBRYDA-ZIMA':
                                    CM = 'Q-CM-HYBRYDA-ZIMA'
                                    CMB = 'Q-CMB-HYBRYDA-ZIMA'
                                    break
                            }

                            if (el.type.toLowerCase() === "barrel" && (el.index === CM || el.index === CMB)) {

                                const rootClasses = [styles.PrintItem]

                                if (props.isShowBarrelWeight) {
                                    rootClasses.push(styles.ActiveBarrel)
                                }

                                return (
                                    <TableRow>
                                        <TableCell><article style={{whiteSpace: "nowrap"}}>{el.index}</article></TableCell>
                                        <TableCell><p style={{whiteSpace: "nowrap"}}>{el.status.toLowerCase() === 'available' ? '✅' : '⛔'} {el.batchNumber}</p></TableCell>
                                        <TableCell><p>{el.quantity.toLocaleString()} kg</p></TableCell>
                                        {props.isShowBarrelWeight ?
                                            <TableCell>

                                                 <div style={{display: "flex", gap: 4}}>
                                                     {el.barrel?.first ? <p style={{whiteSpace: "nowrap"}}>🛢️ {el.barrel?.first} kg</p> : null}
                                                     {el.barrel?.secondary ? <p style={{whiteSpace: "nowrap"}}>🛢️ {el.barrel?.secondary} kg</p> : null}
                                                </div>

                                                <div style={{display: "flex", gap: 4}}>
                                                    {el.barrel?.third ? <p style={{whiteSpace: "nowrap"}}>🛢️ {el.barrel?.third} kg</p> : null}
                                                    {el.barrel?.four ? <p style={{whiteSpace: "nowrap"}}>🛢️ {el.barrel?.four} kg</p> : null}
                                                </div>
                                            </TableCell>
                                            : null
                                        }
                                        <TableCell><p>{el.remarks}</p></TableCell>
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
