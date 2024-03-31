import React, {useEffect, useState} from 'react';
import {Modal, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableRow, TextField} from "@mui/material";
import MyButton from "../../../../components/MyButton/MyButton";
import {doc, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../../../../firebase";
import {useAppSelector} from "../../../../hooks/storeHooks";

const UserSettingsInput = () => {
    const {user, loading, error} = useAppSelector(state => state.user)
    const [loadData, setLoadData] = useState<any | null>(null);

    const [userDataModal, setUserDataModal] = useState(false);
    const [backDrop, setBackDrop] = useState(false);

    const [inputData, setInputData] = useState({
        displayName: "",
        firstName: "",
        lastName: "",
    });

    const addTest = async () => {
        try {
            const userData = {
                ...loadData,
                displayName: inputData.displayName && inputData.displayName,
                firstName: inputData.firstName && inputData.firstName,
                lastName: inputData.lastName && inputData.lastName
            };
            await setDoc(doc(db, "users", user.uid), userData);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
            setLoadData(doc.data());
        });
    }, []);

    const onDataChange = (type: string, value: string) => {
        setInputData((prevState) => ({...prevState, [type]: value}))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Email:</TableCell>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nickname:</TableCell>
                            <TableCell>{loadData?.displayName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{loadData?.lastName} {loadData?.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Work number</TableCell>
                            <TableCell>{loadData?.workPhone.slice(0, 10)} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell>{loadData?.position} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Set up with</TableCell>
                            <TableCell>{loadData?.startWork}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Level ({loadData?.level})</TableCell>
                            <TableCell>
                                <Slider defaultValue={0} max={10000} value={loadData?.experience} aria-label="Slider"/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={userDataModal}
                onClose={() => setUserDataModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    top: "50%",
                    left: "50%",
                    transform: 'translate(-50%, -50%)',
                    padding: 14,
                    backgroundColor: "white",
                    borderRadius: 4
                }}>
                    <TextField id="outlined-basic" onChange={(event) => onDataChange("displayName", event.target.value)} label={<article>NickName</article>} placeholder={loadData?.displayName} variant="outlined"/>
                    <TextField id="outlined-basic" onChange={(event) => onDataChange("firstName", event.target.value)} label={<article>First Name</article>} placeholder={loadData?.firstName} variant="outlined"/>
                    <TextField id="outlined-basic" onChange={(event) => onDataChange("lastName", event.target.value)} label={<article>Last Name</article>} placeholder={loadData?.lastName} variant="outlined"/>
                    <MyButton click={addTest}>Save</MyButton>
                </div>
            </Modal>
            <MyButton click={() => setUserDataModal(true)}>Change</MyButton>
        </>
    );
};

export default UserSettingsInput;