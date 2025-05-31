import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


export const WichlistContext = createContext();

export default function WichlistContextProvider({children})
{
   
    const endpoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
    const {accessToken} = useContext(AuthContext);
    const [wishListData, setWishListData]= useState([]);

    const headers = {
        token : accessToken
    }
    
    useEffect(()=>{
        accessToken && getWichList()
     },[accessToken])

    async function addToWichlist(productId)
    {
        try{
            const {data} = await axios.post(endpoint, {productId}, {headers});
            console.log(data);
            setWishListData(data.data)
            return data;
           }
           catch(error){
               console.log(error);
               return error;
           }
    }

    async function getWichList()
    {
        try{
            const {data} = await axios.get(endpoint,{headers});
            console.log("wichList",data.data);
            setWishListData(data.data)
            return data
            
        }catch(error)
        {
            return error;
        }
    }

    async function deleteItem(productId)
    {
        try {
            const {data} = await axios.delete(`${endpoint}/${productId}`,{headers});
            setWishListData(data.data);
            return data;
            
        } catch (error) {
            return error.response.data.message;
        }
    }

    return <WichlistContext.Provider value={{addToWichlist,getWichList,deleteItem,wishListData}}>
        {children}
    </WichlistContext.Provider>
}

