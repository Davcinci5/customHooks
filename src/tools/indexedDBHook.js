// Hook
import { useState } from 'react'; 
require("fake-indexeddb/auto");

export default function UseIndexedDB({name, keyPath}){
  let db = null;
  const [storedValue, setStoredValue] = useState([]);

  const setData = obj => {
    return new Promise((res, rej) => {
      const transaction = db.transaction(`${name}`, 'readwrite');
      const collection = transaction.objectStore(`${name}`); 
      collection.add(obj);
      transaction.onerror = e => rej(`Error! ${e.target.error}`); 
      transaction.oncomplete = () => {
        setStoredValue([obj]);
        res(storedValue)
      };
    })
  }
  
  const getData = key => {
    return new Promise((res) => {
      const transaction = db.transaction(`${name}`,'readonly');
      const collection = transaction.objectStore(`${name}`);
      const allData = [];
    
      const request = key ? collection.get(key) : collection.openCursor();
      request.onsuccess = e => {
        const storedData = e.target.result;
        if(key) {
          if(storedData) {setStoredValue([storedData]); res(storedValue);}
          else {setStoredValue(['not found']);res(storedValue);}
          
        }else{
          if(storedData){
            allData.push(storedData.value);
            storedData.continue();
          } else {
            setStoredValue(allData);
            res(storedValue)
          }
        }
      }
    })
  }

  // const setUp = () => {
    return new Promise((res,rej) => {
        
        const request = indexedDB.open('indexedDBHook');   

        request.onupgradeneeded = e => {
            db = e.target.result;
            db.createObjectStore(`${name}`, {keyPath});
        }

        request.onsuccess = e => {
            db = e.target.result;
            res([setData, getData, storedValue])
        }

        request.onerror = e => {
            rej(`error: ${e.target.error} was found `)
        } 
    })
  // }

  //return [setUp, setData, getData, storedValue];
}





  