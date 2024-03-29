import {IAddFormData, IItem} from "../../types/Item";

interface addItemValidationProps {
    items: IItem[];
    formData: IAddFormData;
}

export const addItemValidation = ({items, formData}: addItemValidationProps) => {

    if (formData.type.toLowerCase() === 'barrel') {
        const isHaveBatch = items.findIndex(element => element.batchNumber === formData.batchNumber)

        if (isHaveBatch >= 0) {
            throw new Error('batch')
        }

        if (formData.barrel.first > 375 || formData.barrel.secondary > 375 || formData.barrel.third > 375 || formData.barrel.four > 375) {
            throw new Error('barrelWeight')
        }

    }

    if (formData.quantity < 10) {
        throw new Error('quantity')
    }

    const title = 'Hey there! ' + formData.index + ' added ' + formData.quantity + ' ' + formData.jm;
    return title
}
