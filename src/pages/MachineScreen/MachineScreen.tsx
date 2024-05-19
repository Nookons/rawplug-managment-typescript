import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Slider,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import AddPlan from "./AddPlan/AddPlan";
import {db} from "../../firebase";
import {doc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import {Add, Delete} from "@mui/icons-material";
import dayjs from "dayjs";
import {useAppSelector} from "../../hooks/storeHooks";
import {styled} from '@mui/material/styles';
import {IOSSlider, IOSSliderMachine} from "../../components/SliderStyle";
import {IPalletItem, IUserPallet} from "../../types/Pallet";
import LastPallets from "./LastPallets/LastPallets";
import RemoveIcon from '@mui/icons-material/Remove';
import BatchItem from "./BatchItem/BatchItem";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import palletsByIdPdf from "../../utils/PDF/PalletsById";

export interface IMachine {
    createDate: string;
    id: number;
    index: string;
    machine: string;
    quantity: number;
    currentQta: number;
    finish: string;
}


const MachineScreen = () => {
    const {user, loading, error} = useAppSelector(state => state.user)
    const [machine, setMachine] = useState("nap01");

    const [template, setTemplate] = useState<IPalletItem | null>(null);

    const [addValue, setAddValue] = useState<number>(0);

    const [isSending, setIsSending] = useState<boolean>(false);

    const [batchItems, setBatchItems] = useState([]);

    const [batchCount, setBatchCount] = useState(0);

    const [plan, setPlan] = useState<IMachine>({
        createDate: '',
        id: 0,
        index: '',
        machine: '',
        quantity: 0,
        currentQta: 0,
        finish: '',
    })

    useEffect(() => {
        if (plan.currentQta >= plan.quantity) {
            const itemRef = doc(db, machine, "current");

            updateDoc(itemRef, {
                finish: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
            });
        }
    }, [plan.quantity, plan.currentQta]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, machine, "current"), (doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            if (doc.exists()) {
                setPlan(doc.data())
            }
        });
    }, [machine]);

    useEffect(() => {
        const path = plan.index.replace("/", "\\")

        if (path) {
            const unsubs = onSnapshot(doc(db, "palletsTemplate", path), (doc) => {
                const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                if (doc.exists()) {
                    setTemplate(doc.data() as IPalletItem)
                }
            });
        }
    }, [plan.index]);

    const onAddPallet = async (value: number) => {
        if (user) {
            try {
                if (addValue <= 0) {
                    throw new Error("Empty pallet")
                }
                setIsSending(true)
                setBatchItems([])
                setBatchCount(0)
                const id = Date.now()
                const itemRef = doc(db, machine, "current");
                const readyRef = doc(db, "readyPallets", plan.index.replace("/", "\\") + "_" + id);

                const palletTemplate = {
                    id: id,
                    planId: plan.id,
                    machine: machine,
                    createDate: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm"),
                    index: plan.index,
                    quantity: (addValue * template?.atBox),
                    barrelItems: [...batchItems],
                    boxes: addValue
                }

                await setDoc(readyRef, {
                    ...palletTemplate
                });

                await updateDoc(itemRef, {
                    lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
                    changePerson: user.email,
                    currentQta: plan.currentQta + (addValue * template?.atBox)
                });
            } catch (error) {
                alert(error.toString())
            } finally {
                setTimeout(() => {
                    setIsSending(false)
                }, 250)
            }
        }
    }

    const remain = plan.quantity - plan.currentQta
    const remainBoxes = remain / template?.atBox
    const remainPallets = remainBoxes / template?.palletQta

    useEffect(() => {
        if (template) {
            if (remainBoxes < template?.palletQta) {
                setAddValue(remainBoxes)
            } else {
                setAddValue(template?.palletQta)
            }
        }
    }, [remainBoxes]);


    return (
        <Container sx={{p: 2, minHeight: 'calc(100dvh - 162px)'}} maxWidth="xl">

            <Backdrop sx={{zIndex: 99}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <AddPlan machine={machine} setMachine={setMachine}/>

            <TextField
                id="outlined-select-currency"
                select
                sx={{mt: 2}}
                value={machine}
                onChange={(event) => setMachine(event.target.value)}
                fullWidth={true}
                label="Machine"
                helperText="Please select your machine"
            >
                <MenuItem value="nap01"><p>NAP-01</p></MenuItem>
                <MenuItem value="nap02"><p>NAP-02</p></MenuItem>
                <MenuItem value="nap03"><p>NAP-03</p></MenuItem>
            </TextField>

            <hr/>

            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Paper sx={{p: 4, mb: 2, backgroundColor: plan.currentQta >= plan.quantity && "#89ff89"}}>
                        <Typography variant="h5" gutterBottom component="h5">
                            {plan.index}
                        </Typography>
                        <p>{template?.description}</p>
                        <hr/>
                        <p>
                            Boxes: {remainBoxes} <br/>
                            Pallets: {remainPallets.toFixed(2)}
                        </p>

                        <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                            <IOSSliderMachine
                                value={plan.currentQta}
                                max={plan.quantity}
                                aria-label="ios slider"
                                valueLabelDisplay="on"
                            />
                            <p>{remain.toLocaleString()}</p>
                        </Stack>
                        {plan.finish && <p>Start by: {plan.createDate}</p>}
                        {plan.finish && <p>Finished by: {plan.finish}</p>}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <h5>Add pallet</h5>
                        <p>Тут ви можете додати нову палету до системи, просто оберіть кількість нижче і натисніть
                            плюс</p>
                        <Stack
                            my={1}
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem/>}
                            spacing={2}
                        >
                            {template &&
                                <IOSSlider
                                    value={addValue}
                                    onChange={(event) => setAddValue(Number(event.target.value))}
                                    max={remainBoxes < template?.palletQta ? remainBoxes : template?.palletQta}
                                    step={1}
                                    aria-label="ios slider"
                                    valueLabelDisplay="on"
                                />
                            }
                            <IconButton onClick={() => onAddPallet(addValue.quantity)} aria-label="add">
                                <Add/>
                            </IconButton>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <p>
                            Тут ви можете додати унікальний номер бочки, щоб отримати більше статистики в майбутньому
                        </p>

                        <ButtonGroup
                            variant="outlined"
                            sx={{mt: 2}}
                            aria-label="outlined primary button group"
                        >
                            <Button onClick={() => setBatchCount((prev) => prev + 1)}>
                                <Add/>
                            </Button>
                            <Button onClick={() => setBatchCount((prev) => prev - 1)}>
                                <RemoveIcon/>
                            </Button>
                        </ButtonGroup>
                        {Array.from({length: batchCount}).map((_, index) => {
                            let addedCount = 0;

                            batchItems.forEach(item => {
                                addedCount += item.boxes;
                            });

                            const remain = addValue - addedCount;

                            return (
                                <BatchItem addValue={addValue} remain={remain} key={index}
                                           setBatchItems={setBatchItems}/>
                            );
                        })}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{p: 2, mb: 2}}>
                        <Typography variant="h5" gutterBottom component="h5">
                            Pallets
                        </Typography>
                        <p>
                            Нижче ви знайдете всі палети за номером квитанції {plan.id}
                        </p>
                    </Paper>

                    <LastPallets id={plan.id}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper sx={{p: 2, mb: 2}}>
                        <Typography variant="h5" gutterBottom component="h5">
                            Need Items
                        </Typography>
                        <p>
                            Нижче ви знайдете все, що потрібно для виконання цього плану
                        </p>
                    </Paper>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {template?.needItem?.map((el, index) => {
                                    const need = el?.quantity * remain

                                    return (
                                        <TableRow>
                                            <TableCell><p>{el.index}</p></TableCell>
                                            <TableCell><p>{el.type}</p></TableCell>
                                            <TableCell><p>{need.toLocaleString()}</p></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MachineScreen;