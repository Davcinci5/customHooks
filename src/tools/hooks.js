// Hook
import { useState } from 'react'; 

export function UseLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
  
    });
  
    const setValue = value => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
  
    };
  
    return [storedValue, setValue];
  
  };

 export function useSessionStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.sessionStorage.getItem(key);
       return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
  
    });
  
    const setValue = value => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
          console.error(error);
      }
    };
  
    return [storedValue, setValue];
  
  }; 

  // Hook
// import { useState } from 'react'; 
// if(!window.indexedDB) require("fake-indexeddb/auto");

// export function useIndexedDB({name, keyPath}) {

//     const [storedValue, setStoredValue] = useState([]);
      
//       let db = null;
      
//       const request = indexedDB.open('indexedDBHook');   

//       request.onupgradeneeded = e => {
//         db = e.target.result;
//         db.createObjectStore(`${name}`, {keyPath});
//       }

//       request.onsuccess = e => {
//         db = e.target.result;

//       }

//       request.onerror = e => {
//         alert(`error: ${e.target.error} was found `)
//       } 

//       const setData = obj => {
//         const transaction = db.transaction(`${name}`, 'readwrite');
//         const collection = transaction.objectStore(`${name}`); 
//         collection.add(obj);
//         transaction.onerror = e => alert(`Error! ${e.target.error}`); 
//         transaction.oncomplete = () => setStoredValue([obj]);
//       }

//       const getData = key => {
//         const transaction = db.transaction(`${name}`,'readonly');
//         const collection = transaction.objectStore(`${name}`);
//         const allData = [];

//         const request = key ? collection.get(key) : collection.openCursor();
//         request.onsuccess = e => {
//           const storedData = e.target.result;
//           if(key) {
//             if(storedData) setStoredValue([storedData]);
//             else setStoredValue(['not found'])
//           }else{
//             if(storedData){
//               allData.push(storedData.value);
//               storedData.continue();
//             } else {
//               setStoredValue(allData);
//             }
//           }
//         }
//       }
      
//     return [setData, getData, storedValue]
//   }