import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../../firebase";
import {rejects} from "assert";

interface IUpdateItem {
    machine: string;
    user: any;
    data?: any;
}



export const addToUse = async ({machine, user, data}: IUpdateItem) => {
    let slotRef = doc(db, "slots", "slot_02");
    let itemRef = doc(db, "items", "item_" + data.palletID);

    console.log(data.palletType);

    switch (data.palletType) {
        case "Carton":
            slotRef = doc(db, "slots", "slot_03");
            break;
        case "Piston":
            if (data.palletIndex === "KRP-ST-PISTON") {
                slotRef = doc(db, "slots", "slot_04");
            } else {
                slotRef = doc(db, "slots", "slot_06");
            }
            break
        case "White":
            slotRef = doc(db, "slots", "slot_05");
            break
        case "Nozzle":
            const answer = prompt("Please write slot for nozzle 1 or 2, that you want to replace")

            if (answer === "1") {
                slotRef = doc(db, "slots", "slot_01");
            }

            if (answer === "2") {
                slotRef = doc(db, "slots", "slot_02");
            }
            break
        case "Cartridge":
            if (machine === "nap03") {
                slotRef = doc(db, "slots", "slot_07");
            } else {
                slotRef = doc(db, "slots", "slot_08");
            }
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
        palletType: data.palletType,
        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
        changePerson: user.email
    });

    /*await updateDoc(itemRef, {
        status: "On Machine",
        quantity: minus !== undefined ? equal : quantity,
        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
        changePerson: user.email
    });*/
}
