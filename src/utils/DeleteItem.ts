import { getDatabase, ref, child, remove } from 'firebase/database';

export const onDeleteItem = async (id: number) => {
    const db = getDatabase();
    const itemRef = ref(db, 'items/' + id);

    try {
        // Удаляем элемент из базы данных
        await remove(itemRef);
        console.log(`Item with id ${id} successfully deleted.`);
        return true; // Возвращаем true в случае успешного удаления
    } catch (error) {
        console.error(`Error deleting item with id ${id}:`, error);
        return false; // Возвращаем false в случае ошибки
    }
};