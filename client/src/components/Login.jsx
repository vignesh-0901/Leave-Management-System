import React, { useState , useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AuthService from './AuthService';

const Login = () => {
    const navigate = useNavigate();
    const [uname,setuname] = useState('')
    const [pwd,setpwd] = useState('')

    const handleUname = e => setuname(e.target.value)
    const handlePwd = e => setpwd(e.target.value)

    const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
    const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        AuthService.login(uname, pwd).then(
          (data) => {
            const user = AuthService.getUser();
            handleSuccess("Logged In successfully.");
            if(data){
              setTimeout(() => {navigate("/");}, 1000);
            } 
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
              handleError(resMessage);
          }
        ); 
        setuname('')
        setpwd('')
    }
  return (
    <div style={{width:'90vw',margin:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}>

    <div style={{width:'90vw',margin:'10px', display:'flex', justifyContent:'center'}}>       
      <h1>Leave Management Portal</h1>
    </div>
    <div className="form_container" style={{marginTop:'20px'}}>
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="username">Username</label>
          <input
            type="text"
            name="username"
            value={uname}
            placeholder="Enter your username"
            onChange={handleUname}
          />
        </div>
        <div>
          <label id="password">Password</label>
          <input
            type="password"
            name="password"
            value={pwd}
            placeholder="Enter your password"
            onChange={handlePwd}
          />
        </div>
        <button type="submit"><h4>Submit</h4></button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      {/* <ToastContainer /> */}
    </div>
    </div>


    // <div>
    //     <h1>Login</h1>
    //     <form onSubmit={handleSubmit}>
    //         <label>Username:</label>
    //         <input value={uname} onChange={handleUname} />
    //         <label>Password:</label>
    //         <input value={pwd} onChange={handlePwd} />
    //         <button type='submit'>Login</button>
    //     </form>
    // </div>
    
  )
}

export default Login