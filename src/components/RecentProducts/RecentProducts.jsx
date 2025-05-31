import  { useEffect, useState } from 'react';
import classes from "./RecentProducts.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

export default function RecentProducts() {

const [Products , setPrdoucts] = useState([]);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);



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
    <section className='py-5'>
            <div className="container mx-auto">
                <h1 className='text-xl'>RecentProducts</h1>
                {
                isLoading ? <Loader></Loader> 
                :
                error ? (
                <div className="alert alert-error">
                    {error}
                </div>
                ):<div className="row">
                    {Products.map((product)=>(
                            <Product key={product.id} product = {product}></Product>
                    ))}
                </div>
                }
            </div>
       </section>
    </>
)
}
