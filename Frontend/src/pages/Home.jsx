import React from 'react';
import Hero from "../Components/Hero";
import Department from "../Components/Department";
import MessageForm from "../Components/MessageForm";
import Biography from "../Components/Biography";

const Home = () => {
  return (
    <div>
      <Hero title={"Welcome to ZeeCare Medical Hospital | Your Trusted HealthCare Provider"} imageUrl={"/hero.png"} />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </div>
  );
};

export default Home;
