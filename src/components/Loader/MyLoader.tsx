import React, { FC } from 'react';
import { CircularProgress } from "@mui/material";

interface MyLoaderProps {
    isLoading?: boolean;
    setLoading?: () => void;
}

const MyLoader: FC<MyLoaderProps> = ({ isLoading, setLoading }) => {
    return (
        <div style={{
            position: "fixed",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0, 0.5)'
        }}>
             <CircularProgress />
        </div>
    );
};

export default MyLoader;
