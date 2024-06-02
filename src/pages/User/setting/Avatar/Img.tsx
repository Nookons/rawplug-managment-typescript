import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../../hooks/storeHooks";
import {Avatar, Skeleton} from "@mui/material";

const Img = () => {
    const {user, loading, error} = useAppSelector(state => state.user);
    const [url, setUrl] = useState<string>("");
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    useEffect(() => {
        setUrl("");
        setImageLoading(true);

        if (!loading && user !== null) {
            setUrl(user.photoURL);
            setImageLoading(false);
        }
    }, [user, loading, error]);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
    };

    return (
        <>
            {loading || imageLoading ? (
                <Skeleton variant="rectangular" width={"100%"} height={"40dvh"}/>
            ) : (
                <Avatar
                    src={url}
                    variant={"rounded"}
                    sx={{width: "100%", height: "40dvh"}}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                >
                    {user?.email.split("@")[0]}
                </Avatar>
            )}
        </>
    );
};

export default Img;
