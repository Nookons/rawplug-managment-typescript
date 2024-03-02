import {IAddFormData, IItem} from "../../types/Item";

interface addItemValidationProps {
    items: IItem[];
    formData: IAddFormData;
}

export const addItemValidation = ({items, formData}: addItemValidationProps) => {

    if (formData.type.toLowerCase() === 'barrel') {
        const isHaveBatch = items.findIndex(element => element.batchNumber === formData.batchNumber)

        if (isHaveBatch >= 0) {
            const title = 'Hey there! Could you kindly double-check if the batch number has been entered correctly? It seems like it might already exist in the system.'
            return [true, title]
        }

        if (formData.barrel.first > 350 || formData.barrel.secondary > 350 || formData.barrel.third > 350 || formData.barrel.four > 350) {
            const title = 'Hey there! your barrel has a lot of weight'
            return [true, title]
        }

    }

    if (formData.quantity < 10) {
        const title = 'Hey there! you can not add items with ' + formData.quantity + ' ' + formData.jm
        return [true, title]
    }

    const title = 'Hey there! ' + formData.index + ' added ' + formData.quantity + ' ' + formData.jm;
    return [false, title]
}
