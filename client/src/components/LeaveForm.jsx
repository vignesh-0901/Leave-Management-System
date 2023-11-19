import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";




const LeaveForm = () => {
    const navigate = useNavigate()
    const [sid,setsid] = useState('')
    const [fid,setfid] = useState('')
    const [des,setdes] = useState('')

    const handleSid = e => setsid(e.target.value)
    const handleFid = e => setfid(e.target.value)
    const handleDes = e => setdes(e.target.value)

    const goBack = () => navigate('/')

    const postLeave = (e) => {
        e.preventDefault()
        fetch('/leave',{
            method: 'POST',
            body: JSON.stringify({
                studentId : sid,
                facultyId : fid,
                description : des
            }),
            headers: {
                'Access-Control-Allow-Credentials':true,
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-type': 'application/json; charset=UTF-8',
             }
        }).then(res => console.log(res.json)).then(() => {
            setdes('')
            setfid('')
            setsid('')
        })
    }
    return (
        <div className="box" style={{width:'90vw',margin:'10px', display:'flex', justifyContent:'center',marginTop:'50px'}}>
            <div className="form_container" >
            <button className="btn" onClick={goBack} style={{paddingBottom: '6px'}}>
            <IoMdArrowRoundBack />
            </button>
            
            <h2>Leave Request</h2>

        <form  onSubmit={postLeave}>
            <div className="input">
                <label>Student Id</label>
                <input value={sid} onChange={handleSid}></input>
            </div>
            <div className="input">
                <label>Faculty Id</label>
                <input value={fid} onChange={handleFid}></input>
            </div>
            <div className="input" >
                <label>Description</label>
                <input value={des} onChange={handleDes}></input>
            </div>
            <button className="btn" type="submit"><h4>Post</h4></button>
        </form>
            </div>
        </div>
    )

}

export default LeaveForm;