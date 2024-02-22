export interface IItem {
    Created: string,
    JM: string,
    palletReceipt: string,
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
    batchNumber?: number | null
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
    imageUrl: string,
    description: string,
}