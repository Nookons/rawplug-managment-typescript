import React, {useEffect, useState} from 'react';
import styles from './Add.module.css'

import data175 from '../../../assets/PalletData175ml.json'
import data300 from '../../../assets/PalletData300ml.json'
import {
    Alert,
    Autocomplete,
    Avatar, Backdrop,
    Button, CircularProgress,
    Rating,
    Slider,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import Box from "@mui/material/Box";

import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import {AddPallet} from "../../../utils/Ready/Add";
import {useAppSelector} from "../../../hooks/storeHooks";

const Add = () => {
    const {user, loading, error} = useAppSelector(state => state.user)

    const [indexesData, setIndexesData] = useState<any[]>([]);

    const [isFraction, setIsFraction] = useState(true);

    const [data, setData] = useState<any>({
        index: '',
        imgUrl: '',
        machine: '',
        maxQuantity: 0,
        quantity: 0,
        atBox: 10,
    });

    useEffect(() => {
        setIndexesData([])

        data175.forEach((element) => {
            setIndexesData((prevState) => ([...prevState, element]))
        })

        data300.forEach((element) => {
            setIndexesData((prevState) => ([...prevState, element]))
        })

    }, [data175, data300]);

    useEffect(() => {
        const filtered = indexesData.find(item => item.index === data.index)

        if (filtered) {
            setData((prev) => ({
                ...prev,
                imgUrl: filtered.imgUrl,
                quantity: filtered.atBox * filtered.palletQta,
                atBox: filtered.atBox,
                maxQuantity: filtered.atBox * filtered.palletQta
            }))
        }
    }, [data.index]);

    useEffect(() => {
        setIsFraction(Number.isInteger(data.quantity / data.atBox))
    }, [data.quantity]);


    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string,) => {
        setData((prev) => ({...prev, machine: newAlignment}));
    };

    const [isSending, setIsSending] = useState(false);

    const onAddItem = async () => {
        try {
            setIsSending(true);

            if (!user.uid) {
                throw new Error ('Please sign in that add some items...')
            }

            const response = await AddPallet(data, user)
            console.log(response);
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setIsSending(false);
            }, 250)
        }
    }

    const onChangeInput = (event: void) => {
        const refactored = event.target.value.replace(" ", "-").toUpperCase();
        setData((prev) => ({...prev, index: refactored}))
    }

    return (
        <div className={styles.Main}>
            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className={styles.Wrapper}>
                <Autocomplete
                    disablePortal
                    value={data.index}
                    onInput={(event) => onChangeInput(event)}
                    onChange={(event, value) => setData((prev) => ({...prev, index: value}))}
                    options={indexesData.map((el) => el.index)}
                    fullWidth={true}
                    renderInput={(params) => <TextField {...params} label="Pallet index"/>}
                />

                <div className={styles.InputWrapper}>

                    <div className={styles.InputBlock}>
                        <div className={styles.AvatarBlock}>
                            <Avatar sx={{width: 106, height: 106}} variant={"rounded"} src={data.imgUrl}>
                                N
                            </Avatar>
                            <ToggleButtonGroup
                                color={"success"}
                                value={data.machine}
                                exclusive
                                onChange={handleChange}
                                aria-label="Platform"
                                fullWidth={true}
                            >
                                <ToggleButton value="nap01">Nap-01</ToggleButton>
                                <ToggleButton value="nap02">Nap-02</ToggleButton>
                                <ToggleButton value="nap03">Nap-03</ToggleButton>
                            </ToggleButtonGroup>
                        </div>

                        <TextField
                            id="outlined-basic"
                            label="Quantity"
                            variant="outlined"
                            value={data.quantity}
                            fullWidth={true}
                            onChange={(event) => setData((prev) => ({...prev, quantity: Number(event.target.value)}))}
                            type={"Number"}
                        />
                        <Rating
                            value={(data.quantity / data.atBox) / 15}
                            precision={0.5}
                            max={5}
                            name="simple-controlled"
                            icon={<Brightness4RoundedIcon fontSize="inherit"/>}
                            emptyIcon={<Brightness1OutlinedIcon fontSize="inherit"/>}
                            readOnly={true}/>
                        {!isFraction
                            ?
                            <Alert severity="error">
                                <article>Sorry, but you can add pallet only with integer number boxes, is you
                                    have {data.quantity / data.atBox} pcs
                                </article>
                            </Alert>
                            : <Button onClick={onAddItem} variant={"contained"} fullWidth={true}>Add</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;