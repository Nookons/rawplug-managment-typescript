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

import {doc, getDoc, updateDoc} from "firebase/firestore";
import dayjs from "dayjs";



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
    const {user, error, loading} = useAppSelector(state => state.user)
    const [activeStep, setActiveStep] = React.useState(0);

    const [data, setData] = useState<IItemTemplate>({
        myIndex: "",
        type: "",
        palletQta: 0,
        jm: "",
        description: "",
        status: "",
    });

    const handleClickVariant = (variant: VariantType, title: string) => {
        enqueueSnackbar(title, {variant});
    };

    const onAddNewItem = async () => {
        const docRef = doc(db, "PWT70", "templates");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const oldArray = docSnap.data().templates

            await updateDoc(doc(db, "PWT70", "templates"), {
                lastUpdate: dayjs().format("YYYY-MM-DD [at] HH:mm"),
                person: user.email,
                personUid: user.uid,
                templates: [
                    ...oldArray,
                    data
                ]
            });
        } else {
            throw new Error("Document not exists");
        }
    };

    const handleNext = async (event) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (event.target.innerText === "ЗБЕРЕГТИ") {
            try {
                await onAddNewItem();
                setActiveStep(0);
                handleClickVariant("success", "Item was added");
            } catch (error) {
                setActiveStep(0);
                handleClickVariant("error", error.toString());
            }
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
                                        <Button
                                            variant="contained"
                                            onClick={(event) => handleNext(event)}
                                            sx={{mt: 1, mr: 1}}
                                        >
                                            {index === steps.length - 1 ? 'Зберегти' : 'Продовжити'}
                                        </Button>
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
