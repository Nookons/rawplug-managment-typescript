import React, { FC, useState } from 'react';
import { Autocomplete, Button, Grid, Paper, Stack, TextField } from "@mui/material";
import { IItemTemplate } from "../../../types/Item";

interface NeedItemProps {
    itemsTemplate: IItemTemplate[];
    setNeedItemsCount: () => void;
    setNeedItem: (items: any[]) => void; // Adjust the type as needed
}

const NeedItem: FC<NeedItemProps> = ({ itemsTemplate, setNeedItem, setNeedItemsCount }) => {
    const [isSave, setIsSave] = useState(false);

    const [data, setData] = useState({
        index: "",
        quantity: 0
    });

    const handleAutocompleteChange = (event, newValue) => {
        setData(prev => ({
            ...prev,
            index: newValue || ""
        }));
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setData(prev => ({
            ...prev,
            quantity: Number(value)
        }));
    };

    const onSave = () => {
        try {
            setIsSave(true)
            setNeedItemsCount(prev => prev + 1)
            setNeedItem(prev => [...prev, data]);
        } catch (error) {
            console.log(error);
        }
    };

    if (!isSave) {
        return (
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Stack my={1} spacing={2}>
                        <Autocomplete
                            disablePortal
                            options={itemsTemplate.map(el => el.index)}
                            fullWidth
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => <TextField {...params} label="Cartridge" />}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Quantity"
                            variant="outlined"
                            type="Number"
                            value={data.quantity}
                            onChange={handleQuantityChange}
                        />
                        <Button onClick={onSave} variant="contained" sx={{ my: 2 }}>
                            Save
                        </Button>
                    </Stack>
                </Paper>
            </Grid>
        );
    }
};

export default NeedItem;
