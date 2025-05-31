import  { useEffect, useState } from 'react';
import classes from "./ForgetPassword.module.css";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function ForgetPassword() {

    const[error , setError] = useState(null);
    const[isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        email : "",
    }
    const validationSchema = Yup.object({
        email : Yup.string().email("Email is InVaild").required("Email is Required"),
    })
    let formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit :handleForgetPassword,
        
    })
    async function handleForgetPassword(formValues){
        setIsLoading(true);
        console.log("submit", formValues);
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",formValues)
            console.log(data);
            setIsLoading(false)
            navigate('/resetCode')

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
    <h1 className="text-4xl font-bold mb-8">Forget Password</h1>
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
