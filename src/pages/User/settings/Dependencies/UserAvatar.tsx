import React, {FC, useEffect, useState} from 'react';
import {Avatar, Backdrop, CircularProgress, Modal, TextField} from "@mui/material";
import MyButton from "../../../../components/MyButton/MyButton";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../../firebase";
import {useAppSelector} from "../../../../hooks/storeHooks";

interface UserAvatarProps {
}

const UserAvatar: FC<UserAvatarProps>= () => {
    const {user, loading, error} = useAppSelector(state => state.user)
    const [file, setFile] = useState<any>(null);
    const [imgPath, setImgPath] = useState('');

    const [imgModal, setImgModal] = useState(false);
    const [backDrop, setBackDrop] = useState(false);


    useEffect(() => {
        const storageRef = ref(storage);
        const imagesRef = ref(storageRef, 'avatars/');
        const fileName = user.uid;
        const spaceRef = ref(imagesRef, fileName);

        getDownloadURL(spaceRef).then((url) => {
            setImgPath(url);
        }).catch((error) => {
            console.error('Error getting download URL:', error);
        });
    }, []);

    const addImg = async () => {
        setImgModal(false);
        setBackDrop(true);

        if (file) {
            try {
                const storage = getStorage();
                const storageRef = ref(storage, 'avatars/' + user.uid);
                await uploadBytes(storageRef, file);
                console.log('Image uploaded successfully!');
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setBackDrop(false);
            }
        } else {
            console.error('No file selected!');
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            console.log(selectedFile);
            setFile(selectedFile);
        }
    }

    return (
        <>
            <Backdrop open={backDrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Avatar sx={{width: "100%", height: '350px'}} src={imgPath} variant={"rounded"}>
                {user.email.slice(0, 1).toUpperCase()}
            </Avatar>
            <MyButton click={() => setImgModal(true)}>Change avatar</MyButton>
            <Modal
                open={imgModal}
                onClose={() => setImgModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    top: "50%",
                    left: "50%",
                    transform: 'translate(-50%, -50%)',
                    padding: 14,
                    backgroundColor: "white",
                    borderRadius: 4
                }}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type={"file"}
                        onChange={handleFileChange}
                    />
                    <MyButton click={addImg}>Save</MyButton>
                </div>
            </Modal>
        </>
    );
};

export default UserAvatar;