export interface IPlanItems {
    description?: string;
    index: string;
    ready: number;
    planQta: number;
}

export interface IPlan {
    createdDate: string;
    forDate: string;
    id: number;
    firstMachine: IPlanItems[];
    secondaryMachine: IPlanItems[];
    thirdMachine: IPlanItems[];
}