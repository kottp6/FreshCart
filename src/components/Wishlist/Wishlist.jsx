import  { useContext, useEffect, useState } from 'react';
import classes from "./Wishlist.module.css";
import { WichlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';


export default function Wishlist() {

    const {getWichList,deleteItem,wishListData} = useContext(WichlistContext);
    const {addToCart} = useContext(CartContext);
    const[error , setError] = useState(null);
    const[isLoading , setIsLoading] = useState(false);

    async function getAllWichlist()
    {
        setIsLoading(true);
        try{
                const res = await getWichList();   
            if(res.status === 'success')
            {
                console.log(res.data);
               
            }
            else{
            setIsLoading(false)
            }
        }
        catch(error){
            console.log(error);
            
        }finally{
            setIsLoading(false)
        }
        
    }

    async function removeItemFromWish(productId)
    {
        const response = await deleteItem(productId);
        if(response.status === 'success')
        {
            toast.success("Product Removed Successfully");
        }
        else{
            toast.error("Product Not Removed");
        }
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

return (
    <>
         <section className='py-10'>
            <div className="container mx-auto">
                <h1 className='text-lg'>My Favourite</h1>
                {isLoading  ? <Loader></Loader>  :(<div className="row">
                    {wishListData?.map((product)=>(
                        <div className="w-1/6 px-4 mb-4 product mx-5" key={product.id}>
                        <button onClick={()=>removeItemFromWish(product._id)} className='btn btn-red'><i className="fa-solid fa-trash"></i></button>
                        <div>
                            <img className='mb-2' src={product?.imageCover} alt={product.title} />
                            <span className='mb-2 text-green-500'>{product?.brand?.name}</span>
                            <br />
                            <span className='mb-2 text-green-500'>{product?.category?.name}</span>
                            <h2 className='mb-2 text-lg font-semibold truncate'>{product?.title}</h2>
                            <div className='flex justify-between text-gray-500 font-light'>
                                <span>{product?.price}EGP</span>
                                <div>
                                    <i className='fas fa-star text-yellow-300'></i>
                                    <span>{product?.ratingsAverage}</span>
                                </div>
                            </div>
                            </div>
                            <button onClick={()=>addProductToCart(product.id)} className='btn btn-green w-full mt-3'>Add To Cart</button>
                        </div>
                    ))}
                </div>)}
                
                
            </div>
       </section>
    </>
)
}
