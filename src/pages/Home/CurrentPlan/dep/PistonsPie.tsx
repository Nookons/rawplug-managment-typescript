import React, {useEffect, useState} from 'react';
import {BarChart, PieChart} from '@mui/x-charts';
import {IItem} from '../../../../types/Item';
import {useAppSelector} from '../../../../hooks/storeHooks';

const CartridgePie = () => {
    const {items, loading, error} = useAppSelector(state => state.items);

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Создаем объект для сопоставления уникальных индексов с общими значениями
        const indexTotals = [];

        // Проходим по каждому элементу в массиве items
        items.forEach((el: IItem) => {
            // Проверяем, является ли элемент картриджем
            if (el.type === "Nozzle") {
                // Ищем индекс элемента в массиве indexTotals
                const index = indexTotals.findIndex(item => item.label === el.index
                );

                // Если индекс не найден, добавляем новый объект в массив
                if (index === -1) {
                    indexTotals.push({
                        label: el.index,
                        value: el.quantity
                    });
                } else {
                    // Если индекс найден, увеличиваем значение для этого индекса
                    indexTotals[index].value += el.quantity;
                }
            }
        });

        setData(indexTotals)
    }, [items, loading]);


    return (
        <BarChart
            xAxis={[{scaleType: 'band', data: data.map(el => el.label)}]} // Преобразуем массив данных с помощью map
            series={[{data: data.map(el => el.value)}]} // Передаем данные для серии. Предполагается, что data содержит объекты с полями label и value
            height={300}
        />
    );
};

export default CartridgePie;
