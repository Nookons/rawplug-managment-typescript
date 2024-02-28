interface Io {
    providerId: string | null;
    uid: string | null;
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
}
interface IProviderData {
    0: Io
}

interface IStsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: string;
}

export interface IUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: IProviderData;
    stsTokenManager: IStsTokenManager;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
}