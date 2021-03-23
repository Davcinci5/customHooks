import React, {useState, useEffect} from 'react';
import  UseIndexedDB  from '../tools/indexedDBHook'

export default function IndexedDB({name, keyPath}){
     let [setUp, setData, getData, data] = UseIndexedDB({name, keyPath});
   
     const [storeObj, setStoreObj] = useState("");
    const [storeKey, setStoreKey] = useState("");


    useEffect(()=>{
        const callIndexedDB = async () => {
             await setUp();
             return;
        } 
        callIndexedDB();
    },[setUp])

    const handleStore = (e) => {
        if(storeObj.length<1) return;
        setData(JSON.parse(storeObj));
        setStoreObj("");
    }

    const handleRetrieve = () => {
        storeKey ==="" ?getData() : getData(JSON.parse(storeKey))
    } 
    return (
    <>
    <label htmlFor="val">insert Object to Store: </label>
    <input type='text' name='val' placeholder="object..." value={storeObj} onChange={e => setStoreObj(e.target.value)}/>
    <button onClick={handleStore}>Save</button>
    <br/>
    <label htmlFor="keyval">find by Key: </label>
    <input type='text' name='keyval' value={storeKey} onChange={e => setStoreKey(e.target.value)}/>
    <button onClick={handleRetrieve}>Find</button>
    <br/>
    <p>result</p>
    <ul>
        {data && data.map(val =><li role="listitem" key={val.id}>{JSON.stringify(val)}</li>)}
    </ul>
    </>)
}
