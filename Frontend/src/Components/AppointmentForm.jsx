import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppointmentForm = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState("");


  const departmentsArray= [
      "Pediatrics",
      "Orthopedies",
      "Cardiology",
      "Neorology",
      "Oncology",
      "Radiology",
      "Physical Therapy",
      "Dermatology",
      "ENT",
  ];


  const navigateTo =useNavigate();
  
  const [doctors, setDoctors] = useState([]);
  useEffect(() =>{
    const fetchDoctors = async () =>{
     const {data} = await axios.get("http://localhost:4000/api/v1/user/doctors",
      {withCredentials: true},

     );

     setDoctors(data.doctors)
    }
    fetchDoctors();
  }, [])

  const handleAppointment = async(e) =>{
      e.preventDefault();
      try{
           const hasVisitedBool = Boolean(hasVisited);
           const {data} = await axios.post("http://localhost:4000/api/v1/appointment/post",
            {
              firstName,
              lastName,
              email,
              nic,
              dob,
              phone,
              gender,
              department,
              doctor_firstName: doctorFirstName,
              doctor_lastName : doctorLastName,
              address,
              appointment_date: appointmentDate,
              hasVisited: hasVisitedBool,
            },
            {withCredentials: true,
             headers: {
              "Content-Type" : "application/json",
             } 
            },
            
           )
           toast.success(data.message);
           navigateTo("/");

      }
      catch(error){
        toast.error(error.response.data.message);
      }
  }



  return (
    <div  className='container form-component appointment-form'>
    <h2>Appointment </h2>
    
    <form onSubmit={handleAppointment}>
  
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

         <input type="date" placeholder=' Enter the Appointment Date' value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />


      </div>

      <div>
          <select value={department} onChange={ (e) =>{
            setDepartment(e.target.value);
            setDoctorFirstName("");
            setDoctorLastName("");
          }} >
            {
              departmentsArray.map((depart, index) =>{
                return(
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                )
              })
            }

          </select>

          {/* <select value={`${doctorFirstName} , ${doctorLastName}`} onChange={ (e) =>{
            const [firstName,lastName] = e.target.value.split(" ");

            setDoctorFirstName(firstName);
            setDoctorLastName(lastName);  
          }}
           disabled ={!department}
          >
            <option value="">Select Doctor</option>
            {
              doctors.filter(doctor => doctor.doctorDepartment === department).map((doctor,index) =>{
                return (
                  <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>

                    {doctor.firstName} {doctor.lastName}

                  </option>
                )
              })
            }
          </select> */}
          <select
  value={doctorFirstName && doctorLastName ? `${doctorFirstName} ${doctorLastName}` : ""} // Display name when selected
  onChange={(e) => {
    const selectedDoctor = doctors.find(
      (doctor) => `${doctor.firstName} ${doctor.lastName}` === e.target.value
    );
    if (selectedDoctor) {
      setDoctorFirstName(selectedDoctor.firstName);
      setDoctorLastName(selectedDoctor.lastName);
    }
  }}
  disabled={!department}
>
  <option value="">Select Doctor</option>
  {doctors
    .filter((doctor) => doctor.doctorDepartment === department)
    .map((doctor, index) => (
      <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
        {doctor.firstName} {doctor.lastName}
      </option>
    ))}
</select>

      </div>

      <textarea rows="10" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address'/>

 


      <div style={{gap: "10px", justifyContent: "flex-end" ,flexDirection:"row"}}>
           <p style={{marginBottom: 0}}>Have You visited Before ?</p>
           <input type="checkbox" checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} 
           style={{flex: "none" ,width: "25px" } }/>
         </div>

         <div style={{justifyContent: "center" ,alignItems: "center"}}>
           <button type='submit'>Get Appointment</button>
         </div>



     </form>
  </div>
  )
}

export default AppointmentForm
