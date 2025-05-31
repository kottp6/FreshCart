import  { useContext, useEffect, useState } from 'react';
import classes from "./Cart.module.css";
import { CartContext } from '../../Context/CartContext';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function Cart() {

const {getCart,cartDetails,numOfCartItems,deleteProduct ,deleteAllProducts,updateItem} = useContext(CartContext);

const[isLoading , setIsLoading] = useState(false);

async function getAllCart()
{
    setIsLoading(true)
    try{
        const response = await getCart();   
        if(response.status === 'success')
        {
            console.log(response);
        }
        else{
            toast("Not Found Item In Cart")
        }
    }catch{

    }finally{
        setIsLoading(false)
    }
    
}

async function removeProduct(productId)
{
    const response = await deleteProduct(productId);
    if(response.status === 'success')
    {
        toast.success("Product Removed Successfully");
    }
    else{
        toast.error("Product Not Removed");
    }
}

async function removeProducts()
{
    const response = await deleteAllProducts();
    toast.success("Product Removed Successfully"); 
}

async function updateProduct(productId,count)
{
    const response = await updateItem(productId,count);
    if(response.status === 'success')
    {
        toast.success("Product Updated Successfully");
    }
    else{
        toast.error("Something went wrong");
    }
}


return (
    <>  
        {isLoading ? <Loader></Loader> : (
            <section className='py-20'>
            <div className="container mx-auto">
                <h1 className='text-3xl font-bold'>Cart</h1>
                <button onClick={removeProducts} className='btn btn-red'><i className="fa-solid fa-trash mx-2"></i>Clear Cart</button>
                {cartDetails && (
                    <>
                    <div className='flex justify-between py-3'>
                        <h4 className='text-xl'>Total Item : 
                            <span className='text-green-500 '> {numOfCartItems} items</span>
                        </h4>
                        <h4 className='text-xl'>Total Price : 
                            <span className='text-green-500 pr-2'> {cartDetails?.totalCartPrice} EGP</span>
                        </h4>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartDetails?.products?.map((product) => (
                                <tr key={product._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product?.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                  {product?.product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button 
                                        onClick={()=>updateProduct(product?.product.id, product?.count-1 <=0 ? deleteProduct(product.product.id):product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <div>
                                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
                                        </div>
                                        <button onClick={()=>updateProduct(product.product.id, product.count+1)}
                                         className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.price} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <span onClick={()=>removeProduct(product.product.id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                                </td>
                                </tr>))}
                                 
                            </tbody>
                        </table>
                    </div>
                    <Link to={'/checkout'} className='btn btn-green w-full block my-10 text-center'>Checkout</Link>
                    </>
                    )}
            </div>
        </section>
        )}
        
    </>
)
}
