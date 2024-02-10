import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";


export async function mySignOut() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    let status = false;

    await signOut(auth).then(() => {
        status = true
    }).catch((error) => {
        console.error(error);
        status = false
    });

    return status
}
