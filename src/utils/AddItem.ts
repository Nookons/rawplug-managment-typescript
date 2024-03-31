import {getDatabase, push, ref, set} from 'firebase/database';
import dayjs from "dayjs";
import {IAddFormData, IItem} from "../types/Item";


export function handlingError ({error}: any ) {
    const message = error.message;

    switch (message) {
        case "quantity":
            return "Hey there! you can not add items with less than 10 quantity";
        case "barrelWeight":
            return "Hey there! your barrel has a lot of weight";
        case "batch":
            return "Hey there! Could you kindly double-check if the batch number has been entered correctly? It seems like it might already exist in the system.";
        default:
            return 'Unknown error, please contact developers'
    }
}


export function onAddItem(data: IAddFormData, user: any) {
    try {
        if (!user) {
            return [false, 'Please sign in that add some items...']
        }

        const db = getDatabase();
        const id = Date.now();
        const date = dayjs().format('YYYY-MM-DD [at] HH:mm');


        const item = {
            id: id,
            createdDate: date,
            lastChange: date,
            Created: user ? user.email : null,
            userUid: user ? user.uid : null,
            PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
            ...data,
            batchNumber: data.type.toLowerCase() === "barrel" ? data.batchNumber : null
        };

        const actionBody = {
            type: 'Add item',
            user: user.email,
            userUid: user.uid,
            actionTime: date,
            item: item
        }

        push(ref(db, 'actions/'), actionBody)
        set(ref(db, 'items/' + id), item);

        return [true, item, actionBody];
    } catch (e) {
        return [false, null];
    }
}
