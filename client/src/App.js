import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import LeaveForm from './components/LeaveForm';
import Layout from './components/Layout';
import Signup from './components/Signup';
import Login from './components/Login';
// import user from './components/user';
import React,{useState, useContext} from 'react'
import {createContext} from 'react'

// export const user = createContext()

function App() {
  
  // const [usr, setusr ]= useState()
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} /> 
      {/* <user.Provider value={{usr,setusr}}> */}
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/leave' element={<LeaveForm/>}/>  
      </Route>
      {/* </user.Provider> */}
    </Routes>
  );
}

export default App;
