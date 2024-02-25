import React, {FC} from 'react';
import styles from './MyButton.module.css'
import {Button} from "@mui/material";

interface MyButtonProps {
    click?: () => void; // Function type representing a click event handler
    children?: React.ReactNode; // Type representing any React node
    props?: React.HTMLProps<HTMLButtonElement>;
    disabled?: boolean// Additional props for the button
}


const MyButton: FC<MyButtonProps> = ({click,children, props,disabled}) => {
    return (
        <Button disabled={disabled} {...props} onClick={click} className={styles.Main}>{children}</Button>
    );
};

export default MyButton;