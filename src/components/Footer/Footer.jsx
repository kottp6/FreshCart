import  { useEffect, useState } from 'react';
import classes from "./Footer.module.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'

export default function Footer() {

return (
    <>
        

<footer className="bg-gray-200 dark:bg-gray-900 relative bottom-0 w-full mt-5 py-5">
    <div className="mx-auto w-full p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
                    <Link to={""}>
                        <img src={logo} alt="Fresh Cart" />
                    </Link>
          </div>
         
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">FreshCart</a>. All Rights Reserved.
          </span>
          
      </div>
    </div>
</footer>

    </>
)
}
