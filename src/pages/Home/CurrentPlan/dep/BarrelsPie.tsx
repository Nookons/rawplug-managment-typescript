import React, {useEffect, useState} from 'react';
import {BarChart, LineChart, PieChart} from '@mui/x-charts';
import {IItem} from '../../../../types/Item';
import {useAppSelector} from '../../../../hooks/storeHooks';

const BarrelsPie = () => {
    const {items, loading, error} = useAppSelector(state => state.items);

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Создаем объект для сопоставления уникальных индексов с общими значениями
        const indexTotals = [];

        // Проходим по каждому элементу в массиве items
        items.forEach((el: IItem) => {
            // Проверяем, является ли элемент картриджем
            if (el.type === "Barrel") {
                // Ищем индекс элемента в массиве indexTotals
                const index = indexTotals.findIndex(item => item.label === el.index
                    .replace("Q-CM-", "")
                    .replace("Q-CMB-", "")
                );

                // Если индекс не найден, добавляем новый объект в массив
                if (index === -1) {
                    indexTotals.push({
                        label: el.index
                            .replace("Q-CM-", "")
                            .replace("Q-CMB-", ""),
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
            height={400}
        />
    );
};

export default BarrelsPie;
