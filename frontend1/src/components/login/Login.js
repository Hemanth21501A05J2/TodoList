import React from 'react'
import { useState } from 'react';
import './login.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

function Login({ handletrue }) {

    const navigate= useHistory();

    let [data,setdata]= useState({
      name:'',
      password:''
    });
    let [text,setText]= useState('')
    function handle(e){
      let newData= {...data}
      let t=e.target.value
      newData[e.target.id] = t.trim()
      setdata(newData)
      //console.log(newData)
    }

    let logintrue = ()=>{
      handletrue()
    }
    async function submit(e){
        e.preventDefault()
        await axios.post('http://localhost:4000/user/login-user',data)
        .then(async (res)=>{
          const text= await res.data.message;
          setText(text)
          if(text==='User login successfull'){
            //logintrue()
            window.localStorage.setItem("loginstate","true")
            let l= window.localStorage.getItem("loginstate")
            console.log('from login page '+l)
            
            setTimeout(()=>{navigate.push('/home')},500)
          }
          else{
            window.localStorage.setItem("loginstate",'null from login else')
          } 
        })
        .catch((err)=> console.log(err))
      }
  return (
    
    <div className='loginform'>
        <form autoComplete='off' >
            <label>Username:</label>
            <input autoFocus='on' type='text' id='name' placeholder='Enter username' value={ data.name } onChange={(e)=> handle(e)} ></input>
            <br/>
            <label>password:</label>
            <input type='text' id='password' placeholder='Enter password' value={data.password} onChange={(e)=> handle(e)}></input>
            <br/>
            <button onClick={(e)=>submit(e)}>
                Login
            </button>
        </form>
        <p id='signup_nav'>If you dont have an account, create it <a href='/signup'>Here</a>  </p>


        { (text==='User login successfull')? <p style={{color:'green'}}>{text}</p>: <p>{text}</p>   }
    </div>
    
  )
  
}


export default Login