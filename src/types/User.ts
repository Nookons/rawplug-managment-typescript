enum positionEnum {
    leader = 'leader',
    chemical = 'Chemical worker',
    machine = 'Machine worker',
}

interface IStsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}
interface IProviderData {
    providerId: string;
    uid: string;
    displayName: string | null;
    email: string;
    phoneNumber: string | null;
    photoURL: string | null;
}

export interface IUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
    stsTokenManager: IStsTokenManager;
    providerData: [IProviderData]
}