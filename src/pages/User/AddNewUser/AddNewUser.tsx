import React, {useReducer, useState} from 'react';
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from "firebase/auth";
import {collection, addDoc, setDoc, doc} from "firebase/firestore";
import {db} from "../../../firebase";
import {useNavigate} from "react-router-dom";
import {SIGN_IN_ROUTE} from "../../../utils/consts";
import {useAppDispatch} from "../../../hooks/storeHooks";
import {signOutUser} from "../../../store/reducers/User/userSlice";

const initialState = {
    email: "",
    role: "",
    password: Date.now().toString(),
    isSending: false,
    error: {isError: false, message: ""},
    success: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {...state, [action.field]: action.value};
        case 'SET_SENDING':
            return {...state, isSending: action.isSending};
        case 'SET_ERROR':
            return {...state, error: {isError: action.isError, message: action.message}};
        case 'SET_SUCCESS':
            return {...state, success: action.success};
        default:
            return state;
    }
};

const AddNewUser = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);

    const storeDispatch = useAppDispatch();

    const [dialog, setDialog] = useState({open: false});

    const handleInputChange = (event) => {
        dispatch({type: 'SET_FIELD', field: event.target.id, value: event.target.value});
    };

    const handleRoleChange = (event) => {
        dispatch({type: 'SET_FIELD', field: 'role', value: event.target.value});
    };

    const writeInFireBase = async (user) => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                ...user
            });
        } catch (error) {
            throw new Error(error.toString());
        }
    };

    const onSignUp = async () => {
        if (!state.email || !state.role) {
            dispatch({type: 'SET_ERROR', isError: true, message: 'Email and role are required.'});
            return;
        }

        dispatch({type: 'SET_SENDING', isSending: true});
        dispatch({type: 'SET_ERROR', isError: false, message: ""});

        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
            const user = userCredential.user;

            await writeInFireBase({
                uid: user.uid,
                email: state.email,
                role: state.role,
                experience: 0,
                nextLevel: 100,
                level: 1,
                createdAt: new Date().toISOString()
            });

            await sendEmailVerification(user);
            console.log('Email verification sent!');
            dispatch({type: 'SET_SUCCESS', success: true});
            setDialog({open: true});
        } catch (error) {
            console.error(`Error: ${error.message}`);
            dispatch({type: 'SET_ERROR', isError: true, message: error.message});
        } finally {
            dispatch({type: 'SET_SENDING', isSending: false});
        }
    };

    const handleCloseDialog = async () => {
        setDialog({open: false});
        storeDispatch(signOutUser())
        navigate(SIGN_IN_ROUTE);
    };

    return (
        <Container sx={{p: 2, minHeight: 'calc(100dvh - 162px)'}} maxWidth="md">
            <Backdrop sx={{zIndex: 99}} open={state.isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                open={state.error.isError}
                autoHideDuration={6000}
                onClose={() => dispatch({type: 'SET_ERROR', isError: false, message: ''})}
            >
                <Alert severity="error">{state.error.message}</Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                open={state.success}
                autoHideDuration={6000}
                onClose={() => dispatch({type: 'SET_SUCCESS', success: false})}
            >
                <Alert severity="success">User created successfully!</Alert>
            </Snackbar>
            <Dialog
                open={dialog.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Вітаємо, ви успішно додали нового користувача"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Це пароль для нового користувача, будь ласка, не забудьте, ви більше не зможете його бачити,
                        Тепер ви вийдете з системи і повинні будете увійти знову
                    </DialogContentText>
                    <Alert sx={{mt: 2}} severity="info"><p>{state.password}</p></Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} autoFocus>Далі</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="h5" gutterBottom component="h5">
                            Додати нового користувача
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Якщо ви бажаєте створити нового користувача для програми, ви можете зробити це, почавши з
                            опції Додати нову адресу електронної пошти, яка доступна для користувачів, що очікують на
                            активацію облікового запису.
                        </Typography>
                        <TextField
                            sx={{my: 2}}
                            id="email"
                            value={state.email}
                            onChange={handleInputChange}
                            fullWidth
                            type="email"
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="role"
                            select
                            value={state.role}
                            onChange={handleRoleChange}
                            label="Роль"
                            helperText="Будь ласка, оберіть роль для співробітника"
                        >
                            <MenuItem value="machine">Робітник на машині</MenuItem>
                            <MenuItem value="mixer">Робітник на мішальні</MenuItem>
                            <MenuItem value="forklift">Водій вилочного навантажувача</MenuItem>
                            <MenuItem value="leader">Лідер</MenuItem>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button onClick={onSignUp} fullWidth variant="contained" sx={{my: 1}}>
                        Додати
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddNewUser;
