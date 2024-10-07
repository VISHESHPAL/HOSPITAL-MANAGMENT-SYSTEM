import React, { useContext, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
    const [show , setShow] = useState(true);
    const {isAuthenticated, setIsAuthenticated}  = useContext(Context);
    const nevigateTo = useNavigate();

    const handleLogout = async() =>{

         await axios.get("http://localhost:4000/api/v1/user/patient/logout",
             {
                withCredentials: true,
             }).then(res =>{
                toast.success(res.data.message);
                setIsAuthenticated(false);
                setShow(!show);

             })
             .catch((err) =>{
                toast.error(err.response.data.message)
             });
       
    }
    const gotoLogin = async() =>{
        nevigateTo("/login");
        setShow(!show);
    }

  return (
    <nav className='container'>
        <div className='logo'>
        <img src="/logo.png" alt="logo" className="logo-img"/>

        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
            <div className="links">

                <Link to={"/"} onClick={ () =>setShow(!show)}>HOME</Link>
                <Link to={"/appointment"} onClick={ () =>setShow(!show)}>APPOINTMENT</Link>
                <Link to={"/about"} onClick={ () =>setShow(!show)}>ABOUT US</Link>

            </div>
            { 
             isAuthenticated ?
              (<button className='logoutBtn btn' onClick={handleLogout}>
                LOGOUT</button>) :
              (<button className='logoutBtn btn' onClick={gotoLogin}>
                LOGIN</button>)  
             }
        </div>

        <div className='hamburger' onClick={ () =>setShow(!show)}>
          <GiHamburgerMenu/>
        </div>
      
    </nav>
  )
}

export default Navbar
