import  { useEffect, useState, useContext } from 'react';
import classes from "./Profile.module.css";
import person from "../../assets/images/kottp.jpg"
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';


export default function Profile() {

    const{userId} = useContext(CartContext);
    const[error , setError] = useState(null);
    const[isLoading , setIsLoading] = useState(false);
    const[user, setUser] = useState([]);
    const[shipping, setShipping] = useState([]);
    
    
    console.log(userId);

    async function getMyOrders()
{
        setIsLoading(true)
        try{
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
            console.log(data[data.length-1].user);
            console.log(data[data.length-1].shippingAddress);
            
            setUser(data[data.length-1].user);
            setShipping(data[data.length-1].shippingAddress);
            // setError(null);
        }
        catch(error){
            console.log(error);
            setError(error.response.data.message);
            setOrders([]);       
        }finally{
            setIsLoading(false)
        }
}
useEffect(()=>{
    userId && getMyOrders()
},[userId])


return (
    <>
    <div className="mb-5 max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={person} alt='Woman looking front'/>
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
    </div>
    <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li class="flex flex-col items-center justify-around">
           
            <i class="fa-solid fa-location-dot"></i>
            <div>{shipping.details}</div>
        </li>
        <li class="flex flex-col items-center justify-between">
            <i class="fa-solid fa-location-dot"></i>
            <div>{shipping.city}</div>
        </li>
        <li class="flex flex-col items-center justify-around">
            <i class="fa-solid fa-phone"></i>
            <div>{shipping.phone}</div>
        </li>
    </ul>
    
    <div className="p-4 border-t mx-8 mt-2">
        <button className='btn btn-green w-full'>Edit Address</button>
    </div>
    </div>
    </>
)
}
