import React, {FC, useEffect, useState} from 'react';
import {IPlan, IPlanItems} from "../../../types/Plans";
import styles from '../AddPlan.module.css'
import MyButton from "../../../components/MyButton/MyButton";
import {Popper} from "@mui/material";
import dayjs from "dayjs";
import {OnRemovePlan} from "../../../utils/plans/RemovePlan";
import MyButtonLoader from "../../../components/MyButtonLoader/MyButtonLoader";
import MyLoader from "../../../components/Loader/MyLoader";
import {useAppDispatch} from "../../../hooks/storeHooks";
import {removePlan} from "../../../store/reducers/Plan/PlansReducer";

interface CheckPlanModuleProps {
    items: IPlan[]
}

const CheckPlanModule: FC<CheckPlanModuleProps> = ({items}) => {

    const dispatch = useAppDispatch();

    const [sortArray, setSortArray] = useState<IPlan[]>([]);

    const currentDate = dayjs().format('YYYY-MM-DD')

    const [isDeleting, setIsDeleting] = useState<boolean>(false);


    useEffect(() => {
        const sortedItems = [...items].sort((a, b) => {
            return new Date(a.forDate).getTime() - new Date(b.forDate).getTime();
        });
        const revertArray = [...sortedItems].reverse();
        setSortArray(revertArray);
    }, [items]);

    const onDeleteClick = async (id: number, item: IPlan) => {
        try {
            setIsDeleting(true)
            const response = await OnRemovePlan(id, item)

            if (response) {
                setTimeout(() => {
                    dispatch(removePlan(item))
                }, 250)
            }

        } catch (e) {
            console.log(e);
        }finally {
            setTimeout(() => {
                setIsDeleting(false)
            }, 250)
        }
    }


    return (
        <div className={styles.Main} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            <MyLoader isVisible={isDeleting} />
            {sortArray.slice(0, 5).map((item: IPlan, index: number) => {
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