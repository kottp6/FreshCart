import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider({children}){

const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
const {accessToken} = useContext(AuthContext);
const [cartDetails, setCartDetails] = useState(null);
const [cartId, setCartId] = useState(null);
const [numOfCartItems, setNumOfCartItems] = useState(0);
const [userId , setUserId] = useState(null);

useEffect(()=>{
    accessToken && getCart()
 },[accessToken])

const headers = {
    token : accessToken
}
    async function addToCart(productId)
    {
        try{
         const {data} = await axios.post(endpoint, {productId}, {headers});
         console.log(data);
         setNumOfCartItems(data.numOfCartItems);
         setCartDetails(data.data);
         setCartId(data.data._id);
         setUserId(data.data.cartOwner);
         return data;
        }
        catch(error){
            console.log(error);
            return error;
        }
    }  

    async function getCart()
    {
        try{
            const {data} = await axios.get(endpoint,{headers});
            console.log("cart",data);
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data);
            setCartId(data.data._id);
            setUserId(data.data.cartOwner);
            return data
            
        }catch(error)
        {
            return error;
        }
    }

    async function deleteProduct(productId)
    {
        try {
            const {data} = await axios.delete(`${endpoint}/${productId}`,{headers});
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data);
            setCartId(data.data._id);
            setUserId(data.data.cartOwner);
            return data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    async function deleteAllProducts()
    {
        try {
            const {data} = await axios.delete(endpoint,{headers});
            setNumOfCartItems(data.numOfCartItems);
            setCartDetails(data.data);
            setCartId(data.data._id);
            setUserId(data.data.cartOwner);
            return data;
        } catch (error) {
            return error
        }
    }
    async function updateItem(productId, count)
    { 
        try{  
        const {data} = await axios.put(`${endpoint}/${productId}`,{
            count : count
        },{headers});
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data.data);
        setCartId(data.data._id);
        setUserId(data.data.cartOwner);
        console.log(data);
        
        return data;
        }catch(error)
        {
            return error.response.data.message;
        }
    }

    async function getPaymentCash(url,shippingAddress)
    {
        try{
            const {data} = await axios.post(url,{shippingAddress},{headers});
            console.log(data);
            return data;
        }
        catch(error){
            return error.response.data.message;
        }
    }
    
    return <CartContext.Provider value={{addToCart, getCart, numOfCartItems,
         cartDetails,deleteProduct,deleteAllProducts,updateItem,getPaymentCash,
         cartId,userId

    }}>
        {children}
    </CartContext.Provider>
}