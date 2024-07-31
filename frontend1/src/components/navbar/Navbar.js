import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';


function Navbar(/*{loginstatus}*/) {
        //console.log('loginstatus is: '+loginstatus)
        let l= window.localStorage.getItem("loginstate")
        console.log('loginstate from navbar '+l)
        // let changeFalse= ()=>{
        //     window.localStorage.setItem("loginstate",'null from navbar') 
        // }
  
  return (
    <div>
        <div className="navbar">
            <h1>TODO APP</h1>
            <div className='link'>
                <a href='/home'>Home</a>
                
                {
                  
                (l=== true)?
                <span>
                  {console.log('in the logout button '+l)}
                  <a href="/" 
                  onClick={()=>{          
                    console.log('from changefalse function')
                    
                    window.localStorage.removeItem("loginstate") }
                  }
                  > Logout</a>
                
                </span> 
                :
                  <span>
                    {console.log('In the login button '+l)}
                    <a href='/login'>Login</a>
                    <a href='/signup'>Signup</a>
                  </span>
                }
            </div>  
            
        </div>
    </div>
  )
}

export default Navbar