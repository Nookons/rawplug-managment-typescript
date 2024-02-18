import React, {FC, useEffect, useState} from 'react';
import {IPlan, IPlanItems} from "../../../types/Plans";
import styles from '../AddPlan.module.css'
import MyButton from "../../../components/MyButton/MyButton";
import {Popper} from "@mui/material";
import dayjs from "dayjs";
import {OnRemovePlan} from "../../../utils/RemovePlan";

interface CheckPlanModuleProps {
    items: IPlan[]
}

const CheckPlanModule: FC<CheckPlanModuleProps> = ({items}) => {

    const [sortArray, setSortArray] = useState<IPlan[]>([]);

    const currentDate = dayjs().format('YYYY-MM-DD')

    useEffect(() => {
        const sortedItems = [...items].sort((a, b) => {
            return new Date(a.forDate).getTime() - new Date(b.forDate).getTime();
        });
        const revertArray = [...sortedItems].reverse();
        setSortArray(revertArray);
    }, [items]);

    const onDeleteClick = async (id: number, item: IPlan) => {
        const response = await OnRemovePlan(id, item)

        console.log(response);
    }


    return (
        <div className={styles.Main} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            {sortArray.slice(0, 5).map((item: IPlan, index:number) => {
                let isCurrent = false;

                if (item.forDate === currentDate) {
                    isCurrent = true
                }

                return (
                    <div key={index} style={{backgroundColor: isCurrent ? "#a9ffaa" : ""}} className={styles.CheckPlan}>
                        <div className={styles.CheckPlanHeader}>
                            <div>
                                <article>For: {item.forDate}</article>
                                <p>Created: {item.createdDate}</p>
                            </div>
                            <MyButton click={() => onDeleteClick(item.id, item)}>X</MyButton>
                        </div>
                       <div className={styles.CheckPlanWrapper}>
                           <div>
                               {item.firstMachine ? item.firstMachine.map((i: IPlanItems) => (
                                       <article>
                                           {i.index} <span>{i.planQta} | ({i.ready})</span>
                                       </article>
                                   ))
                                   : null
                               }
                           </div>
                           <div>
                               {item.secondaryMachine ? item.secondaryMachine.map((i: IPlanItems) => (
                                       <article>
                                           {i.index} <span>{i.planQta} | ({i.ready})</span>
                                       </article>
                                   ))
                                   : null
                               }
                           </div>
                           <div>
                               {item.thirdMachine ? item.thirdMachine.map((i: IPlanItems) => (
                                       <article>
                                           {i.index} <span>{i.planQta} | ({i.ready})</span>
                                       </article>
                                   ))
                                   : null
                               }
                           </div>
                       </div>
                    </div>
                )
            })}
        </div>
    );
};

export default CheckPlanModule;