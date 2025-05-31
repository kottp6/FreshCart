import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Register() {
    const{accessToken, setAccessToken} = useContext(AuthContext);
    const[error , setError] = useState(null);
    const[isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        name : "",
        email : "",
        phone : "",
        password : "",
        rePassword : ""
    }
    const validationSchema = Yup.object({
        name :Yup.string()
        .min(3, "Name must br more than 3 Characters")
        .max(20,"Name must be less than 20 Characters")
        .required("Name is Required"),
        email : Yup.string().email("Email is InVaild").required("Email is Required"),
        phone : Yup.string().matches(/^(002)?01[0125][0-9]{8}$/i,"Phone Number Must Contain 11 No").required("Phone is Required"),
        password : Yup.string().matches(/^[A-Z][a-z0-9_]{2,8}$/i,"Password Must be Strong").required("Password is Required"),
        rePassword : Yup.string().oneOf([Yup.ref('password')],"Password Must be Matches").required("Password is Required"),
    })
    let formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit :handleRegister,
        
    })
    async function handleRegister(formValues){
        setIsLoading(true);
        console.log("submit", formValues);
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",formValues)
            console.log(data);
            setIsLoading(false);
            if(data.message === "success")
            {
                navigate('/login');
                setAccessToken(data.token);
                
                
            }
            
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
        <h1 className="text-4xl font-bold mb-8">Registration</h1>
    </div>
    {error && <div className=" max-w-xl mx-auto alert alert-error">
        {error} 
    </div>}
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-5">
        <label htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Name</label>
        <input 
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="ex: mahmoud hussein" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
             />
             {formik.errors.name && formik.touched.name && (
                <div className='alert alert-error'>
                    {formik.errors.name}
                </div>
             )}
        
        </div>
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
        <label htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Password</label>
        <input 
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="*********" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
             />
             {formik.errors.password && formik.touched.password && (
                <div className='alert alert-error'>
                    {formik.errors.password}
                </div>
             )}
        </div>
        <div className="mb-5">
        <label htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Your Password</label>
        <input 
            type="password"
            id="rePassword"
            name="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="*********" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
             />
             {formik.errors.rePassword && formik.touched.rePassword && (
                <div className='alert alert-error'>
                    {formik.errors.rePassword}
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
        <button 
        disabled={!(formik.isValid && formik.dirty)}
        type='submit' 
        className="btn btn-green">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i>: "Register"}
        </button>
        <p>You Have An Account <NavLink to={'/login'} className="text-green-500 underline">Login Now</NavLink> </p>

        
    </form>
</>
)
}
