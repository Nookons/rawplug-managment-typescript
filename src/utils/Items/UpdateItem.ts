import {doc, setDoc, updateDoc} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../../firebase";

interface IUpdateItem {
    id: number;
    user: any;
    data?: any;
}

export const UpdateItem = async ({id, user, data}: IUpdateItem) => {
    const itemRef = doc(db, "items", "item_" + id);

    await updateDoc(itemRef, {
        ...data,
        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
        changePerson: user.email
    });
}