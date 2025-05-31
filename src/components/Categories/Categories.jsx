import  { useEffect, useState } from 'react';
import classes from "./Categories.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function Categories() {

    const [categories , setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getCategories()
    {
        setIsLoading(true)
        try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        console.log(data.data);
        setCategories(data.data);
        setError(null)
        
        }catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setCategories([])
        }finally{
            setIsLoading(false)
        }
        
    }
    useEffect(()=>{
        getCategories();
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
                {categories.map((category)=> (
                    <Link key={category._id} to={`/category-details/${category._id}`}>
                        <div  className="m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded h-[200px] w-full" src={category.image} alt={category.name} />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
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
