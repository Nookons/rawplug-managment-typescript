import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import palletData from '../../assets/PalletsData.json';

const getSlotByIndex = (index: string) => {
    switch (index) {
        case "KRP-ST-CART-310-B":
            return doc(db, "slots", "slot_06");
        case "R-NOZ-M〵Z":
            return ["slot_09?R-NOZ-M〵Z", "slot_10?R-NOZ-M〵Z"];
        case "R-NOZ-14-M":
            return ["slot_09?R-NOZ-14-M", "slot_10?R-NOZ-14-M"];
        case "R-NOZ-14-M〵Z":
            return ["slot_09?R-NOZ-14-M〵Z", "slot_10?R-NOZ-14-M〵Z"];
        case "OZ-U-255-164-295":
            return doc(db, "slots", "slot_02");
        case "KRP-ST-PISTON":
            return doc(db, "slots", "slot_03");
        case "KRP-ST-PISTON-B":
            return doc(db, "slots", "slot_05");
        case "KRP-ST-CAP-WHI":
            return doc(db, "slots", "slot_04");
        default:
            return null;
    }
};

export const slotsUpdate = async (value: number, index: string) => {

    try {
        for (const el of palletData) {
            if (index === el.index && el.needItem) {

                for (const item of el.needItem) {
                    const getSlot = await getSlotByIndex(item.index);
                    const multiplier = item.quantity
                    const indexNeed = item.index

                    if (getSlot) {
                        if (Array.isArray(getSlot)) {
                            let isSend = false;

                            for (const slot of getSlot) {
                                const slotSplit = slot.split("?")[0]
                                const indexSplit = slot.split("?")[1]

                                const slotStatus = doc(db, "slots", slotSplit);
                                const docSnap = await getDoc(slotStatus);

                                if (docSnap.exists()) {
                                    const palletInd = docSnap.data().palletIndex;

                                    if (!isSend && palletInd === indexSplit) {
                                        isSend = true;
                                        const sendSlot = doc(db, "slots",slotSplit);
                                        await updateSlot(sendSlot, value, indexSplit, multiplier);
                                    }
                                }
                            }
                        } else {
                            await updateSlot(getSlot, value, item.index, multiplier);
                        }
                    }
                }
            }
        }
        return "Slots updated successfully";
    } catch (error) {
        throw error; // Propagate error to the caller
    }
};

async function updateSlot(slotRef: any, value: number, itemIndex: string, multiplier: number) {
    const slotSnap = await getDoc(slotRef);

    if (slotSnap.exists()) {

        const itemID = slotSnap.data().palletID;
        const itemValueRef = doc(db, "items", "item_" + itemID);
        const oldItemValue = await getDoc(itemValueRef);

        if (oldItemValue.data().index === itemIndex) {
            const isCan = oldItemValue.data().quantity - (value * multiplier);

            if (isCan < 0) {
                await updateDoc(slotRef, { minus: isCan }); // Update slot with minus value
            }

            await updateDoc(itemValueRef, { quantity: isCan }); // Update item quantity
        } else {
            console.log("Incorrect item index");
        }
    }
}
