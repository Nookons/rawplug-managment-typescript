import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../../firebase";

interface IUpdateItem {
    id: number;
    user: any;
    data?: any;
}

export const UpdateItem = async ({id, user, data}: IUpdateItem) => {
    const itemRef   = doc(db, "items", "item_" + id);
    const updateRef = doc(db, "users", user.uid);

    const docSnap   = await getDoc(updateRef);

    console.log(docSnap);

    if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.experience + (10 * data.level) > data.nextLevel) {

            await updateDoc(updateRef, {
                level:data.level + 1,
                experience: 0,
                nextLevel: data.nextLevel * data.level
            })

        } else {
            await updateDoc(updateRef, {
                experience:docSnap.data().experience + (10 * docSnap.data().level)
            })
        }
    }

    await updateDoc(itemRef, {
        ...data,
        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
        changePerson: user.email
    });
}