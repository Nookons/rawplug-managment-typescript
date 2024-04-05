import {IAddFormData, IItem} from "../../types/Item";

interface addItemValidationProps {
    items: IItem[];
    formData: IAddFormData;
}

export const addItemValidation = ({items, formData}: addItemValidationProps) => {

    if (formData.index === "") {
        throw new Error('Empty index input')
    }

    if (formData.type.toLowerCase() === 'barrel') {
        const isHaveBatch = items.findIndex(element => element.batchNumber === formData.batchNumber)

        if (isHaveBatch >= 0) {
            throw new Error('Hey there! Could you kindly double-check if the batch number has been entered correctly? It seems like it might already exist in the system.')
        }

        if (formData.barrel.first > 375 || formData.barrel.secondary > 375 || formData.barrel.third > 375 || formData.barrel.four > 375) {
            throw new Error('Hey there! your barrel has a lot of weight')
        }

    }

    if (formData.quantity < 10) {
        throw new Error('Hey there! you can not add items with less than 10 quantity')
    }

    const title = 'Hey there! ' + formData.index + ' added ' + formData.quantity + ' ' + formData.jm;
    return title
}
