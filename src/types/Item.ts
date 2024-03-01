export interface IItem {
    Created: string,
    JM: string,
    PalletReceipt: string,
    Recipient: string,
    Sender: string,
    createdDate: string,
    description: string,
    id: number,
    index: string,
    lastChange?: string,
    quantity: number,
    status: string,
    type: string,
    userUid: string,
    batchNumber?: number
    barrel?: IBarrelObject
}

interface IBarrelObject{
    first: number;
    secondary: number;
    third: number;
    four: number;
}

export interface IStatsItem {
    index: string
    lastChange: string;
    pallets: number;
    quantity: number;
}


export interface ICardItem {
    myIndex: string,
    type: string,
    palletQta: number,
    jm: string,
    imageUrl?: string,
    description: string,

}