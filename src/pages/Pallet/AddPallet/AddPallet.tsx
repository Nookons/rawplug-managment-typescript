import React, {useEffect, useState} from 'react';
import styles from './AddpAllet.module.css'
import {Alert, Autocomplete, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {IPalletItem, IPallets, IUserPallet} from "../../../types/Pallet";
import PalletData from '../../../assets/PalletsData.json'
import MyButton from "../../../components/MyButton/MyButton";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {onAddPallet} from "../../../utils/AddPallet";
import MyLoader from "../../../components/Loader/MyLoader";
import {useNavigate} from "react-router-dom";
import {addPallet} from "../../../store/reducers/Pallets/PalletsSlice";
import {HOME_ROUTE} from "../../../utils/consts";
import {changeReady} from "../../../store/reducers/Plan/PlansReducer";

const AddPallet = () => {
    const {user, loading, error} = useAppSelector(state => state.user)
    const plans = useAppSelector(state => state.plans.items)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const [responseError, setResponseError] = useState<string | null>(null);

    const [myLoader, setMyLoader] = useState<boolean>(false);

    const machineIndex = [
        {title: 'first'},
        {title: 'secondary'},
        {title: 'third'},
    ]

    const [formData, setFormData] = useState<IUserPallet>({
        index: '',
        description: '',
        machineIndex: 'first',
        quantity: 0
    });

    useEffect(() => {
        PalletData.map((item: IPalletItem) => {
            if (item.index === formData.index) {
                setFormData(prevState => ({
                    ...prevState,
                    description: item.description,
                    quantity: item.atBox * item.palletQta
                }))
            }
        })
    }, [formData.index]);

    const handleInputChange = (type: string, value: any) => {
        setFormData((prevData) => ({...prevData, [type]: value}));
    };

    const handleQuantityChange = (type: string, value: number) => {
        setFormData((prevData) => ({...prevData, [type]: value}));
    };

    const onSend = async () => {
        setMyLoader(true);
        try {
            setResponseError('')
            const response = await onAddPallet(formData, user, plans);

            console.log(response);

            if (!response[0]) {
                setResponseError(response[1])
            } else {
                setTimeout(() => {
                    dispatch(addPallet(response[1]))
                    navigate(HOME_ROUTE)
                    window.location.reload();
                }, 500)
            }
        } finally {
            setTimeout(() => {
                setMyLoader(false)
            }, 500)
        }
    }

    return (
        <div className={styles.Main}>
            <MyLoader isVisible={myLoader} />
            <div>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    onChange={(event, value) => handleInputChange('index', value)}
                    options={PalletData.map((option) => option.index)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Index"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                            required={true}
                        />
                    )}
                />
                <OutlinedInput
                    required={true}
                    id="outlined-adornment-weight"
                    type={'Number'}
                    value={formData.quantity}
                    onChange={(event) => handleQuantityChange('quantity', Number(event.target.value))}
                    endAdornment={<InputAdornment position="end">SHT</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'Quantity',
                    }}
                />
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    defaultValue={formData.machineIndex}
                    onChange={(event, value) => handleInputChange('machineIndex', value)}
                    options={machineIndex.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Machine"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                            required={true}
                        />
                    )}
                />
                <MyButton click={onSend}>Add</MyButton>
            </div>
            <div>
                <p>{formData.description}</p>
                {responseError ? <Alert severity="error">{responseError}</Alert> : null}
            </div>
        </div>
    );
};

export default AddPallet;