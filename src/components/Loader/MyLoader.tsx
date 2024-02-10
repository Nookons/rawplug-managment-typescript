import React, { FC } from 'react';
import { CircularProgress } from "@mui/material";

interface MyLoaderProps {
    isVisible: boolean;
    setLoading?: () => void;
}

const MyLoader: FC<MyLoaderProps> = ({ isVisible, setLoading }) => {
    return (
        <div>
            {isVisible ?
                <div style={{
                    position: "fixed",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0, 0.5)',
                    zIndex: 2
                }}>
                    <CircularProgress />
                </div>
            : null}
        </div>
    );
};

export default MyLoader;
