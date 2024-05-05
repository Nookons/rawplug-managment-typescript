import dayjs from "dayjs";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";

export const DeletePallet = async (id: number) => {
    await deleteDoc(doc(db, "pallets", 'pallet_' + id));
    return [true];
}