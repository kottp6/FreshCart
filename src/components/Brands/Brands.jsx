import  { useEffect, useState } from 'react';
import classes from "./Brands.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function Brands() {

const [brands , setBrands] = useState([]);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

async function getBrands()
{
    setIsLoading(true)
    try {
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    console.log(data.data);
    setBrands(data.data);
    setError(null)
    
    }catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setBrands([])
    }finally{
        setIsLoading(false)
    }
    
}
useEffect(()=>{
    getBrands();
},[])
return (
    <>
         <div className="container">
            {
                isLoading ? <Loader></Loader>
                : error ? <div className="alert alert-error">
                {error}
            </div> :
                <div className="row justify-start p-10">
                {brands.map((brand)=> (
                    <Link key={brand._id} to={`/brand-details/${brand._id}`}>
                        <div  className="m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded h-[200px] w-full" src={brand.image} alt={brand.name} />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{brand.name}</h5>
                            </div>
                        </div>
                     </Link>
                ))}
            </div>
            }
            
        </div> 
    </>
)
}
