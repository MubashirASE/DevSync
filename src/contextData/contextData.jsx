import { createContext} from 'react';
import { useState, useEffect } from 'react';

export const MyContext = createContext();


export const MyProvider = ({ children }) => {
     const [globalData, setGlobalData] = useState();
     const fetchData=()=>{
      const storedData = JSON.parse(localStorage.getItem('user'))
    setGlobalData(storedData); 
     }
     useEffect(() => {
       fetchData()
     },[])


     return (
       <MyContext.Provider value={{globalData, fetchData}}>
         {children}
       </MyContext.Provider>
     );
   };

