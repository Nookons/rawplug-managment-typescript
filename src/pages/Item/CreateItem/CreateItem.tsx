import React, {useState} from 'react';
import {SnackbarProvider, VariantType, useSnackbar} from 'notistack';

import {useAppSelector} from "../../../hooks/storeHooks";
import {
    Box,
    Button,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography
} from '@mui/material';
import {IItemTemplate} from "../../../types/Item";
import FirstStep from "./Steps/FirstStep";
import SecondaryStep from "./Steps/SecondaryStep";
import ThirdStep from "./Steps/ThirdStep";
import FinishStep from "./Steps/FinishStep";
import {db} from "../../../firebase";

import {collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where} from "firebase/firestore";
import dayjs from "dayjs";
import {IMachine} from "../../MachineScreen/MachineScreen";


const steps = [
    {
        label: 'Будь ласка, додайте новий індекс',
    },
    {
        label: 'Тип і кількість на палеті',
    },
    {
        label: 'Опис',
    },
    {
        label: 'Завершальний крок',
    },
];


const CreateItem = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {user, error, loading} = useAppSelector(state => state.user);

    const [activeStep, setActiveStep] = useState(0);

    const [data, setData] = useState<IItemTemplate>({
        index: "",
        type: "",
        palletQta: 0,
        jm: "",
        description: "",
        status: "",
    });

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };

    const [oldArray, setOldArray] = useState();

    const onAddNewItem = async () => {
        try {
            await setDoc(doc(db, "itemsTemplate", data.index.replace("/", "\\")), {
                createDate: dayjs().format("YYYY-MM-DD [at] HH:mm"),
                ...data
            });

            setActiveStep(0);
            handleClickVariant("success", "Item was added");
            setData({
                index: "",
                type: "",
                palletQta: 0,
                jm: "",
                description: "",
                status: "",
            });
        } catch (error) {
            handleClickVariant("error", error.toString());
        }
    };

    const handleNext = async (event) => {
        try {
            if (activeStep === 0 && !data.index.length && !data.type) {
                throw new Error("You're trying to add a new item with an empty index or type")
            }
            if (activeStep === 1 && !data.jm.length) {
                throw new Error("You're trying to add a new item with an empty jm.")
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
            handleClickVariant("error", error.toString())
        }
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <div style={{
            minHeight: "calc(100dvh - 160px)",
            margin: "0 auto",
            maxWidth: 1100,
            padding: 14
        }}>
            <Button sx={{my: 2}} variant={"contained"} fullWidth={true}>View all templates</Button>
            <Box>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                <p>{step.label}</p>
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>

                                {
                                    index === 0 && <FirstStep data={data} setData={setData}/>
                                }
                                {
                                    index === 1 && <SecondaryStep data={data} setData={setData}/>
                                }
                                {
                                    index === 2 && <ThirdStep data={data} setData={setData}/>
                                }
                                {
                                    index === steps.length - 1 && <FinishStep data={data} setData={setData}/>
                                }

                                <Box sx={{mb: 2}}>
                                    <div>
                                        {index === steps.length - 1
                                            ?
                                            <Button
                                                variant="contained"
                                                onClick={(event) => onAddNewItem(event)}
                                                sx={{mt: 1, mr: 1}}
                                            >
                                                Зберегти
                                            </Button>
                                            :
                                            <Button
                                                variant="contained"
                                                onClick={(event) => handleNext(event)}
                                                sx={{mt: 1, mr: 1}}
                                            >
                                                Продовжити
                                            </Button>
                                        }

                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{mt: 1, mr: 1}}
                                        >
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
    );
};

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={5000}
            maxSnack={3}>
            <CreateItem/>
        </SnackbarProvider>
    );
}
