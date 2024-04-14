import dayjs from "dayjs";
import {IAddFormData, IItem} from "../../types/Item";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";

export async function onAddItem(data: IAddFormData, user: any) {
    if (!user.uid) {
        throw new Error ('Please sign in that add some items...')
    }

    const id = Date.now();
    const date = dayjs().format('YYYY-MM-DD [at] HH:mm');

    const item = {
        id: id,
        createdDate: date,
        lastChange: "",
        changePerson: "",
        Created: user ? user.email : null,
        userUid: user ? user.uid : null,
        PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
        ...data,
        batchNumber: data.type.toLowerCase() === "barrel" ? data.batchNumber : null
    };


    await setDoc(doc(db, "items", "item_" + item.id), {
        ...item
    });
    return [true, item];
}
