import dayjs from "dayjs";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";

export const DeletePallet = async (itemToRemove: any) => {

    console.log(itemToRemove);

    await setDoc(doc(db, "removedPallets", "pallet_" + itemToRemove.id), {
        timeStamp: dayjs().format("YYYY-MM-DD [at] HH:mm"),
        item: {...itemToRemove}
    });

    await deleteDoc(doc(db, "pallets", 'pallet_' + itemToRemove.id));
    return [true];
}