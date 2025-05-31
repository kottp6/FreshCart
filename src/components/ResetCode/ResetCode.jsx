import  { useEffect, useState } from 'react';
import classes from "./ResetCode.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetCode() {
    const[error , setError] = useState(null);
    const[isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        resetCode : "",
    }
    const validationSchema = Yup.object({
        resetCode : Yup.string().required("Reset Code is Required"),
    })
    let formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit :handleResetCode,
        
    })
    async function handleResetCode(formValues){
        setIsLoading(true);
        console.log("submit", formValues);
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",formValues)
            console.log(data);
            setIsLoading(false)
            navigate('/newPassword')

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
    <h1 className="text-4xl font-bold mb-8">Verify Reset Code</h1>
    </div>
    {error && <div className=" max-w-xl mx-auto alert alert-error">
        {error} 
    </div>}
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-5">
        <label htmlFor="resetCode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Code</label>
        <input 
            type="text"
            id="resetCode"
            name="resetCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="Enter Your Code" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
             />
             {formik.errors.resetCode && formik.touched.resetCode && (
                <div className='alert alert-error'>
                    {formik.errors.resetCode}
                </div>
             )}
        </div>
       
        
        <button 
        disabled={!(formik.isValid && formik.dirty)}
        type='submit' 
        className="btn btn-green">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i>: "Verify Code"}
        </button>
        
    </form>
       
    </>
)
}
