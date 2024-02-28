import React, {FC, ReactEventHandler, useCallback, useEffect, useState} from 'react';
import styles from './User.module.css';
import {Button, Link, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {HOME_ROUTE, SIGN_UP_ROUTE} from "../../utils/consts";
import logo from '../../assets/logo.svg'
import MyButton from "../../components/MyButton/MyButton";
import {mySignIn} from "../../utils/SignIn";
import {userSignIn} from "../../store/reducers/User/userSlice";
import MyLoader from "../../components/Loader/MyLoader";

const SignIn: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user, loading} = useAppSelector((state) => state.user);

    const [formData, setFormData] = useState({
        nickName: '',
        password: ''
    });

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleErrors = (error: any) => {
        switch (error.toString()) {
            case 'Error: email':
                setError('You have not entered an email.');
                break;
            case 'Error: missing-password':
                setError('You have not entered a password.');
                break;
            case 'Error: invalid-credential':
                setError('Invalid email or password. Please try again.');
                setFormData((prevData) => ({ ...prevData, password: '' }));
                break;
            default:
                setError('An error occurred. Please try again.');
        }
    };

    const signInClick = async () => {
        const nickName = formData.nickName;
        const password = formData.password;
        setLoader(true)

        try {
            const response = await mySignIn({ nickName, password });

            console.log(response);

            if (response) {
                dispatch(userSignIn(response))
                navigate(HOME_ROUTE)
            }
        } catch (error) {
            handleErrors(error);
        } finally {
            setLoader(false)
        }
    };


    const onFaqClick = useCallback(() => {
        alert('Hi there! To get started, you\'ll need a team leader to create an account for you. If you\'re interested in having a profile, just have a chat with your leader at work.')
    }, [])


    useEffect(() => {
        // If the user is authenticated, redirect to home
        if (user && user.uid) {
            navigate(HOME_ROUTE);
        }
    }, [user, navigate]);

    return (
        <div className={styles.Main}>
            <MyLoader isVisible={loader}/>
            <div className={styles.Wrapper}>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 34 }}>
                    <img style={{ maxWidth: 32 }} src={logo} alt="" />
                    <h4>Welcome back !!!</h4>
                </div>
                <article>Login:</article>
                <TextField
                    required
                    id="outlined-required"
                    type="email"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleInputChange}
                    placeholder="Please leave a login here"
                />
                <article>Password:</article>
                <TextField
                    id="outlined-password-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    placeholder="Please leave a password here"
                />
                <div style={{ color: 'red', marginTop: 14 }}>{error}</div>
                <article style={{ marginTop: 14 }}>Don't have an account? <Link onClick={onFaqClick} style={{ color: "#7272fd", textDecoration: 'underline solid #7272fd', cursor: 'pointer' }}>🙋 FAQ</Link></article>
                <br/>
                <MyButton click={signInClick}>Sign In</MyButton>
            </div>
        </div>
    );
};

export default SignIn;