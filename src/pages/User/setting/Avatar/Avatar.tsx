import React, {useState, useEffect} from 'react';
import {
    Avatar,
    Backdrop,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField,
    Tooltip
} from "@mui/material";
import {onUpdateUser} from "../../../../utils/User/UpdateUser";
import {useAppDispatch, useAppSelector} from "../../../../hooks/storeHooks";
import Img from "./Img";
import {onUploadAvatar} from "../../../../utils/User/ChangeAvatar";
import { getAuth, updateProfile } from "firebase/auth";
import {userChangeAvatar} from "../../../../store/reducers/User/userSlice";


const UserAvatar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    const [isChange, setIsChange] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [isSending, setIsSending] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = async () => {
        if (image) {
            setIsChange(false);
            setIsSending(true)
            const downloadURL = await onUploadAvatar(image, user);

            if (downloadURL) {
                const auth = getAuth();

                const temp = {
                    photoUrl: downloadURL
                }

                await updateProfile(auth.currentUser, {
                    photoURL: downloadURL
                }).then(() => {
                    dispatch(userChangeAvatar(downloadURL))
                }).catch((error) => {
                    // An error occurred
                    // ...
                });

                await onUpdateUser(temp, user);
                setIsSending(false)
            }
        }
    };

    return (
        <>
            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Dialog
                open={isChange}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={() => setIsChange(false)}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {preview && (
                            <Avatar
                                sx={{width: "100%", height: "50vh", my: 2}}
                                src={preview}
                                variant={"rounded"}
                            >
                                Error
                            </Avatar>
                        )}
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="contained-button-file"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button fullWidth={true} variant="contained" component="span">
                                Обрати зображення
                            </Button>
                        </label>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsChange(false)}>Disagree</Button>
                    <Button onClick={handleUploadImage} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>

            <Tooltip
                onClick={() => setIsChange(true)}
                sx={{width: "100%"}}
                title={<p style={{color: "white"}}>Click to change avatar</p>}
                arrow
            >
                <Button>
                    <Img/>
                </Button>
            </Tooltip>
        </>
    );
};

export default UserAvatar;
