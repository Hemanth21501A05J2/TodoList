import { useState } from "react";
import React from 'react'
import axios from 'axios'
import './Signup.css'
import { useHistory } from 'react-router-dom'

function Signup( { handletrue}  ){

  const navigate= useHistory();
  const [data,setData] = useState({
    name: '',
    password: ''
  })
  const [text,setText]= useState('')
  let logintrue= ()=>{
    handletrue()
  }

function handle(e){
    let newData= {...data}
    let t=e.target.value
    newData[e.target.id] = t.trim()
    setData(newData)
    //console.log(newData)
}

  async function submit(e){
        e.preventDefault()
        await axios.post("http://localhost:4000/user/register-user",data )
        .then(async(res)=>{
          //console.log(res)
          const te = await res.data.message
          setText(te)
          if(te==='user created'){
              console.log('it is in the signup bracket')
              //logintrue()
              setTimeout(()=>{navigate.push('/home')},500)
            }
        })
        .catch(err=>console.log(err))    
  }
  return (
    <div className="Signupform">
        <form  onSubmit={(e)=>submit(e)} autoComplete="off" >
            <label>Username:</label>
            <input type='text' id="name" placeholder='Enter username' value={ data.name } onChange={(e)=> handle(e)} ></input>
            <br/>
            <label>password:</label>
            <input type='text' id="password" placeholder='Enter password' value={ data.password } onChange={(e)=>handle(e)} ></input>
            <br/>
            <button type="submit"> 
                Register
            </button>
            {
            (text==='user created')?<p style={{color:"green"}}>{text}</p>:<p style={{margin:'20px'}}>{text}</p>
            }
        </form>
        
    </div>
  )
}

export default Signup