import React, {FC} from 'react';
import styles from './MyModal.module.css'
import MyButton from "../MyButton/MyButton";

interface MyModalProps {
    children?: React.ReactNode;
    title?: string;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyModal: FC<MyModalProps> = ({children, title, isActive, setIsActive}) => {
    return (
        <div onClick={() => setIsActive(false)} className={styles.Main}>
            <div onClick={e => e.stopPropagation()} className={styles.Wrapper}>
                <div style={{display: "flex", alignItems: 'center', gap: 14, justifyContent: 'space-between'}}>
                    <article>{title}</article>
                    <MyButton click={() => setIsActive(false)}>X</MyButton>
                </div>
                <div style={{padding: 14}}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;