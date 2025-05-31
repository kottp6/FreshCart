import  { useEffect, useState } from 'react';
import classes from "./RelatedProducts.module.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';


export default function RelatedProducts() {

const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [relatedProduct , setRelatedProduct] = useState([])
const{category} = useParams()


async function getRelatedProducts()
{
    setIsLoading(true)
    try {
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    
    const related = data.data.filter((product)=>product.category.name === category)
    setRelatedProduct(related);
    console.log(related);
    setError(null)
    
    }catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setRelatedProduct([])
    }finally{
        setIsLoading(false)
    }
    
}
useEffect(()=>{
    getRelatedProducts();
},[])
return (
    <section className='py-20'>
            <div className="container mx-auto">
                <h1 className="text-lg">Related Product</h1>
                {
                isLoading ? <Loader></Loader> 
                :
                error ? (
                <div className="alert alert-error">
                    {error}
                </div>
                ):<div className="row">
                    {relatedProduct.map((product)=>(
                            <Product key={product.id} product = {product}></Product>
                    ))}
                </div>
                }
            </div>
       </section>
)
}
