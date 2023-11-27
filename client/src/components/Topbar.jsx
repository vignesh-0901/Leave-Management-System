import React,{useState,useEffect,useContext} from 'react'
import AuthService from './AuthService';
import { useNavigate } from "react-router-dom";
import user from '../App';
import { BiLogOut } from "react-icons/bi";


// import { useCookies } from "react-cookie";
// import { ToastContainer, toast } from "react-toastify";

const Topbar = () => {
  const navigate = useNavigate()
  // const u = useContext(user)
  // const [cookies, removeCookie] = useCookies([]);
  const user = AuthService.getUser()
  
  // useEffect(() => {
    // const verifyCookie = async () => {
    //   if (!cookies.token) {
    //     navigate("/login");
    //   }
    //   const data  = await fetch('/verify',{method:'POST',headers: {
    //     'Access-Control-Allow-Credentials':true,
    //     // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Content-type': 'application/json; charset=UTF-8',
    //  }},{});
    //   const d = await data.json();
    //   console.log("from layout",d);
    //   const { status, username, name, role } = d;
      // setuname(username);
      // setname(name);
      // setrole(role);
    //   return status
    //     ? toast(`Hello ${name}`, {
    //         position: "top-right",
    //       })
    //     : (removeCookie("token"), navigate("/login"));
    // };
    // verifyCookie();
  // }, [cookies]);



  const Logout = () => {
      if(AuthService.logout()) navigate("/login");
  }
  return (
    <div style={{width:'100vw',marginBottom:'20px',marginTop:'20px',padding:'20px', display:'flex', justifyContent:'space-between',backgroundColor:'rgba(255, 255, 255, 0.3)'}}>
        <h1 style={{color:'white'}}>Leave Management Portal</h1>
        <div style={{display:'flex',justifyContent:'space-between'}}>

        <h2 style={{marginRight:'15px',display:'flex', justifyContent:'space-between',alignItems:'center'}}>{user?.name+" - "+user?.role}</h2>
        <button className='btn' onClick={Logout} style={{paddingBottom:'5px',fontSize:'1.5rem'}}><BiLogOut /></button>
        </div>
    </div>
  )
}

export default Topbar;