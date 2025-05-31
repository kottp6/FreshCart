import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './components/Layout/Layout'
// import Home from './components/Home/Home'
// import Products from './components/Products/Products'
// import Brands from './components/Brands/Brands'
// import Cart from './components/Cart/Cart'
// import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Error from './components/Error/Error'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetCode from './components/ResetCode/ResetCode'
import NewPassword from './components/NewPassword/NewPassword'
import AuthContextProvider, { AuthContext } from './Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
//import ProductDetails from './components/ProductDetails/ProductDetails'
//import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import BrandDetails from './components/BrandDetails/BrandDetails'
import CartContextProvider from './Context/CartContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Checkout from './components/Checkout/Checkout'
//import MyOrders from './components/MyOrders/MyOrders'
import WichlistContextProvider from './Context/WishlistContext'
//import Wishlist from './components/Wishlist/Wishlist'
//import Profile from './components/Profile/Profile'
import { lazy, Suspense } from 'react'
import Loader from './components/Loader/Loader'

const Home = lazy(()=> import("./components/Home/Home"));
const Cart = lazy(()=> import("./components/Cart/Cart"));
const Products = lazy(()=> import("./components/Products/Products"));
const Brands = lazy(()=> import("./components/Brands/Brands"));
const Categories = lazy(()=> import("./components/Categories/Categories"));
const Checkout = lazy(()=> import("./components/Checkout/Checkout"));
const MyOrders = lazy(()=> import("./components/MyOrders/MyOrders"));
const Wishlist = lazy(()=> import("./components/Wishlist/Wishlist"));
const Profile = lazy(()=> import("./components/Profile/Profile"));
const CategoryDetails = lazy(()=> import("./components/CategoryDetails/CategoryDetails"));
const ProductDetails = lazy(()=> import("./components/ProductDetails/ProductDetails"));


function App() {
  
  const router = createBrowserRouter([
    {
      path : "",
      element : <Layout></Layout>,
      errorElement : <Error></Error>,
      children : [
        {
          index : true,
          element :<ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Home></Home>
            </Suspense>
            </ProtectedRoute> 
        },
        {
          path:'/products',
          element : <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
               <Products></Products>
            </Suspense>
          </ProtectedRoute>
          
        },
        {
          path:'/product-details/:category/:id',
          element : <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
               <ProductDetails></ProductDetails>

            </Suspense>
          </ProtectedRoute>
          
        },
        {
          path:'/brands',
          element : <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Brands></Brands>
            </Suspense>
            
            </ProtectedRoute>
        },
        {
          path:'/brand-details/:id',
          element : <ProtectedRoute>
            <BrandDetails></BrandDetails>
            </ProtectedRoute>
        },
        {
          path:'/cart',
          element :<ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Cart></Cart>
            </Suspense>
            
            </ProtectedRoute> 
        },
        {
          path:'/checkout',
          element :<ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Checkout></Checkout>
            </Suspense>
            </ProtectedRoute> 
        },
        {
          path:'/allorders',
          element :<ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <MyOrders></MyOrders>
            </Suspense>
            
            </ProtectedRoute> 
        },
        {
          path:'/wishlist',
          element :<ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Wishlist></Wishlist>
            </Suspense>
            </ProtectedRoute> 
        },
        {
          path:'/profile',
          element :<ProtectedRoute>
           <Suspense fallback={<Loader></Loader>}>
              <Profile></Profile>
            </Suspense>
            </ProtectedRoute> 
        },
        {
          path:'/categories',
          element :<ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Categories></Categories>
            </Suspense>
            </ProtectedRoute> 
        },
        {
          path:'/category-details/:id',
          element :<ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <CategoryDetails></CategoryDetails>
            </Suspense>
            </ProtectedRoute> 
        },
        {
          path:'/login',
          element : <Login></Login>
        },
        {
          path:'/register',
          element : <Register></Register>
        },
        {
          path:'/forgetPassword',
          element : <ForgetPassword></ForgetPassword>
        },
        {
          path:'/resetCode',
          element : <ResetCode></ResetCode>
        },
        {
          path:'/newPassword',
          element : <NewPassword></NewPassword>
        },
      ]
    }
  ])
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
        <WichlistContextProvider>
          <RouterProvider router={router}>
          </RouterProvider>
          </WichlistContextProvider>
          <ToastContainer></ToastContainer>
        </CartContextProvider>
      </AuthContextProvider>
      
    </>
  )
}

export default App
