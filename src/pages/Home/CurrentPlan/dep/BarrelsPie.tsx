import React, {useEffect, useState} from 'react';
import {BarChart, LineChart, PieChart} from '@mui/x-charts';
import {IItem} from '../../../../types/Item';
import {useAppSelector} from '../../../../hooks/storeHooks';

const BarrelsPie = () => {
    const {items, loading, error} = useAppSelector(state => state.items);

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const indexTotals = [];

        items.forEach((el: IItem) => {
            if (el.type === "Barrel") {

                if (el.status === "Available") {
                    const index = indexTotals.findIndex(item => item.label === el.index
                        .replace("Q-CM-", "")
                    );

                    if (index === -1) {
                        indexTotals.push({
                            label: el.index
                                .replace("Q-CM-", ""),
                            value: el.quantity
                        });
                    } else {
                        indexTotals[index].value += el.quantity;
                    }
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
