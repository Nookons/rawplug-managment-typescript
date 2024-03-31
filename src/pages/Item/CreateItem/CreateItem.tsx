import React, {useEffect, useState} from 'react';
import {doc, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import MyButton from "../../../components/MyButton/MyButton";

interface IIndexData {
    indexArray: any[],
    loading: false;
    error: string | null;
}

const CreateItem = () => {
    const [indexData, setIndexData] = useState<IIndexData>({
        indexArray: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        (async () => {
            setIndexData((prevState) => ({...prevState, loading: true}))

            try {
                onSnapshot(doc(db, "departments", "PWT70"), (doc) => {
                    setIndexData((prevState) => ({...prevState, indexArray: doc.data().itemTemplate}));
                });
            } catch (e) {
                setIndexData((prevState) => ({...prevState, loading: false, error: e}))
            } finally {
                setTimeout(() => {
                    setIndexData((prevState) => ({...prevState, loading: false}))
                }, 250)
            }
        })();
    }, []);

    const addTestItem = async () => {
        try {
            const userData = {
                itemTemplate: [
                    {myIndex: 'test'}
                ]
            };
            await setDoc(doc(db, "departments", "MSP"), userData);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        console.log(indexData);
    }, [indexData]);

    return (
        <div>
            CreateItem...
            <MyButton click={addTestItem} >addTestItem</MyButton>
        </div>
    );
};

export default CreateItem;