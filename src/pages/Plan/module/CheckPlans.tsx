import React from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {Alert, Skeleton} from "@mui/material";
import CheckPlanModule from "./CheckPlanModule";

const CheckPlans = () => {
    const {items, loading, error} = useAppSelector(state => state.plans)


    return (
        <>
            {!loading ?
                <>
                    {!error
                        ? <CheckPlanModule items={items}/>
                        : <Alert severity="error">{error}</Alert>
                    }
                </>
                :
                <Skeleton variant="rectangular" width={210} height={60}/>
            }
        </>
    );
};

export default CheckPlans;