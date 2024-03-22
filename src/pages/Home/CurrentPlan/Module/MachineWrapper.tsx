import React, {useState} from 'react';
import {IPlan, IPlanItems} from "../../../../types/Plans";
import {Alert, Skeleton} from "@mui/material";
import dayjs from "dayjs";
import {useAppSelector} from "../../../../hooks/storeHooks";
import Machine from "./Machine";
import {inspect} from "util";

import styles from '../CurrentPlan.module.css'

const MachineWrapper = () => {
    const {items, loading, error} = useAppSelector(state => state.plans)
    const currentDate = dayjs().format('YYYY-MM-DD')
    const isPlan = items.some(item => item.forDate === currentDate);


    return (
        <div>
            {loading ? (
                <div className="skeleton">
                    <Skeleton variant="rectangular" width={"100%"} height={550}/>
                </div>
            ) : (
                <>
                    {items.map((item: IPlan) => {
                        if (item.forDate === currentDate) {
                            const renderMachines = (machines: IPlanItems[], nap: string) => {
                                return (
                                    <div className={styles.Machine}>
                                        <h5>{nap}</h5>
                                        <hr/>
                                        {machines.map((planItem: IPlanItems, index: number) => {

                                            let isReady = planItem.planQta - planItem.ready <= 0;

                                            return (
                                                <Machine
                                                    key={index}
                                                    index={index}
                                                    planItem={planItem}
                                                    isReady={isReady}
                                                    nap={nap}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            };

                            const firstMachine      = item.firstMachine;
                            const secondaryMachine  = item.secondaryMachine;
                            const thirdMachine      = item.thirdMachine;

                            return (
                                <div key={item.id}>
                                    {firstMachine       && renderMachines(firstMachine, 'Nap - 01')}
                                    {secondaryMachine   && renderMachines(secondaryMachine, 'Nap - 02')}
                                    {thirdMachine       && renderMachines(thirdMachine, 'Nap - 03')}
                                </div>

                            );
                        }
                    })}
                </>
            )}
            { !isPlan ? <Alert severity="warning">It's look like we don't have any plans for today... 😰</Alert> : null }
        </div>
    );
};

export default MachineWrapper;