import  { useEffect, useState } from 'react';
import classes from "./CategorySlider.module.css";
import axios from 'axios';
import Slider from "react-slick"
export default function CategorySlider() {

const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [categories , setCategories] = useState([])

const settings ={
    dots : true,
    infinite : true,
    speed : 500,
    slidesToShow : 7,
    slidesToScroll : 3,
};

async function getCategoriesSlider()
{
    setIsLoading(true)
    try {
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategories(data.data);
    console.log(data.data);
    setError(null)
    
    }catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setCategories([])
    }finally{
        setIsLoading(false)
    }
    
}
useEffect(()=>{
    getCategoriesSlider();
},[])
return (
    <>
        <section className="py-5">
  <div className="container mx-auto px-4">
    <h1 className="text-xl mb-4">Category Slider</h1>
    <Slider {...settings}>
      {categories?.map((category) => (
        <div key={category._id} className="text-center px-2">
          <img
            className={`mb-2 mx-auto ${classes.CategoryImage}`}
            src={category.image}
            alt={category.name}
          />
          <h2 className="text-sm md:text-base">{category.name}</h2>
        </div>
      ))}
    </Slider>
  </div>
</section>
    </>
)
}
