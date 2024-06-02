import React, {useState} from 'react';
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    Paper, Snackbar,
    Stack,
    TextField
} from "@mui/material";
import {onChangePassword} from "../../../../utils/User/ChangePassword";

const ChangePassword = () => {
    const [isSending, setIsSending] = useState(false);

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<any>({
        error: false,
        message: ""
    });

    const validatePassword = (password: string) => {
        const minLengthRegex = /.{8,}/;
        const upperCaseRegex = /(?=.*[A-Z])/;
        const digitRegex = /(?=.*\d)/;
        const specialCharRegex = /(?=.*[!@#$%^&*])/;

        if (!minLengthRegex.test(password)) {
            return "Пароль должен быть длиной не менее 8 символов.";
        }
        if (!upperCaseRegex.test(password)) {
            return "Пароль должен содержать минимум одну заглавную букву.";
        }
        if (!digitRegex.test(password)) {
            return "Пароль должен содержать минимум одну цифру.";
        }
        return "";
    };

    const onSetNewPassword = async () => {
        try {
            setIsSending(true)
            const response = await onChangePassword(currentPassword, newPassword)

            if (response) {
                setCurrentPassword("")
                setCheckPassword("")
                setNewPassword("")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsSending(false)
        }
    }

    const onSave = () => {
        const validationError = validatePassword(newPassword);

        setPasswordError({
            error: false,
            message: ""
        });

        if (validationError) {
            setPasswordError({
                error: true,
                message: validationError
            });
        } else if (newPassword !== checkPassword) {
            setPasswordError({
                error: true,
                message: "Паролі не співпадають."
            });
        } else {
            onSetNewPassword();
        }
    }

    return (
        <div>
            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <article>Нижче ви можете змінити свій пароль</article>
            <hr/>

            <Grid
                sx={{alignItems: "center"}}
                container
                spacing={2}
            >
                <Grid item xs={12} md={4}>
                    <TextField
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        type={"password"}
                        fullWidth={true}
                        label="Старый пароль"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        value={newPassword}
                        error={passwordError.error}
                        onChange={(event) => setNewPassword(event.target.value)}
                        type={"password"}
                        fullWidth={true}
                        label="Новий пароль"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        value={checkPassword}
                        error={passwordError.error}
                        onChange={(event) => setCheckPassword(event.target.value)}
                        type={"password"}
                        fullWidth={true}
                        label="Перевірка нового пароля"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button onClick={onSave} fullWidth={true} variant="outlined">Зберегти</Button>
                </Grid>
            </Grid>
            {passwordError.error && <Alert severity="error">{passwordError.message}</Alert>}
        </div>
    );
};

export default ChangePassword;