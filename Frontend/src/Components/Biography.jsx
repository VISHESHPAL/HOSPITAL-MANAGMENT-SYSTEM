import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt='about' />
      </div>

      <div className='banner'>
      <p>Biography</p>
       <h3>Who We Are</h3>
         <p>
           ZeeCare Hospital is a premier healthcare institution dedicated to delivering world-class medical services. Our commitment to patient care is at the core of everything we do, providing a compassionate and personalized experience for all who walk through our doors.
         </p>
         <p>
           Our state-of-the-art facilities, coupled with a team of highly skilled professionals, ensure that every patient receives the best possible treatment. From advanced diagnostics to specialized surgeries, ZeeCare Hospital is equipped to handle a wide range of medical needs.
         </p>
         <p>Our mission is to promote wellness and foster recovery through excellence in healthcare.</p>
         <p>
           At ZeeCare, we understand the importance of holistic care, which is why we focus not only on treating illnesses but also on preventive healthcare. We regularly host health camps and awareness programs to help the community live healthier lives.
         </p>


      </div>
      
    </div>
  )
}

export default Biography
