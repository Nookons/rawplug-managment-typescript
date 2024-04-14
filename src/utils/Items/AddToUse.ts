import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../../firebase";
import {rejects} from "assert";

interface IUpdateItem {
    machine: string;
    user: any;
    data?: any;
}

const nozSlotAdd = async () => {
    const slot_09 = doc(db, "slots", "slot_09");
    const slot_10 = doc(db, "slots", "slot_10");

    const slot09Snap = await getDoc(slot_09);
    const slot10Snap = await getDoc(slot_10);

    if (slot09Snap.exists() && slot10Snap.exists()) {
        const slot09ID = slot09Snap.data().palletID;
        const slot10ID = slot10Snap.data().palletID;

        const oldValueDoc09 = await doc(db, "items", "item_" + slot09ID);
        const oldValueSnap09 = await getDoc(oldValueDoc09);

        const oldValueDoc10 = await doc(db, "items", "item_" + slot10ID);
        const oldValueSnap10 = await getDoc(oldValueDoc10);

        const answer = prompt("Please write slot for nozzle 9 or 10, that you want to replace")

        if (answer === "9") {
            return slot_09
        }

        if (answer === "10") {
            return slot_10
        }

        throw new Error("test")
    }

    if (slot09Snap.exists()) {
        return slot_10
    }
    if (slot10Snap.exists()) {
        return slot_09
    }

    return slot_09
}


export const addToUse = async ({machine, user, data}: IUpdateItem) => {
    let slotRef = doc(db, "slots", "slot_02");
    let itemRef = doc(db, "items", "item_" + data.palletID);

    switch (data.palletIndex) {
        case "OZ-U-255-164-295":
            slotRef = doc(db, "slots", "slot_02");
            break;
        case "KRP-ST-PISTON":
            slotRef = doc(db, "slots", "slot_03");
            break
        case "KRP-ST-CAP-WHI":
            slotRef = doc(db, "slots", "slot_04");
            break
        case "KRP-ST-PISTON-B":
            slotRef = doc(db, "slots", "slot_05");
            break
        case "R-NOZ-M〵Z":
            slotRef = await nozSlotAdd();
            break
        case "R-NOZ-14-M〵Z":
            slotRef = await nozSlotAdd();
            break
        default:
            return "";
    }

    const slotSnap = await getDoc(slotRef);
    const itemSnap = await getDoc(itemRef);

    let minus = 0;
    let quantity = 0;

    if (slotSnap.exists()) {
        const minusSnap = slotSnap.data().minus;
        minus = minusSnap
    }
    if (itemSnap.exists()) {
        const quantitySnap = itemSnap.data().quantity;
        quantity = quantitySnap
    }

    const equal = quantity + minus


    await setDoc(slotRef, {
        palletID: data.palletID,
        minus: 0,
        palletIndex: data.palletIndex,
        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
        changePerson: user.email
    });

    await updateDoc(itemRef, {
        status: "On Machine",
        quantity: minus !== undefined ? equal : quantity,
        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
        changePerson: user.email
    });
}
