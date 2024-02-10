import React, {FC} from 'react';
import styles from './LeftMenu.module.css'
import MyButton from "../MyButton/MyButton";
import logo from '../../assets/logo.svg'
import {useNavigate} from "react-router-dom";
import {ADD_ITEM_ROUTE} from "../../utils/consts";

interface LeftMenuProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
}

const LeftMenu: FC<LeftMenuProps> = ({visible, setVisible}) => {
    const navigate = useNavigate();

    const rootClasses: any = [styles.Main]

    if (visible) {
        rootClasses.push(styles.Active)
    }

    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(' ')}>
            <div onClick={(event) => event.stopPropagation()} className={styles.Wrapper}>
                <div className={styles.ButtonBlock}>
                    <h5 style={{display: 'flex', alignItems: 'center', gap: 14}}>
                        <img style={{maxWidth: 50}} src={logo} alt=""/>
                        Rawplug managment
                    </h5>
                    <MyButton click={() => navigate(ADD_ITEM_ROUTE)}>Add item</MyButton>
                    <MyButton>Add Pallet</MyButton>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
                    <MyButton click={() => setVisible(false)}>X</MyButton>
                    <article>version: 0.1.0</article>
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;