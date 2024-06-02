import React, {FC, useEffect, useState} from 'react';
import styles from './Item.module.css';
import {doc, getDoc} from "firebase/firestore";
import {VariantType} from "notistack";
import {ICurrentItem} from "./Item";
import {
    Avatar, Badge, Box, Divider,
    Paper, Slider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import {
    ArrowCircleRight as ArrowCircleRightIcon,
    AccessTimeFilled as AccessTimeFilledIcon,
    AddCircle as AddCircleIcon,
    OilBarrel as OilBarrelIcon,
    AccountCircle as AccountCircleIcon,
    BlurCircular as BlurCircularIcon,
    SystemUpdateAlt as SystemUpdateAltIcon,
    Bookmark as BookmarkIcon,
    Tag as TagIcon,
    QrCode as QrCodeIcon
} from '@mui/icons-material';
import Barcode from "react-barcode";
import {getMovement} from "../../utils/GetMovement";
import {db} from "../../firebase";
import {IOSSliderMachine} from "../../components/SliderStyle";
import DiamondIcon from "@mui/icons-material/Diamond";

const getSmileType = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
        case "barrel":
            return '🛢️';
        case "carton":
            return '📦';
        case "cartridge":
            return '🍾';
        case "chemical":
            return '🚰';
        default:
            return '';
    }
};

interface SettingsItemProps {
    currentItem: ICurrentItem;
    handleClickVariant: (variant: VariantType, title: string) => void;
}

const SettingsItem: FC<SettingsItemProps> = ({currentItem, handleClickVariant}) => {
    const [user, setUser] = useState<any>(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (currentItem.item) {
                    const docRef = doc(db, "users", currentItem?.item.userUid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                    }
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchUser();
    }, [currentItem]);


    if (!currentItem.item?.quantity) {
        return null;
    }


    const renderTableRow = (icon: React.ReactNode, content: React.ReactNode, key?: string | number) => (
        <TableRow key={key}>
            <TableCell>{icon}</TableCell>
            <TableCell>{content}</TableCell>
        </TableRow>
    );

    return (
        <div className={styles.Settings}>

            <Stack
                my={1}
                direction="row"
                sx={{backgroundColor: "white", p: 2}}
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                <Avatar
                    sx={{width: 98, height: 98}}
                    variant={"rounded"}
                    src={user?.photoUrl}>
                    {user?.email.slice(0,1)}
                </Avatar>
                <Box sx={{width: "100%"}}>
                    <article>
                        {currentItem.item.Created}
                    </article>
                    <hr/>
                    <Stack spacing={2} direction="row" sx={{mt: 2}} alignItems="center">
                        <Badge sx={{zIndex: 0}} badgeContent={<p style={{color: "white"}}>{user?.level}</p>} color="primary">
                            <DiamondIcon/>
                        </Badge>
                        {user &&
                            <IOSSliderMachine
                                max={user?.nextLevel}
                                disabled={true}
                                aria-label="Volume"
                                value={user?.experience}
                            />
                        }
                    </Stack>
                </Box>
            </Stack>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h3">{getSmileType(currentItem.item?.type)}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h5">{currentItem.item?.index}</Typography>
                                <Typography variant="body2"
                                            color="textSecondary">{currentItem.item?.description}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItem.item?.remarks && renderTableRow(<BookmarkIcon/>, <Typography
                            component="article">{currentItem.item?.remarks}</Typography>)}
                        {currentItem.item?.batchNumber && renderTableRow(
                            <TagIcon/>,
                            <Typography component="article" style={{letterSpacing: "2.5px"}}>
                                {currentItem.item.batchNumber} <Barcode fontSize={0} height={30}
                                                                        value={currentItem.item.batchNumber}/>
                            </Typography>
                        )}
                        {renderTableRow(<AddCircleIcon/>,
                            <Typography>{currentItem.item.quantity.toLocaleString()} {currentItem.item.jm}</Typography>)}
                        {renderTableRow(<BlurCircularIcon/>, <Typography>{currentItem.item.status}</Typography>)}
                        {renderTableRow(
                            <AccessTimeFilledIcon/>,
                            <Typography>
                                {currentItem.item.createdDate}
                                {currentItem.item.lastChange && (
                                    <Typography variant="body2" color="textSecondary">
                                        Changed: {currentItem.item.lastChange} by {currentItem.item.changePerson}
                                    </Typography>
                                )}
                            </Typography>
                        )}
                        {renderTableRow(<ArrowCircleRightIcon/>,
                            <Typography>{getMovement(currentItem.item.fromDepartment)}</Typography>)}
                        {renderTableRow(<SystemUpdateAltIcon/>,
                            <Typography>{getMovement(currentItem.item.toDepartment)}</Typography>)}
                        {currentItem.item?.batchNumber && renderTableRow(
                            <OilBarrelIcon/>,
                            <div style={{display: "grid", gap: 1, gridTemplateColumns: "1fr 1fr"}}>
                                <Typography>1️⃣ {currentItem.item.barrel?.first} {currentItem.item.jm}</Typography>
                                <Typography>2️⃣ {currentItem.item.barrel?.secondary} {currentItem.item.jm}</Typography>
                                <Typography>3️⃣ {currentItem.item.barrel?.third} {currentItem.item.jm}</Typography>
                                <Typography>4️⃣ {currentItem.item.barrel?.four} {currentItem.item.jm}</Typography>
                            </div>
                        )}
                        {renderTableRow(<QrCodeIcon/>, <Barcode fontSize={14} width={1.15} height={30}
                                                                value={currentItem.item?.PalletReceipt}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SettingsItem;
