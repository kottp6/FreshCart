import  { useContext, useEffect, useRef, useState } from 'react';
import classes from "./Product.module.css";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

import { toast } from 'react-toastify';
import { WichlistContext } from '../../Context/WishlistContext';

export default function Product({product}) {

const {addToCart} = useContext(CartContext);
const {addToWichlist} = useContext(WichlistContext);

const btnRef = useRef();



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


async function addProductToWish(productId)
{
    const response = await addToWichlist(productId);
    if(response.status === "success")
    {
        btnRef.current.className = "fa-solid fa-heart";
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
        <div className="w-1/6 px-4 mb-4 product" key={product.id}>
        <button  onClick={()=>addProductToWish(product.id)} type="button" className="btn btn-green"><i ref={btnRef} className="fa-regular text-xl fa-heart"></i></button>
        <Link to={`/product-details/${product.category.name}/${product.id}`}>
            <img className='mb-2' src={product.imageCover} alt={product.title} />
            <span className='mb-2 text-green-500'>{product.category.name}</span>
            <h2 className='mb-2 text-lg font-semibold truncate'>{product.title}</h2>
            <div className='flex justify-between text-gray-500 font-light'>
                <span>{product.price}EGP</span>
                <div>
                    <i className='fas fa-star text-yellow-300'></i>
                    <span>{product.ratingsAverage}</span>
                </div>
            </div>
            </Link>
            <button onClick={()=>addProductToCart(product.id)} className='btn btn-green w-full mt-3'>Add To Cart</button>
        </div>
        
    </>
)
}
