import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";

const Home = () => {
    const user = AuthService.getUser()
    
    const navigate = useNavigate()

    const [leaveList, setLeaveList]=useState([]);

    const fetchLeave = () => {
        fetch('/leave').then(res => {return res.json();}).then(data => {
            if(data){
                var list

                if(user?.role=="Faculty"){
                  list = data.filter(function(d){return d.facultyId===user.username})
                }
                if(user?.role=="Student"){
                  list = data.filter(function(d){return d.studentId===user.username})
                } 
                if(user?.role==="Admin"){
                  list = data
                }
                setLeaveList(list)
            }
        })
    }

    useEffect(() => {
      fetchLeave()
    },[])
    
    const updateLeave = (l) =>{
      const id = l.id
      l.status=true;
      fetch(`/leave/${id}`,{
        method: 'PUT',
        body:JSON.stringify(l),
        headers: {
          'Access-Control-Allow-Credentials':true,
          // 'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then(response => response.json()).then(data => {console.log(data);fetchLeave()})
    }
    const onApprove = (l) =>(()=> updateLeave(l))
   
    const goTo = () => navigate('/leave')

    return (
        <div className="home_page">
        <button className="btn" disabled={user?.role==="Faculty"} 
        onClick={goTo}
        style={user?.role==="Faculty" ? {backgroundColor:"grey",color:'black'}:{}}
        >
          <h4>Create New Leave Request</h4></button>
        <table className="home_page" style={{backgroundColor:"rgba(255, 255, 255, 0.55)"}}>
            <thead className="head">
                <tr>
                    <td className="id"><h3>Student Id</h3></td>
                    <td className="id"><h3>Faculty Id</h3></td>
                    <td className="desc"><h3>Description</h3></td>
                    <td className="id"><h3>Approval Status</h3></td>
                    <td className=""><h3>Approve</h3></td>
                </tr>
            </thead>
            <tbody >
                {leaveList.length >0 && leaveList?.map(l=>{
                    return (
                        <tr key={l.id}>
                            <td className="id">{l.studentId}</td>
                            <td className="id">{l.facultyId}</td>
                            <td className="desc">{l.description}</td>
                            <td className="id">{l.status?"Approved":"Not Approved"}</td>
                            <td className=""><button type="submit" className="btn" onClick={onApprove(l)} disabled={user.role==="Student" || l.status} style={user.role==="Student" || l.status ? {backgroundColor:"grey",color:'black'}:{}}><h4>Approve</h4></button></td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
        )
}

export default Home;