import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
export default function Navbar() {

const navigate = useNavigate();
const {accessToken,setAccessToken} = useContext(AuthContext);

const {numOfCartItems} = useContext(CartContext);
function handleLogout()
{
    localStorage.removeItem("accessToken");
    
    setAccessToken(null);
    
}   
return (
<>
    <nav className="bg-gray-100 p-4 static lg:fixed top-0 end-0 start-0 z-50">
        <div className="container mx-auto">
            <div className="flex justify-between items-center flex-col lg:flex-row">
                <div className="flex items-center flex-col lg:flex-row">
                    <Link to={""}>
                        <img src={logo} alt="Fresh Cart" />
                    </Link>
                    {accessToken && 
                        <ul className="flex flex-col lg:flex-row">
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={""}>Home</NavLink>
                            </li>
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={"/products"}>Products</NavLink>
                            </li>
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={"/brands"}>Brands</NavLink>
                            </li>
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={"categories"}>Categories</NavLink>
                            </li>
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={"allorders"}>My Orders</NavLink>
                            </li>
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={"wishlist"}>WishList</NavLink>
                            </li>
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={"/cart"}>
                                
                                    <button type="button" className="relative inline-flex items-center text-sm font-medium text-center rounded-lg  focus:ring-4 focus:outline-none">
                                    <i className="fas fa-cart-shopping fa-2x"></i>
                                    <span className="sr-only">Cart</span>
                                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                        {numOfCartItems}
                                    </div>
                                    </button>

                                </NavLink>
                            </li>
                            
                        </ul>
                    }
                </div>
                <div>
                <ul className="flex flex-col lg:flex-row">
                    {accessToken ? 
                        <>
                        <li className="my-2 lg:my-0">
                            <Link className="p-2" onClick={handleLogout}>Logout</Link>
                        </li>
                        <li className="my-2 lg:my-0">
                            <Link className="p-2" to={"/profile"}>Profile</Link>
                        </li>
                        <li className="my-2 lg:my-0">
                            <a href="" className="fab fa-facebook mx-2"></a>
                            <a href="" className="fab fa-twitter mx-2"></a>
                            <a href="" className="fab fa-youtube mx-2"></a>
                            <a href="" className="fab fa-instagram mx-2"></a>
                            <a href="" className="fab fa-tiktok mx-2"></a>
                        </li>
                        </>
                    :
                        <>
                            <li className="my-2 lg:my-0">
                            <NavLink className="p-2" to={"/register"}>Register</NavLink>
                            </li>
                            <li className="my-2 lg:my-0">
                                <NavLink className="p-2" to={"/login"}>Login</NavLink>
                            </li>
                        </> 
                    
                    }
                        
                        
                        
                    </ul>
                </div>
            </div>
            
        </div>
    </nav>
</>
)
}
