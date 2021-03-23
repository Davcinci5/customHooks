import React, { useState } from 'react';

export default function LocalSessionTester({hook,keyVal,value}){
    const [val, setVal] = useState("");
    const [valLS,setNewVal] = hook(keyVal,value);
    
    return (
    <>
    <label htmlFor="val">Change Value: </label>
    <input type='text' name='val' value={val} onChange={e => setVal(e.target.value)}/>
    <button onClick={e=>setNewVal(val)}> Save</button>
    <br/>
    <p>Stored value {valLS}</p>
    </>)
}