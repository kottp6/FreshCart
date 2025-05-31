import  { useEffect, useState, useContext } from 'react';
import classes from "./Checkout.module.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

export default function Checkout() {

    const navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(false)
    const{getPaymentCash,cartId} = useContext(CartContext);

    const initialValues = {
        details : "",
        phone : "",
        city : ""
    }
    const validationSchema = Yup.object({
        details :Yup.string().required("Name is Required"),
        city : Yup.string().required("City is Required"),
        phone : Yup.string().matches(/^(002)?01[0125][0-9]{8}$/i,"Phone Number Must Contain 11 No").required("Phone is Required"),
    })

    let formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit :handleCheckout,
        
    })

    async function handleCheckout(formValues){
        
        console.log("submit", formValues);
        const url = isOnline ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`:
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
        const response = await getPaymentCash(url,formValues);
        if(response.status === "success"){
            console.log('data',response);
            if(isOnline){
                window.location.href= response.session.url;
            }else{
                toast.success("Payment done successfully");
                setTimeout(()=>{
                    navigate('/allorders')
                },3000)
            }
            
        }else{
            //
        }
    }
return (
    <>  
    <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
    </div>
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
    <div className="mb-5">
        <label htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Details</label>
        <input 
            type="text"
            id="details"
            name="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="ex: 01288845234" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            
             />
             {formik.errors.details && formik.touched.details && (
                <div className='alert alert-error'>
                    {formik.errors.details}
                </div>
             )}
             
        </div>
        <div className="mb-5">
        <label htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your City</label>
        <input 
            type="text"
            id="city"
            name="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="ex: 01288845234" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
             />
             {formik.errors.city && formik.touched.city && (
                <div className='alert alert-error'>
                    {formik.errors.city}
                </div>
             )}
             
        </div>
        <div className="mb-5">
        <label htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Phone</label>
        <input 
            type="text"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="ex: 01288845234" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
             />
             {formik.errors.phone && formik.touched.phone && (
                <div className='alert alert-error'>
                    {formik.errors.phone}
                </div>
             )}
           
        </div>
        <div className='my-4'>
        <input type="checkbox" className='mx-1 rounded' name="" id="isOnline" onChange={()=>setIsOnline(!isOnline)} />
        <label htmlFor="isOnline">Is Pay Online</label>
        </div>
        
        <button 
        
        type='submit' 
        className="btn btn-green w-full">
            {isOnline ? 'Pay Online' : 'Pay Cash'}
            
        </button>
        
    </form>
</>
)
}
