import  { useEffect, useState } from 'react';
import classes from "./MainSlider.module.css";
import img1 from "../../assets/images/grocery-banner.png"
import img2 from "../../assets/images/grocery-banner-2.jpeg"
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"

import Slider from 'react-slick';

export default function MainSlider() {

const settings ={
    dots : true,
    infinite : true,
    speed : 500,
    slidesToShow : 1,
    slidesToScroll : 1,
    arrows :false,
};
const images = [
    {
        src:slider1,
        label:"image 1"
    },
    {
        src:slider2,
        label:"image 2"
    },
    {
        src:slider3,
        label:"image 3"
    },

]
return (
    <>
    
    <section className="py-10">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-2/3">
        <Slider {...settings}>
          {images.map((img, index) => (
            <img key={index} className="h-[300px] md:h-[400px] w-full object-cover" src={img.src} alt={img.label} />
          ))}
        </Slider>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <img className="h-[150px] md:h-[200px] w-full object-cover" src={img1} alt="" />
        <img className="h-[150px] md:h-[200px] w-full object-cover" src={img2} alt="" />
      </div>
    </div>
  </div>
</section>

    </>
)
}
