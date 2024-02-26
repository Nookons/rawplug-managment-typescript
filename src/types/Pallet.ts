import {getCurrentUser} from "../utils/AddPallet";

interface INeededItem {
    index?: string;
    quantity?: number;
}

export interface IUserPallet {
    index: string;
    description: string;
    quantity: number;
    machineIndex: string;
}

export interface IPallets {
    id: number;
    createdDate: string;
    index: string;
    quantity: number;
    machine: string;
    JM: string;
    Created: string;
    userUid: string;
    PalletReceipt: string;
    description: string;
}

export interface IPalletItem {
    index: string;
    palletQta: number;
    pallet: string;
    bottle: string;
    atBox: number;
    weight: number;
    jm: string;
    description: string;
    needItem?: INeededItem[]

}