import React, {useEffect, useState} from 'react';
import {BarChart, LineChart, PieChart} from '@mui/x-charts';
import {IItem} from '../../../../types/Item';
import {useAppSelector} from '../../../../hooks/storeHooks';

const BarrelsPie = () => {
    const {items, loading, error} = useAppSelector(state => state.items);


    const [psfQuantityData, setPsfQuantityData] = useState<any[]>([]);

    useEffect(() => {
        setPsfQuantityData([])

        items.forEach((el: IItem) => {
            if (el.type.toLowerCase() === "barrel") {
                setPsfQuantityData(prevState => ([...prevState,
                    {
                        stack: el.createdDate,
                        label: el.index,
                        data: [el.quantity]
                    }
                ]))
            }
        })
    }, [items, loading]);

    useEffect(() => {
        console.log(psfQuantityData);
    }, [psfQuantityData]);

    return (
        <div>
            <div>
                <h6>PSF</h6>
                <hr/>
                <BarChart
                    series={psfQuantityData}
                    height={350}
                />
            </div>
        </div>
    );
};

export default BarrelsPie;
