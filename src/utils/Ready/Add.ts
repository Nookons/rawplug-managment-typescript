import dayjs from "dayjs";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";

export const AddPallet = async (data: any, user: any) => {
    const id = Date.now();
    const date = dayjs().format('YYYY-MM-DD [at] HH:mm');

    const item = {
        id: id,
        created: date,
        person: user ? user.email : null,
        personUid: user ? user.uid : null,
        PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
        ...data,
    };

    await setDoc(doc(db, "pallets", "pallet_" + item.id), {
        ...item
    });
    return [true, item];
}
export const AddPalletTemplate = async (data: any, user: any) => {

    const item = {
        ...data,
    };

    await setDoc(doc(db, "palletsTemplate", "template_" + data.id), {
        ...item
    });
    return [true, item];
}