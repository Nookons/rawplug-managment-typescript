import React, {FC, useState} from 'react';
import styles from "./AddItem.module.css";
import {Checkbox, InputAdornment, OutlinedInput} from "@mui/material";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {IFormData} from "./AddItem";

interface BarrelProps {
    onChangeDataEvent: (type: string, value: any) => void;
    formData: IFormData;
    isBatchError: boolean;
}

const Barrel: FC<BarrelProps> = ({onChangeDataEvent, formData, isBatchError}) => {

    const [isWeight, setIsWeight] = useState<boolean>(false);

    return (
        <>
            <div className={styles.BarrelWrapper}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Checkbox
                        icon={<CallMissedOutgoingIcon/>}
                        checkedIcon={<BorderColorIcon/>}
                        checked={isWeight}
                        onChange={() => setIsWeight(!isWeight)}
                    />

                    <p> Please click to add weight for barrels </p>
                </div>
                {
                    isWeight ?
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
                            <OutlinedInput
                                required={true}
                                error={isBatchError}
                                placeholder="Barrel #1"
                                id="outlined-adornment-weight"
                                type={'Number'}
                                value={formData.barrel.first}
                                onChange={(event) => onChangeDataEvent("first", Number(event.target.value))}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            />
                            <OutlinedInput
                                required={true}
                                error={isBatchError}
                                placeholder="Barrel #2"
                                id="outlined-adornment-weight"
                                type={'Number'}
                                value={formData.barrel.secondary}
                                onChange={(event) => onChangeDataEvent("secondary", Number(event.target.value))}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            />
                            <OutlinedInput
                                required={true}
                                error={isBatchError}
                                placeholder="Barrel #3"
                                id="outlined-adornment-weight"
                                type={'Number'}
                                value={formData.barrel.third}
                                onChange={(event) => onChangeDataEvent("third", Number(event.target.value))}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            />
                            <OutlinedInput
                                required={true}
                                error={isBatchError}
                                placeholder="Barrel #4"
                                type={'Number'}
                                value={formData.barrel.four}
                                onChange={(event) => onChangeDataEvent("four", Number(event.target.value))}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            />
                        </div> : null
                }
                <OutlinedInput
                    fullWidth={true}
                    error={isBatchError}
                    placeholder="Batch number"
                    type={'Number'}
                    onChange={(event) => onChangeDataEvent('batchNumber', Number(event.target.value))}
                    startAdornment={<InputAdornment position="start">🛢️ Batch:</InputAdornment>}
                    value={formData.batchNumber}
                    defaultValue={formData.batchNumber + 1}
                />
            </div>
        </>
    );
};

export default Barrel;