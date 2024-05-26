import React, { FC, useEffect } from 'react';
import { INeededItem } from '../../../types/Pallet';

interface NeedItemProps {
    template: INeededItem;
    quantity: number;
    totalArray: { index: string; value: number }[];
    setTotalArray: React.Dispatch<React.SetStateAction<{ index: string; value: number }[]>>;
}

const NeedItem: FC<NeedItemProps> = ({ template, quantity, totalArray, setTotalArray }) => {
    const count = template.quantity ? template.quantity * quantity : 0;

    useEffect(() => {
        const isHave = totalArray.findIndex(item => item.index === template.index);

        if (isHave === -1) {
            setTotalArray(prevState => [...prevState, { index: template.index, value: count }]);
        } else {
            setTotalArray(prevState => {
                const updatedTotalArray = [...prevState];
                updatedTotalArray[isHave] = {
                    ...updatedTotalArray[isHave],
                    value: updatedTotalArray[isHave].value + count,
                };
                return updatedTotalArray;
            });
        }
    }, [template.index, count, setTotalArray]); // Use only relevant dependencies

    return null; // Since the component does not render any JSX
};

export default NeedItem;
