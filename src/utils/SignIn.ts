import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";

interface mySignInProps {
    nickName: string;
    password: string;
}

export async function mySignIn({ nickName, password }: mySignInProps) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, nickName, password);
        const user = userCredential.user;
        return user;

    } catch (error) {
        const errorCode = (error as any).code;

        switch (errorCode) {
            case 'auth/invalid-email':
                throw new Error('email');
            case 'auth/missing-password':
                throw new Error('missing-password');
            case 'auth/invalid-credential':
                throw new Error('invalid-credential');
            default:
                throw new Error('unknown-error');
        }
    }
}
