import React, {FC, useEffect, useState} from 'react';
import {Autocomplete, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import palletData from "../../../assets/PalletsData.json";
import {IPalletItem} from "../../../types/Pallet";
import MyButton from "../../../components/MyButton/MyButton";
import {IPlanItems} from "../../../types/Plans";

interface InputProps {
    handleInputChange?: (obj: any) => void;
}


const getDescription = (typeValue: string) => {
    console.log(typeValue);
    let data: string = ''

    palletData.map((e: IPalletItem) => {
        if (e.index === typeValue) {
            data = e.description
        }
    })

    return data
}

const Input: FC<InputProps> = ({handleInputChange}) => {
    const [palletIndex, setPalletIndex] = useState<{ title: string }[]>([])

    const [typeValue, setTypeValue] = useState<any>();
    const [value, setValue] = useState<Number>(0);

    const [isSave, setIsSave] = useState<boolean>(false);

    useEffect(() => {
        setPalletIndex([])
        palletData.map((item: IPlanItems) => {
            setPalletIndex(prevState => ([...prevState, ({title: item.index})]))
        })
    }, [palletData]);

    const onSaveClick = async () => {
        setIsSave(true)

        const obj: IPlanItems = {
            description: getDescription(typeValue),
            index: typeValue,
            ready: 0,
            planQta: value,
        }
        console.log(obj);
        handleInputChange(obj)
    }

    return (
        <div>
            {!isSave
            ?
                <div>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        onChange={(event, value) => setTypeValue(value)}
                        options={palletIndex.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='From'
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    <OutlinedInput
                        required={true}
                        id="outlined-adornment-weight"
                        type={'Number'}
                        value={value}
                        onChange={(event) => setValue(Number(event.target.value))}
                        endAdornment={<InputAdornment position="end">SHT</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'Quantity',
                        }}
                    />
                    <MyButton click={onSaveClick}>Save</MyButton>
                </div>
            :
                <div>
                    <h5>{typeValue}</h5>
                    <article>Quantity: {value}</article>
                </div>
            }
        </div>
    );
};

export default Input;