import  { useEffect, useState } from 'react';
import classes from "./ProtectedRoute.module.css";
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {

const [counter , setCounter] = useState(0);

const navigate = useNavigate();

useEffect(()=>{

})
if(!localStorage.getItem("accessToken"))
{
    return <Navigate to={'/login'}></Navigate>
}
return children
}
