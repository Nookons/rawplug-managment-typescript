import {getDatabase, push, ref, set} from 'firebase/database';
import dayjs from "dayjs";
import {IAddFormData, IItem} from "../../types/Item";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";

export async function onAddItem(data: IAddFormData, user: any) {
    try {
        if (!user) {
            return [false, 'Please sign in that add some items...']
        }

        const database = getDatabase();
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


        await setDoc(doc(db, "items", "item_" + item.id), {
            ...item
        });

        const actionID = Date.now();

        await setDoc(doc(db, "actions", "action_" + actionID), {
            person: user.email,
            personUid: user.uid,
            id: actionID,
            type: 'add',
            timeStamp: dayjs().format("YYYY-MM-DD [at] HH:mm"),
            item: {...item}
        });

        /*set(ref(db, 'items/' + id), item);*/

        return [true, item];
    } catch (e) {
        return [false, null];
    }
}
