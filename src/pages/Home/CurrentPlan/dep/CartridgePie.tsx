import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts';
import { IItem } from '../../../../types/Item';
import { useAppSelector } from '../../../../hooks/storeHooks';

const CartridgePie = () => {
    const { items, loading, error } = useAppSelector(state => state.items);

    const [blueCartridge, setBlueCartridge] = useState<number>(0);
    const [whiteCartridge, setWhiteCartridge] = useState<number>(0);
    const [grayCartridge, setGrayCartridge] = useState<number>(0);

    useEffect(() => {
        let blueCount = 0;
        let whiteCount = 0;
        let grayCount = 0;

        items.forEach((el: IItem) => {
            switch (el.index) {
                case 'KRP-ST-CART-310-B':
                    blueCount += el.quantity;
                    break;
                case 'KRP-ST-CART-310':
                    whiteCount += el.quantity;
                    break;
                case 'KRP-ST-CART-310-G':
                    grayCount += el.quantity;
                    break;
                default:
                    break;
            }
        });

        setBlueCartridge(blueCount);
        setWhiteCartridge(whiteCount);
        setGrayCartridge(grayCount);
    }, [items, loading]);

    const totalCartridges = blueCartridge + whiteCartridge + grayCartridge;

    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `(${item.value.toLocaleString()})`,
                    arcLabelMinAngle: 25,
                    data: [
                        { value: blueCartridge, label: `Blue` },
                        { value: whiteCartridge, label: `White` },
                        { value: grayCartridge, label: `Gray` }
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
    );
};

export default CartridgePie;
