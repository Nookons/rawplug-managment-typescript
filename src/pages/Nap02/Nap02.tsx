import React, {useEffect, useState} from 'react';
import styles from './Nap.module.css'
import Slot02 from "./slots/Slot02";
import Slot03 from "./slots/Slot03";
import Slot04 from "./slots/Slot04";
import Slot05 from "./slots/Slot05";
import {Autocomplete, Button, Slider, TextField, Typography} from "@mui/material";
import {doc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import dayjs from "dayjs";
import {IPlan, IPlanItems} from "../../types/Plans";
import MyModal from "../../components/Modal/MyModal";
import {
    allSlotUpdate,
    slotsUpdate,
    updateSlot02,
    updateSlot03,
    updateSlot04,
    updateSlot05
} from "../../utils/slots/slotsUpdate";
import Slot09 from "./slots/Slot09";
import Slot10 from "./slots/Slot10";

const Nap02 = () => {
    const currentDate = dayjs().format("YYYY-MM-DD")
    const [planData, setPlanData] = useState<IPlanItems[]>([]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "nap02", "plan_" + currentDate), (doc) => {
            if (doc.exists()) {
                setPlanData(doc.data().items as IPlanItems[]);
            }
        });
    }, []);

    useEffect(() => {
        console.log(planData);
    }, [planData]);


    const [addModal, setAddModal] = useState(false);

    const [palletData, setPalletData] = useState({
        index: "",
        quantity: 0,
        maxQuantity: 0,
    });

    const onChangePallet = (type: string, value: number) => {
        setPalletData((prevState) => ({...prevState, quantity: 0}))
        setPalletData((prevState) => ({...prevState, [type]: value}))

        planData.forEach(el => {
            if (el.index === value) {
                setPalletData((prevState) => ({...prevState, maxQuantity: el.planQta - el.ready}))
            }
        })
    }

    const onAddPallet = async () => {
        try {
            let value = palletData.quantity;
            let index = palletData.index;

            await slotsUpdate(value, index)

            const updatedPlanData = planData.map(el => {
                if (el.index === palletData.index) {
                    return {
                        ...el,
                        ready: el.ready + palletData.quantity
                    };
                }
                return el;
            });

            await setDoc(doc(db, "nap02", "plan_" + currentDate), {
                items: updatedPlanData
            });

        } catch (error) {
            setAddModal(false);
            alert('Произошла ошибка при обновлении слота:', error.toString());
        }
    };


    const options = planData && Array.from(new Set(planData.map(item => item.index)));

    return (
        <div className={styles.Main}>
            <MyModal isActive={addModal} setIsActive={setAddModal}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                }}>
                    <Autocomplete
                        disablePortal
                        options={options ? options : []} // Access myIndex property from indexTemplate object
                        sx={{minWidth: 200}}
                        onChange={(event, value) => onChangePallet("index", value)}
                        renderInput={(params) => <TextField {...params} label="Index"/>}
                    />
                    <Typography variant="h6" gutterBottom component="h6">
                        Remains: {palletData.maxQuantity - palletData.quantity}
                    </Typography>

                    <Slider value={palletData.quantity} max={palletData.maxQuantity} aria-label="Slider"/>

                    <Typography variant="h6" gutterBottom component="h6">
                        {palletData.quantity}
                    </Typography>

                    <Slider
                        max={palletData.maxQuantity < 840 ? palletData.maxQuantity : 840}
                        value={palletData.quantity}
                        onChange={(event, value) => onChangePallet("quantity", value)}
                        step={10}
                        aria-label="Slider"
                    />

                    <Button onClick={onAddPallet} fullWidth={true} variant={"contained"}>Add</Button>
                </div>
            </MyModal>

            <div className={styles.Wrapper}>
                <div className={styles.div1}>
                    <Button onClick={() => setAddModal(true)}>Add pallet</Button>
                </div>
                <div className={styles.div2}>
                    <Slot09 />
                </div>
                <div className={styles.div3}>
                    <Slot10 />
                </div>
                <div className={styles.div4}>
                    <Slot02 />
                </div>
                <div className={styles.div5}>
                    <Slot03 />
                </div>
                <div className={styles.div6}>
                    <Slot04 />
                </div>
                <div className={styles.div7}>
                    <Slot05 />
                </div>
                <div className={styles.div8}>
                </div>
                <div className={styles.div9}>
                </div>
                <div className={styles.div10}>
                </div>
                {planData ?
                    <div className={styles.div11}>
                        {planData.map(el => {

                            return (
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: 8,
                                    backgroundColor: "#9effef",
                                    padding: 4
                                }}>
                                    <p>{el.index}</p>
                                    <h5>{el.planQta - el.ready}</h5>
                                </div>
                            )
                        })}
                    </div>
                    : <div className={styles.div11}>
                        <h5>We don't have plan for today</h5>
                    </div>
                }
            </div>
        </div>
    );
};

export default Nap02;