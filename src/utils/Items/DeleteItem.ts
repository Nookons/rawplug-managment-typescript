import dayjs from "dayjs";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import { deleteDoc } from "firebase/firestore";

export const onDeleteItem = async (currentItem: any, user: any) => {
    try {
        await setDoc(doc(db, "removed", "item_" + currentItem.id), {
            person: user.email,
            personUid: user.uid,
            timeStamp: dayjs().format("YYYY-MM-DD [at] HH:mm"),
            item: {...currentItem}
        });

        await deleteDoc(doc(db, "items", 'item_' + currentItem.id));
        return [true];
    } catch (error) {
        console.error(`Error deleting item with id ${currentItem.id}:`, error);
        return false;
    }
};