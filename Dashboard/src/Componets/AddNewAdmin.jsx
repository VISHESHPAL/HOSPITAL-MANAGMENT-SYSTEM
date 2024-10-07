import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewAdmin = () => {


  const {isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin  =  async(e) =>{
    e.preventDefault();

    try{
      const response = await axios.post(
       "http://localhost:4000/api/v1/user/admin/addnew", 
       {
        firstName,
        lastName,
        email,
        nic,
        phone,
        dob,
        gender,
        password,
       },
        {
       withCredentials: true,
       headers: { "Content-Type" : "application/json" },
      });
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
 
     }

     catch (error) {
       if (error.response && error.response.data) {
         toast.error(error.response.data.message);
       } else {
         toast.error("An error occurred, please try again.");
       }
     }
  };

  if(!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <>

   <section className="page">
 

  <div  className='container form-component add-admin-form'>
       <img src="/logo.png" alt="logo" className='logo' />
       <h1 className='form-title'>ADD NEW ADMIN</h1>
               
       <form onSubmit={handleAddNewAdmin}>
     
         <div>
          <input type="text" placeholder=' Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder=' Enter Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
         </div>
      
           <div>
           <input type="text" placeholder=' Enter Email here' value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type="number" placeholder=' Enter Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />

           </div>
        
           <div>
           <input type="number" placeholder=' Enter NIC' value={nic} onChange={(e) => setNic(e.target.value)} />
           <input type="date" placeholder=' Enter Date Of Birth' value={dob} onChange={(e) => setDob(e.target.value)} />

           </div>
        
        <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)} >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

           <input type="password" placeholder=' Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />

         </div>

      
            <div style={{justifyContent: "center" ,alignItems: "center"}}>
              <button type='submit'>ADD NEW ADMIN</button>
            </div>



       </form>
    </div>


</section>
      
    </>
  )
}

export default AddNewAdmin
