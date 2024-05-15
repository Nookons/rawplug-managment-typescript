enum positionEnum {
    leader = 'leader',
    chemical = 'Chemical worker',
    machine = 'Machine worker',
}

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    phoneNumber: string;
    experience: string;
    position: positionEnum;
}