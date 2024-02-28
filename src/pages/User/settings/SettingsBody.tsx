import React, {FC} from 'react';
import {IUser} from "../../../types/User";

interface SettingsBodyProps {
    user: IUser
}

const SettingsBody: FC<SettingsBodyProps> = ({user}) => {

    console.log(user);

    return (
        <div>
            <article>DisplayName: {user.providerData["0"].displayName}</article>
            <article>email: {user.providerData["0"].email}</article>
            <article>uid: {user.uid}</article>
            <article>creationTime: {user.metadata.creationTime}</article>
            <article>lastSignInTime: {user.metadata.lastSignInTime}</article>
        </div>
    );
};

export default SettingsBody;