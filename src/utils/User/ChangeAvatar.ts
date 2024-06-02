import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export const onUploadAvatar = async (image: any, user: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/avatar_${user.uid}`);

    try {
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Upload failed', error);
    }
};
