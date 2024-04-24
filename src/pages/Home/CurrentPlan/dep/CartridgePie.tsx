import React, {useEffect, useState} from 'react';
import {PieChart, pieArcLabelClasses, LineChart, BarChart} from '@mui/x-charts';
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
            if (el.type === "Cartridge") {
                // Ищем индекс элемента в массиве indexTotals
                const index = indexTotals.findIndex(item => item.label === el.index
                    .replace("KRP-ST-", "")
                    .replace("Q-C-CART-", "")
                );

                // Если индекс не найден, добавляем новый объект в массив
                if (index === -1) {
                    indexTotals.push({
                        label: el.index
                            .replace("KRP-ST-", "")
                            .replace("Q-C-CART-", ""),
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

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: data.map(el => el.label) }]} // Преобразуем массив данных с помощью map
            series={[{ data: data.map(el => el.value) }]} // Передаем данные для серии. Предполагается, что data содержит объекты с полями label и value
            height={300}
        />
        /*<PieChart
            height={300}
            series={[
                {
                    data: data,
                    arcLabel: (item) => `(${item.value.toLocaleString()})`,
                    arcLabelMinAngle: 75,
                    innerRadius: 15,
                    outerRadius: 75,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 5, additionalRadius: -5, color: 'gray' },
                },
            ]}
            slotProps={{
                legend: { hidden: false },
            }}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14
                },
                legendTextStyle: {
                    fontSize: '8px' // Установите желаемый размер текста в пикселях
                }
            }}
            /!*onItemClick={(event, d) => console.log(d)}*!/
            skipAnimation={false}
        />*/
    );
};

export default CartridgePie;
