import  { useEffect, useRef, useState } from 'react';
import classes from "./Products.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

export default function Products() {

    const [Products , setPrdoucts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('')
    console.log(search);
    

    async function getRecentProducts()
    {
        setIsLoading(true)
        try {
           const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
           console.log(data.data);
           setPrdoucts(data.data);
           setError(null)
           
        }catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setPrdoucts([])
        }finally{
            setIsLoading(false)
        }
        
    }
    useEffect(()=>{
        getRecentProducts();
       
        
    },[])

    

return (
    <>
        <section className='py-10'>
            <div className="container mx-auto">
            <input 
            type="search"
            id=""
            name=""
            onChange={(e)=>setSearch(e.target.value)}
            // value= ""
            // ref={inputRef}
            // onInput={searchItem}
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="Search For Product" 
             />
                <h1 className='text-lg'>Products</h1>
                {
                isLoading ? <Loader></Loader> 
                :
                error ? (
                <div className="alert alert-error">
                    {error}
                </div>
                ):<div className="row">
                    {Products.filter((product)=>{
                        return search.toLowerCase() === '' ? product : product.title.toLowerCase().includes(search)
                    }).map((product)=>(
                            <Product key={product.id} product = {product}></Product>
                    ))}
                </div>
                }
            </div>
       </section>
    </>
)
}
