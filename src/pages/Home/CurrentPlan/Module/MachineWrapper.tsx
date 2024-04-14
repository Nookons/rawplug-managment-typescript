import React, {useEffect, useState} from 'react';
import {IPlan, IPlanItems} from "../../../../types/Plans";
import {Alert, Skeleton} from "@mui/material";
import dayjs from "dayjs";
import {useAppSelector} from "../../../../hooks/storeHooks";
import Machine from "./Machine";
import {inspect} from "util";

import styles from '../CurrentPlan.module.css'
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../../firebase";

const renderMachines = (item: IPlanItems[]) => {

    return (
        <div className={styles.Machine}>
            <Machine planItem={item}/>
        </div>
    );
};

const MachineWrapper = () => {
    const currentDate = dayjs().format('YYYY-MM-DD')

    const [nap03Data, setNap03Data] = useState<IPlanItems[]>([]);
    const [nap02Data, setNap02Data] = useState<IPlanItems[]>([]);
    const [nap01Data, setNap01Data] = useState<IPlanItems[]>([]);

    const unsub01 = onSnapshot(doc(db, "nap03", "plan_" + currentDate), (doc) => {
        if (doc.exists()) {
            setNap03Data(doc.data().items);
        }
    });

    const unsub02 = onSnapshot(doc(db, "nap02", "plan_" + currentDate), (doc) => {
        if (doc.exists()) {
            setNap02Data(doc.data().items);
        }
    });

    const unsub03 = onSnapshot(doc(db, "nap01", "plan_" + currentDate), (doc) => {
        if (doc.exists()) {
            setNap01Data(doc.data().items);
        }
    });

    useEffect(() => {
        unsub01();
    }, [nap01Data]);

    useEffect(() => {
        unsub02();
    }, [nap02Data]);

    useEffect(() => {
        unsub03();
    }, [nap03Data]);


    return (
        <div>
            {nap01Data.length ?
                <div>
                    <h5>Nap 01</h5>
                    {nap01Data.map(item => {
                        return (renderMachines(item))
                    })}
                </div>
                :
                <div>
                    <Alert severity="info"><p>Nap-01 have not plan for today</p></Alert>
                </div>
            }
            <hr/>
            {nap02Data.length ?
                <div>
                    <h5>Nap 02</h5>
                    {nap02Data.map(item => {
                        return (renderMachines(item))
                    })}
                </div>
                :
                <div>
                    <Alert severity="info"><p>Nap-02 have not plan for today</p></Alert>
                </div>
            }
            <hr/>
            {nap03Data.length ?
                <div>
                    <h5>Nap 03</h5>
                    {nap03Data.map(item => {
                        return (renderMachines(item))
                    })}
                </div>
                :
                <div>
                    <Alert severity="info"><p>Nap-03 have not plan for today</p></Alert>
                </div>
            }
        </div>
    )
};

export default MachineWrapper;