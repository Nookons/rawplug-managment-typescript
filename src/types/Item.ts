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
interface IBarrelTarget {
    first: 0,
    secondary: 0,
    third: 0,
    four: 0
}
export interface IAddFormData {
    index: string;
    type: string;
    description: string;
    fromDepartment: string;
    jm: string;
    toDepartment: string;
    quantity: number;
    status: string;
    batchNumber: number;
    barrel: IBarrelTarget
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


export interface IItemTemplate {
    myIndex: string,
    type: string,
    palletQta: number,
    jm: string,
    imageUrl?: string,
    description: string,
    movement?: IMovementTemplate
    status?: string;
}

interface IMovementTemplate {
    from: string;
    to: string;
}