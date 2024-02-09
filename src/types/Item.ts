export interface IItem {
    created: string,
    jm: string,
    palletReceipt: string,
    receipt: string,
    sender: string,
    createdDate: string,
    description: string,
    id: number,
    index: string,
    lastChange?: string,
    quantity: number,
    status: string,
    type: string,
    userUid: string
}


export interface ICardItem {
    myIndex: string,
    type: string,
    palletQta: number,
    jm: string,
    imageUrl: string,
    description: string,
}