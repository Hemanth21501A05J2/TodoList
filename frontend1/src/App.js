
import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar.js';
import Login from './components/login/Login.js';
import Signup from './components/signup/Signup.js';
import Home from './components/home/Home.js'
import Starting from './components/starting/Starting.js'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
// import { AnimatePresence } from "framer-motion";


function App() {

  let [login,setLogin]= useState(false)
  const handletrue = ()=>{
    setLogin(true)
  }
  
  //window.localStorage.setItem("loginstate",'null from app')
  let loginstate = window.localStorage.getItem("loginstate")

  return (
    <Router>
    <div className="App">
      <Navbar /*loginstatus={login}*/ />
      <div className='Content'>
          <Switch>
            <Route exact path='/'  >
              {(loginstate===true)?<Home/>:<Starting/>}
            </Route>
           
              <Route path='/home'>
                <Home/>
              </Route>
              <Route path='/login' >
                <Login handletrue={handletrue} />
              </Route>
            
              <Route path='/signup'>
                <Signup hadletrue={handletrue} />
              </Route>
           
          </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
