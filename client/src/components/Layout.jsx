import React,{useState,useEffect} from 'react'
import Topbar from './Topbar'
import { Outlet, useNavigate } from 'react-router-dom';
import AuthService from './AuthService'


const Layout = () => {

  const navigate = useNavigate()
  const [name,setname] = useState('')
  const [uname,setuname] = useState('')
  const [role,setrole] = useState('')

  useEffect( () => {
    const user =AuthService.getUser();
    if(user){
      setuname(user.username);
      setname(user.name);
      setrole(user.role);
    }
    else navigate('/login')
    
      
  },[])
    
  return (
    <div className="app">
        <Topbar />
        <Outlet />
    </div>
  )
}

export default Layout