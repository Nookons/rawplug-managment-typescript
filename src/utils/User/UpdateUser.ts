import { doc, updateDoc } from "firebase/firestore";
import {db} from "../../firebase";

export const onUpdateUser = async (data: any, user: any) => {
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
        ...data
    });
};
