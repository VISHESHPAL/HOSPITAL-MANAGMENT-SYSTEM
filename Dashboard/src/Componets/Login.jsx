import React, { useContext, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();
 

  const handleLogin = async(e) =>{
    e.preventDefault();
    try{
     const response = await axios.post(
      "http://localhost:4000/api/v1/user/login", 
      {email,
       password,
       confirmPassword,
       role:"Admin" },
       {
      withCredentials: true,
      headers: { "Content-Type" : "application/json" },
     });
     toast.success(response.data.message);
     setIsAuthenticated(true);
     navigateTo("/");

    }
    // catch (error){
    //   toast.error(error.response.data.message);
    // }
    catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred, please try again.");
      }
    }
    
  };
  

  if (isAuthenticated){
    return <Navigate to={"/"} />;
  }


  return (
    <div>

      <div className='container form-component'>
          <img src="/logo.png" alt="logo"  className='logo'/>
          <h1 className='form-title'>WELCOME TO ZEECARE </h1>
           <p>Only Admin Are Allowed To Access To These Resources !</p>

      <form onSubmit={handleLogin}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=' Enter Email' />
    
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />   
    
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=' Enter Confirm Password' />  
  

            <div style={{justifyContent: "center" ,alignItems: "center"}}>
              <button type='submit'>Login</button>
            </div>

        
         </form>
      
    </div>

      
      
    </div>
  )
}

export default Login
