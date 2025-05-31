import  { useContext, useEffect, useState } from 'react';
import classes from "./MyOrders.module.css";
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';


export default function MyOrders() {

const{userId,numOfCartItems,cartDetails} = useContext(CartContext);
const[error , setError] = useState(null);
const[isLoading , setIsLoading] = useState(false);
const[orders, setOrders] = useState([]);
const[totalOrder, setTotalOrder] = useState(0);

const [shipping, setShipping] = useState({})

console.log(userId);

async function getMyOrders()
{
        setIsLoading(true)
        try{
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
            console.log(data);
           // console.log(data[1].totalOrderPrice);
            // setTotalOrder(data[data.length-1].totalOrderPrice);
            setOrders(data);
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
        <div className="container">
            {
                isLoading ? <Loader></Loader>
                : error ? <div className="alert alert-error">
                {error}
            </div> :
            <table className="table">
                <thead>
                        <tr >
                            <th>Index</th>
                            <th>Order ID</th>
                            <th>Order Price</th>
                            <th>Paid</th>
                            <th>Deliverd</th>
                            <th>Payment Method</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Data Details</th>
                        </tr>
                </thead>
                {orders.map((order,ind)=> (
                    // <Link key={order.id}>
                    //     <div  className="m-4 v-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    //         <div className='flex px-4 bg-green-500 text-white p-4 rounded'>
                    //             <h3 className=' mr-10 text-white rounded'>order Id : {order.id}</h3>
                    //             <h3>{order.createdAt.slice(0,10)}</h3>
                    //         </div>
                    //         <div className="p-5">
                    //             <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order Price : {order.totalOrderPrice}</h4>
                    //             <h4>Payment Method : {order.paymentMethodType}</h4>
                    //             <div className='flex'>
                    //                 <h3 className='bg-red-500 w-20 mt-1  mb-5  rounded text-white p-2 mr-2'>{order.isPaid ? "Paid" : "Not Paid"}</h3>
                    //                 <h3 className='bg-blue-500 w-30 mt-1 mb-5 rounded text-white p-2'>{order.isDeliverd ? "Deliverd" : "Not Deliverd"}</h3>
                    //             </div>
                    //             <Link className='btn btn-green m-10 w-100'>Order Details</Link>
                    //         </div>
                    //     </div>
                    //  </Link>

                    <tr>
                        <td>{ind}</td>
                        <td>{order._id}</td>
                        <td>{order.totalOrderPrice} EGP</td>
                        <td>{order.isPaid}</td>
                        <td>{order.isDelivered}</td>
                        <td>{order.paymentMethodType}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        
                    </tr>

                ))}
            // </table>
            }
            
        </div>
    
    </>
)
}
