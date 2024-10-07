import React from 'react'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const Department = () => {

  const departmentsArray = [
    {
      name: "Pediatics",
      ImageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      ImageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      ImageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      ImageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      ImageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      ImageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical therapy",
      ImageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      ImageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      ImageUrl: "/departments/ent.jpg",
    },
   ]  

  const responsive = {
    extraLarge: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1330 },
      items: 4,
      slidesToSlider: 1, // optional default to 
    },
    large: {
      breakpoint: { max: 1330, min: 1005 },
      items: 3,
      slidesToSlider: 1, // optional default to 

    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlider: 1, // optional default to 

    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlider: 1, // optional default to 

    },
  };

  return (
    <div className='container departments'> 
      <h2>Departments</h2>
       <Carousel responsive={responsive} removeArrowOnDeviceType={["medium","small"]}>
            {
              departmentsArray.map((depart,index) =>{
                return (
                  <div className='card' key={index}>
                    <div className='depart-name'>{depart.name}</div>
                    <img src={depart.ImageUrl} alt={depart.name} />
                  </div>
                )
              })
            }
       </Carousel>
      
    </div>
  )
}

export default Department
