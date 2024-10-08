import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom"
import "./App.css"
import Dashboard from './Componets/Dashboard'
import Login from './Componets/Login'
import AddNewAdmin from './Componets/AddNewAdmin'
import AddNewDoctor from './Componets/AddNewDoctor'
import Doctors from './Componets/Doctors'
import Messages from './Componets/Messages'
import Sidebar from './Componets/Sidebar'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main'
import axios from 'axios'

const App = () => {

  const {isAuthenticated, setIsAuthenticated,user, setUser} = useContext(Context);
  useEffect( () =>{
    const fetchUser =async() =>{
      try{
        const response =await axios.get("https://hospital-managment-system-1-backend.onrender.com/api/v1/user//admin/me",
           {withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
      catch (error){
       setIsAuthenticated(false);
       setUser({});
      }
    };
    fetchUser();

   }, [isAuthenticated]);


  return (
    <div>
     <Router>
         <Sidebar/>
       <Routes>
          <Route path='/' element={ <Dashboard/>}/>
          <Route path='/login' element={ <Login/>}/>
          <Route path='/admin/addnew' element={ <AddNewAdmin/>}/>
          <Route path='/doctor/addnew' element={ <AddNewDoctor/>}/>
          <Route path='/messages' element={ <Messages/>}/>
          <Route path='/doctors' element={ <Doctors/>}/>

       </Routes>
       <ToastContainer position='top-center' />
     </Router>

      
    </div>
  )
}

export default App


