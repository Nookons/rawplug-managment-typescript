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
        data.forEach((item: ICardItem) => {
            if (item.myIndex === formData.index) {
                setFormData(prevState => ({
                    ...prevState,
                    type: item.type,
                    description: item.description,
                    FromDepartment: 'MSP',
                    JM: item.jm,
                    ToDepartment: 'PWT70',
                    quantity: item.palletQta,
                    status: 'Available',
                }));
            }
        });
    }, [formData.index]);

    const handleInputChange = (type: string, value: any) => {
        setFormData((prevData) => ({...prevData, [type]: value}));
    };

    const onAddItemClick = async () => {
        try {
            setLoader(true);
            const response = await onAddItem(formData, user, itemsStats);

            if (response[0]) {
                dispatch(addItem<IItem>(response[1]));
                navigate(HOME_ROUTE)
            } else {
                setError(response[1])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    };


    return (
        <div className={styles.Main}>
            <MyLoader isVisible={loader}/>
            <div className={styles.Wrapper}>
                <h5 style={{marginTop: 4, color: 'red'}}>{error}</h5>
                <InputBlock handleInputChange={handleInputChange} ITEM_INDEX={ITEM_INDEX} formData={formData}/>
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