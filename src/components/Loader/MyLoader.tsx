import React, { FC } from 'react';
import {CircularProgress, LinearProgress} from "@mui/material";

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
                    <div style={{padding: 24, backgroundColor: "white", borderRadius: 4}}>
                        <CircularProgress/>
                    </div>
                </div>
            : null}
        </div>
    );
};

export default MyLoader;
