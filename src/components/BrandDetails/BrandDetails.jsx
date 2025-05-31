import  { useEffect, useState } from 'react';
import classes from "./BrandDetails.module.css";
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Loader from '../Loader/Loader';
export default function BrandDetails() {

const [brandDetails , setBrandDetails] = useState([]);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const {id} = useParams();

async function getBrandDetails()
{
    setIsLoading(true)
    try {
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    console.log(data.data);
    setBrandDetails(data.data);
    setError(null)
    
    }catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setBrandDetails([])
    }finally{
        setIsLoading(false)
    }
    
}
useEffect(()=>{
    getBrandDetails(id);
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
                <img className='rounded' src={brandDetails?.image} alt={brandDetails?.name} />
            </div>
            <div className='w-2/3 px-4'>
                <h1 className='text-2xl mb-2'>{brandDetails?.name}</h1>
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
