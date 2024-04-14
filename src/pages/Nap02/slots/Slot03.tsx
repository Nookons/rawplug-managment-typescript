import React, {useEffect, useState} from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../../../firebase";
import {IItem} from "../../../types/Item";

interface ISlot {
    palletID: number;
}

const Slot02 = () => {
    const [data, setData] = useState<ISlot>();
    const [currentItem, setCurrentItem] = useState<IItem>();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "slots", "slot_03"), (doc) => {
            setData(doc.data() as ISlot);
        });
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "items", "item_" + data?.palletID), (doc) => {
            setCurrentItem(doc.data() as IItem);
        });
    }, [data]);

    return (
        <div>
            {!currentItem ? <h5>Not item on machine</h5> : <article>{currentItem.quantity.toLocaleString()}</article>}
        </div>
    );
};

export default Slot02;