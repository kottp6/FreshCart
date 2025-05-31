import  { useEffect, useState } from 'react';
import classes from "./CategoryDetails.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';

export default function CategoryDetails() {

const [specificCategories , setSpecificCategories] = useState([]);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const {id} = useParams()

async function getSpecificCategories()
{
    setIsLoading(true)
    try {
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    console.log(data.data);
    setSpecificCategories(data.data);
    setError(null)
    
    }catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setSpecificCategories([])
    }finally{
        setIsLoading(false)
    }
    
}
useEffect(()=>{
    getSpecificCategories(id);
},[])
return (
    <>
        <section className='py-20'>
        <div className="container mx-auto">
            {isLoading ? <Loader></Loader>
            : error ? 
            (
                <div className="alert alert-error">
                    {error}
                </div>
                )
            :
            <div className="row">
            <div className="w-1/3 px-4">
                <img className='rounded' src={specificCategories?.image} alt={specificCategories?.name} />
            </div>
            <div className='w-2/3 px-4'>
                <h1 className='text-2xl mb-2'>{specificCategories?.name}</h1>
                <p className='mb-2 text-gray-500 font-light'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cum alias deleniti commodi vel et nam amet maiores magni minus, libero a asperiores dicta voluptatem quae ipsum placeat, numquam aspernatur?
                </p>
            </div>
        </div>
        }
            
        </div>
    </section>
    </>
)
}
