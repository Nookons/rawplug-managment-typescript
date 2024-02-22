import React, {useEffect, useState} from 'react';
import styles from './AddItem.module.css'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import MyButton from "../../../components/MyButton/MyButton";
import data from '../../../assets/ItemsInfo.json'
import {ICardItem, IItem} from "../../../types/Item";
import InputBlock from "./InputBlock";
import {onAddItem} from "../../../utils/AddItem";
import {addItem} from "../../../store/reducers/item/itemsSlice";
import MyLoader from "../../../components/Loader/MyLoader";
import {HOME_ROUTE} from "../../../utils/consts";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {Checkbox, InputAdornment, OutlinedInput, TextField} from "@mui/material";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

export interface IFormData {
    index: string,
    type: string,
    description: string,
    FromDepartment: string,
    JM: string,
    ToDepartment: string,
    quantity: number,
    status: string,
    batchNumber?: number,
}

const AddItem = () => {
    const user = useAppSelector(state => state.user.user)
    const itemsStats = useAppSelector(state => state.items.itemsStats)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<string>('');
    const [ITEM_INDEX, setITEM_INDEX] = useState<{ title: string }[]>([]);


    const [isBarrel, setIsBarrel] = useState<boolean>(false);
    const [isWeight, setIsWeight] = useState<boolean>(false);

    const [isLoader, setIsLoader] = useState<boolean>(false);

    const [barrelData, setBarrelData] = useState({
        first: 0,
        secondary: 0,
        third: 0,
        four: 0
    });


    const [formData, setFormData] = useState<IFormData>({
        index: '',
        type: '',
        description: '',
        FromDepartment: '',
        JM: '',
        ToDepartment: '',
        quantity: 0,
        status: '',
        batchNumber: 0,
    });

    useEffect(() => {
        setITEM_INDEX([])

        data.map((item: ICardItem) => {
            setITEM_INDEX(prevState => [...prevState, {title: item.myIndex}])
        })
    }, [data]);


    useEffect(() => {
        setIsBarrel(false);

        const updatedFormData = { ...formData };

        data.forEach((item: ICardItem) => {
            if (item.myIndex === formData.index) {
                updatedFormData.type = item.type;
                updatedFormData.description = item.description;
                updatedFormData.FromDepartment = 'MSP';
                updatedFormData.JM = item.jm;
                updatedFormData.ToDepartment = 'PWT70';
                updatedFormData.quantity = item.palletQta;
                updatedFormData.status = 'Available';

                if (item.type.toLowerCase() === "barrel") {
                    setIsBarrel(true);
                    const trim = item.myIndex.split('-');
                    updatedFormData.FromDepartment = 'PWT70';
                    updatedFormData.batchNumber = 19555;

                    if (trim[1].toLowerCase() === "cmb") {
                        updatedFormData.status = 'Odzysk';
                        updatedFormData.FromDepartment = 'PWT70';
                        updatedFormData.batchNumber = 19555;
                    }
                }
            }
        });

        setFormData(updatedFormData); // Update formData state with accumulated changes
    }, [formData.index, data]);

    const handleInputChange = (type: string, value: any) => {
        setFormData((prevData) => ({...prevData, [type]: value}));
    };

    const onAddItemClick = async () => {
        try {
            setLoader(true);
            const response = await onAddItem(formData, user, itemsStats);

            if (response[0]) {
                dispatch(addItem(response[1]));
                navigate(HOME_ROUTE)
            } else {
                setError(response[1])
            }
        } catch (error) {
            console.log(error);
        } finally {

            setTimeout(() => {
                setLoader(false);
            }, 500)
        }
    };

    const onBarrelChange = (type: string, value: number) => {
        setBarrelData((prevState) => ({...prevState, [type]: value}))
    }

    useEffect(() => {
        const allBarrel = barrelData.first + barrelData.secondary + barrelData.third + barrelData.four

        setFormData(prevState => ({...prevState, quantity: allBarrel}))
    }, [barrelData]);


    return (
        <div className={styles.Main}>
            <MyLoader isVisible={loader}/>
            <div className={styles.Wrapper}>
                <h5 style={{marginTop: 4, color: 'red'}}>{error}</h5>
                <InputBlock handleInputChange={handleInputChange} ITEM_INDEX={ITEM_INDEX} formData={formData}/>
                {
                    isBarrel ?
                        <div style={{backgroundColor: "#f3f3f3", padding: 14, display: "flex", flexDirection: "column", gap: 14}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Checkbox
                                    icon={<CallMissedOutgoingIcon/>}
                                    checkedIcon={<BorderColorIcon/>}
                                    checked={isWeight}
                                    onChange={() => setIsWeight(!isWeight)}
                                />

                                <p> Please click to add weight for barrels ( Test )</p>
                            </div>
                            {
                                isWeight ?
                                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #1"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("first", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #2"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("secondary", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #3"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("third", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                        <OutlinedInput
                                            required={true}
                                            placeholder="Barrel #4"
                                            id="outlined-adornment-weight"
                                            type={'Number'}
                                            onChange={(event) => onBarrelChange("four", Number(event.target.value))}
                                            endAdornment={<InputAdornment position="end">{formData.JM}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'Quantity',
                                            }}
                                        />
                                    </div> : null
                            }
                            <OutlinedInput
                                fullWidth={true}
                                placeholder="Batch number"
                                type={'Number'}
                                startAdornment={<InputAdornment position="start" >🛢️ Batch:</InputAdornment>}
                                defaultValue={Number(formData.batchNumber)}/>
                        </div>
                        : null
                }
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 14}}>
                    <MyButton click={onAddItemClick}>Add item</MyButton>
                </div>
                <div>
                    <p style={{color: "gray", margin: '4px 0'}}>From: {user ? user.email : null}</p>
                    {
                        formData.description
                        ? <p style={{color: "gray", margin: '4px 0'}}>Description: {formData.description}</p>
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default AddItem;