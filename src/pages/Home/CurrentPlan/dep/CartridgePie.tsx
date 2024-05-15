import React, {useEffect, useState} from 'react';
import {PieChart, pieArcLabelClasses, LineChart, BarChart} from '@mui/x-charts';
import {IItem} from '../../../../types/Item';
import {useAppSelector} from '../../../../hooks/storeHooks';

const CartridgePie = () => {
    const {items, loading, error} = useAppSelector(state => state.items);

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const indexTotals = [];

        items.forEach((el: IItem) => {
            if (el.type === "Cartridge") {
                const index = indexTotals.findIndex(item => item.label === el.index);

                if (index === -1) {
                    indexTotals.push({
                        label: el.index,
                        value: el.quantity
                    });
                } else {
                    indexTotals[index].value += el.quantity;
                }
            }
        });

        setData(indexTotals)
    }, [items, loading]);

    return (
        <BarChart
            xAxis={[{scaleType: 'band', data: data.map(el => el.label)}]}
            series={[{data: data.map(el => el.value)}]}
            height={400}
        />
    );
};

export default CartridgePie;
