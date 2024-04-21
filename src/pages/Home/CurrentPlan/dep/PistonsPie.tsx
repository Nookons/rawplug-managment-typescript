import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts';
import { IItem } from '../../../../types/Item';
import { useAppSelector } from '../../../../hooks/storeHooks';

const CartridgePie = () => {
    const { items, loading, error } = useAppSelector(state => state.items);

    const [firstValue, setFirstValue]       = useState<number>(0);
    const [secondValue, setSecondValue]     = useState<number>(0);
    const [thirdValue, setThirdValue]       = useState<number>(0);
    const [fourValue, setFourValue]         = useState<number>(0);
    const [fiveValue, setFiveValue]         = useState<number>(0);
    const [sixValue, setSixValue]           = useState<number>(0);

    useEffect(() => {
        let firstValue = 0;
        let secondValue = 0;
        let thirdValue = 0;
        let fourValue = 0;
        let fiveValue = 0;
        let sixValue = 0;

        items.forEach((el: IItem) => {
            switch (el.index) {
                case 'R-NOZ-M〵Z':
                    firstValue += el.quantity;
                    break;
                case 'R-NOZ-M':
                    secondValue += el.quantity;
                    break;
                case 'R-NOZ-14-M〵Z':
                    thirdValue += el.quantity;
                    break;
                case 'R-NOZ-14-M':
                    fourValue += el.quantity;
                    break;
                case 'R-NOZ-16-M〵Z':
                    fiveValue += el.quantity;
                    break;
                case 'R-NOZ-16-M':
                    sixValue += el.quantity;
                    break;
                default:
                    break;
            }
        });

        setFirstValue(firstValue);
        setSecondValue(secondValue);
        setThirdValue(thirdValue);
        setFourValue(fourValue);
        setFiveValue(firstValue);
        setSixValue(sixValue);
    }, [items, loading]);


    return (
        <div>
            <PieChart
                series={[
                    {
                        arcLabel: (item) => `(${item.value.toLocaleString()})`,
                        arcLabelMinAngle: 75,
                        data: [
                            { value: firstValue, label: `10-M〵Z` },
                            { value: secondValue, label: `10-M` },
                            { value: thirdValue, label: `14-M〵Z` },
                            { value: fourValue, label: `14-M` },
                            { value: fiveValue, label: `16-M〵Z` },
                            { value: sixValue, label: `16-M` },
                        ],
                        innerRadius: 15,
                        outerRadius: 75,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90
                    }
                ]}
                height={250}
                legendPosition="bottom"
                legendType="circle"
                legendLabel="Cartridge Type"
                title="Cartridge Slots"
            />
        </div>
    );
};

export default CartridgePie;
