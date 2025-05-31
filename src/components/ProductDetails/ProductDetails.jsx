import  { useContext, useEffect, useRef, useState } from 'react';
import classes from "./ProductDetails.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {

    const [productDetails , setProductDetails] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {id} = useParams()
    const{addToCart} = useContext(CartContext);

    const myRef = useRef(0);
    function handleToTop()
    {
        myRef.current.scrollIntoView({behavior : 'smooth' , top : 0});
    }


    async function addProductToCart(productId)
    {
        const response = await addToCart(productId);
        if(response.status === "success")
        {
            toast.success(response.message,{
                theme:"dark"
            });
        }
        else{
            toast.error("Something went wrong",{
                theme:"dark"
            });
        }
    }
    async function getProductDetails(id)
    {
        setIsLoading(true)
        try {
           const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
           console.log(data.data);
           setProductDetails(data.data);
           setError(null)
           
        }catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setProductDetails([])
            
        }finally{
            setIsLoading(false)
        }
        
    }
    useEffect(()=>{
        getProductDetails(id);
        console.log(myRef);
        
    },[id])
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
            <div className="row" ref={toTop}>
            <div className="w-1/3 px-4">
                <img src={productDetails?.imageCover} alt={productDetails?.title} />
            </div>
            <div className='w-2/3 px-4'>
                <h1 className='text-2xl mb-2'>{productDetails?.title}</h1>
                <p className='mb-2 text-gray-500 font-light'>{productDetails?.description}</p>
                <div className='flex justify-between text-gray-500 font-light'>
                    <div className='mb-4'>
                        <p className='mb-2'>{productDetails?.category?.name}</p>
                        <span>{productDetails?.price}</span>

                    </div>
                    <div>
                        <i className='fas fa-star text-yellow-300'></i>
                        <span>{productDetails?.ratingsAverage}</span>
                    </div>
                </div>
                <button onClick={()=>addProductToCart(productDetails?.id)} className="btn btn-green w-full">Add To Cart</button>
            </div>
        </div>
        }
            
        </div>
    </section>
    <RelatedProducts></RelatedProducts>
</>
)
}
