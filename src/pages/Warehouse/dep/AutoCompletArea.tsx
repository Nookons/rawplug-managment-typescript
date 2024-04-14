import React, {FC} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useAppSelector} from "../../../hooks/storeHooks";
import {useNavigate} from "react-router-dom";

interface AutoCompleteAreaProps {
    searchIndex: string;
    setSearchIndex: (value: string | null) => void;
}

const AutoCompleteArea:FC <AutoCompleteAreaProps> = ({searchIndex, setSearchIndex}) => {
    const navigation = useNavigate();

    const {items, loading, error} = useAppSelector(state => state.items)
    const options = Array.from(new Set(items.map(item => item.index)));

    const setSearch = (value: string | null) => {
        navigation("?_" + value)
        setSearchIndex(value)
    }

    return (
        <Autocomplete
            disablePortal
            options={options} // Access myIndex property from indexTemplate object
            fullWidth={true}
            value={searchIndex}
            sx={{my: 2}}
            onChange={(event, value) => setSearch(value)}
            renderInput={(params) => <TextField {...params} label="Index" />}
        />
    );
};

export default AutoCompleteArea;