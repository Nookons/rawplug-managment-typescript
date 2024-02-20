import React, {useEffect, useState} from 'react';
import styles from "./AddPlan.module.css";
import MyButton from "../../components/MyButton/MyButton";
import Mashine from "./module/Machine";
import {onAddPlan} from "../../utils/AddPlan";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {IPlan, IPlanItems} from "../../types/Plans";
import {Alert} from "@mui/material";
import MyLoader from "../../components/Loader/MyLoader";
import {addPlan} from "../../store/reducers/Plan/PlansReducer";
import {useNavigate} from "react-router-dom";
import {CHECK_PLANS_ROUTE, HOME_ROUTE} from "../../utils/consts";


const AddPlan = () => {
    const user = useAppSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [forDate, setForDate] = useState<Date | null>(null);
    const [responseError, setResponseError] = useState<string>('');

    const {items, loading, error} = useAppSelector(state => state.plans)

    const [myLoader, setMyLoader] = useState<boolean>(false);


    const [firstMachineArray, setFirstMachineArray] = useState<IPlanItems[]>([]);
    const [secondaryMachine, setSecondaryMachine] = useState<IPlanItems[]>([]);
    const [thirdMachine, setThirdMachine] = useState<IPlanItems[]>([]);

    const handleObjectChange = (obj: any) => {
        setFirstMachineArray(prevArray => [...prevArray, obj]); // Добавление нового объекта в конец массива
    };

    const handleSecondaryMachine = (obj: any) => {
        setSecondaryMachine(prevArray => [...prevArray, obj]); // Добавление нового объекта в конец массива
    };

    const handleThirdMachine = (obj: any) => {
        setThirdMachine(prevArray => [...prevArray, obj]); // Добавление нового объекта в конец массива
    };


    const onChangeDate = (date: Date | null) => {
        setForDate(date)
    };

    const onAddClick = async () => {
        setMyLoader(true);

        try {
            const data = {
                id: Date.now(),
                firstMachine: [...firstMachineArray],
                secondaryMachine: [...secondaryMachine],
                thirdMachine: [...thirdMachine]
            }
            const response = await onAddPlan(data, user, forDate)

            if (!response[0]) {
                setResponseError(response[1])
            } else {
                dispatch(addPlan(response[1]))
            }
        }catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
                setMyLoader(false);
                navigate(CHECK_PLANS_ROUTE);
            }, 500)
        }
    }

    return (
        <div className={styles.Main}>
            <MyLoader isVisible={myLoader} />
            <div className={styles.Parent}>
                <div className={styles.div1}>
                    <div style={{display: "flex", flexDirection: 'column', gap: 14}}>
                        {responseError ? <Alert severity="error">{responseError}</Alert> : null}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={forDate}
                                onChange={onChangeDate}
                            />
                        </LocalizationProvider>
                        <MyButton click={onAddClick}>Add</MyButton>
                    </div>
                </div>
                <div className={styles.div2}>
                    <div>
                        <div>
                            <h5>Machine #1</h5>
                            <hr/>
                            <Mashine onObjectChange={handleObjectChange}/>
                        </div>
                    </div>
                </div>
                <div className={styles.div3}>
                    <div>
                        <div>
                            <h5>Machine #2</h5>
                            <hr/>
                            <Mashine onObjectChange={handleSecondaryMachine}/>
                        </div>
                    </div>
                </div>
                <div className={styles.div4}>
                    <div>
                        <div>
                            <h5>Machine #3</h5>
                            <hr/>
                            <Mashine onObjectChange={handleThirdMachine}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlan;