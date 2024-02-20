import React, {FC, useState} from 'react';
import MyButton from "../../../components/MyButton/MyButton";
import {IPlan} from "../../../types/Plans";
import Input from "./Input";
import styles from '../AddPlan.module.css'

interface FirstMachineProps {
    formData?: IPlan;
    setFormData?: any;
    palletIndex?: { title: string } [];
    onObjectChange?: (obj: any) => void;
}

const Mashine: FC<FirstMachineProps> = ({formData, setFormData, palletIndex, onObjectChange}) => {

    const [value, setValue] = useState<number>(1);
    const [inputs, setInputs] = useState<string[]>(Array.from({ length: value }, () => ""));


    const handleAddClick = () => {
        setValue(value + 1);
        setInputs([...inputs, ""]);
    };



    return (
        <div className={styles.MachineWrapper}>
            <>
                <MyButton click={handleAddClick}>+</MyButton>
            </>
            {Array.from({ length: value }, (_, index) => {

                const handleInputChange = (obj: any) => {
                    const newObj = { ...obj }; // Здесь вы можете создать объект с нужными данными
                    onObjectChange && onObjectChange(newObj);
                };


                return (
                    <div className={styles.Machine}>
                        <Input handleInputChange={handleInputChange}/>
                    </div>
                )
            })}
        </div>
    );
};

export default Mashine;