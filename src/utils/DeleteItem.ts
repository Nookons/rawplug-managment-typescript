import {getDatabase, ref, child, remove, set, push} from 'firebase/database';
import dayjs from "dayjs";

export const onDeleteItem = async (currentItem: any, user: any) => {
    const db = getDatabase();
    const itemRef = ref(db, 'items/' + currentItem.id);

    const currentTime= dayjs().format("YYYY-MM-DD [at] HH:mm");

    try {

        push(ref(db, 'removed/'), {
            removedTime: currentTime,
            user: user.email,
            item: {...currentItem}
        });
        push(ref(db, 'actions/'), {
            type: 'remove',
            user: user.email,
            actionTime: currentTime,
            item: {...currentItem}
        });

        await remove(itemRef);
        console.log(`Item with id ${currentItem.id} successfully deleted.`);
        return true; // Возвращаем true в случае успешного удаления
    } catch (error) {
        console.error(`Error deleting item with id ${currentItem.id}:`, error);
        return false; // Возвращаем false в случае ошибки
    }
};