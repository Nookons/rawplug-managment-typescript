import React from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {Alert, Skeleton} from "@mui/material";
import SettingsBody from "./SettingsBody";

const Settings = () => {
    const {user, loading, error} = useAppSelector(state => state.user);

    return (
        <div style={{padding: 14, minHeight: "calc(100dvh - 160px)"}}>
            {!loading
            ?
                <>
                    {
                        !error ? <SettingsBody user={user} /> : <Alert severity="error">{error}</Alert>
                    }
                </>
            :
                <div style={{display: "flex", gap: 14}}>
                    <Skeleton variant="circular" width={40} height={40}/>
                    <Skeleton variant="rectangular" width={210} height={60} />
                </div>
            }
        </div>
    );
};

export default Settings;