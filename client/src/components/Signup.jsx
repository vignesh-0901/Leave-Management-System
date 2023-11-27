import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


export const ROLES = {
    Student: 'Student',
    Faculty: 'Faculty',
    Admin: 'Admin'
}

const Signup = () => {
    const navigate = useNavigate();
    const [uname,setuname] = useState('')
    const [name,setname] = useState('')
    const [pwd,setpwd] = useState('')
    const [role,setrole] = useState('Student')

    const handleUname = e => setuname(e.target.value)
    const handleName = e => setname(e.target.value)
    const handlePwd = e => setpwd(e.target.value)

    const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
    const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const data= await fetch('/users',{
                method:'POST',
                body:JSON.stringify({
                    username:uname,
                    name:name,
                    password:pwd,
                    role:role
                }),
                headers: {
                    'Access-Control-Allow-Credentials':true,
                    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-type': 'application/json; charset=UTF-8',
                 }
            });
            console.log(data)
            const { success, message } = data;
            if (success) {
              handleSuccess(message);
              setTimeout(() => {navigate("/");}, 1000);
            } else {
              handleError(message);
            }
        }
        catch (err){
            console.log(err)
        }
        setuname('')
        setname('')
        setpwd('')
        setrole('')
    }

    const onRoleChanged = (e) => setrole(e.target.value)

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option >
        )
    })
  return (
    <div style={{width:'90vw',margin:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}>

    <div style={{width:'90vw',margin:'10px', display:'flex', justifyContent:'center'}}>       
      <h1 style={{color:'white'}}>Leave Management Portal</h1>
    </div>
 
    <div className="form_container" style={{marginTop:'20px'}}>
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="name">Name</label>
          <input
            type="text" 
            name="name"
            value={name}
            placeholder="Enter your Name"
            onChange={handleName}
            />
        </div>
        <div>
          <label id="username">Username</label>
          <input
            type="text"
            name="username"
            value={uname}
            placeholder="Enter your Username"
            onChange={handleUname}
            />
        </div>
        <div>
          <label id="password">Password</label>
          <input
            type="password"
            name="password"
            value={pwd}
            placeholder="Enter your Password"
            onChange={handlePwd}
            />
        </div>
        <div>
            <label id="role">Role</label>
            <select id="roles" placeholder='Select your Role' value={role} onChange={onRoleChanged}>
                {options}
            </select>
        </div>
        <button type="submit"><h4>Submit</h4></button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  </div>


    // <div>
        
    //     <form onSubmit={handleSubmit}>
    //         <div className="input">
    //             <label></label>
    //             <input value={uname} onChange={handleUname} />
    //         </div>
    //         <div className="input">
    //             <label>Name:</label>
    //             <input value={name} onChange={handleName} />
                
    //         </div>
    //         <div className="input">
    //             <label>Password:</label>
    //             <input value={pwd} onChange={handlePwd} />
    //         </div>
            // <div>
            //     <select id="roles" value={role} onChange={onRoleChanged}>
            //         {options}
            //     </select>
            // </div>
    //         <button type='submit'>Sign Up</button>
    //     </form>
    //     <ToastContainer />
    // </div>
  )
}

export default Signup