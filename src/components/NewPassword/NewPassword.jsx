import  { useEffect, useState } from 'react';
import classes from "./NewPassword.module.css";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function NewPassword() {

    const[error , setError] = useState(null);
    const[isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        email : "",
        newPassword : "",
    }
    const validationSchema = Yup.object({
        email : Yup.string().email("Email is InVaild").required("Email is Required"),
        newPassword : Yup.string().matches(/^[A-Z][a-z0-9_]{2,8}$/i,"Password Must be Strong").required("Password is Required"),
    })
    let formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit :handleResetEmail,
        
    })
    async function handleResetEmail(formValues){
        setIsLoading(true);
        console.log("submit", formValues);
        try {
            const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",formValues)
            console.log(data);
            setIsLoading(false)
            navigate('/')

        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
            
        }finally{
            setIsLoading(false)
        }
       
        
    }
return (
    <>
        <div className="max-w-xl mx-auto mt-5">
    <h1 className="text-4xl font-bold mb-8">New Password</h1>
    </div>
    {error && <div className=" max-w-xl mx-auto alert alert-error">
        {error} 
    </div>}
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-5">
        <label htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Email</label>
        <input 
            type="text"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="ex: mo@gmail.com" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
             />
             {formik.errors.email && formik.touched.email && (
                <div className='alert alert-error'>
                    {formik.errors.email}
                </div>
             )}
        </div>
        <div className="mb-5">
        <label htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Password</label>
        <input 
            type="password"
            id="newPassword"
            name="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="*********" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
             />
             {formik.errors.newPassword && formik.touched.newPassword && (
                <div className='alert alert-error'>
                    {formik.errors.newPassword}
                </div>
             )}
        </div>
        
        <button 
        disabled={!(formik.isValid && formik.dirty)}
        type='submit' 
        className="btn btn-green">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i>: "Reset Password"}
        </button>
    </form>
    </>
)
}
