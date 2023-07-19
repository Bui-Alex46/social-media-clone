import React from 'react';
import {BrowserRouter , Routes, Route, Link} from 'react-router-dom';
import Practice from './practice';
import Profile from './profile';
import Messages from './messages';
import Explore from './explore';
import Home from './home';
import Post from './post';
import './css/Navbar.css'
const Navbar = () => {
    return (
    <BrowserRouter>
    <div className='navbar'>
    <ul>
      <li> <Link to = "/home"> Home</Link></li>
      <li> <Link to = "/practice"> Practice</Link></li>
      <li> <Link to = "/profile"> Profile</Link></li>
      <li> <Link to = "/messages"> Messages</Link></li>
      <li> <Link to = "/explore"> Explore</Link></li>
      <li> <Link to = "/post"> Post</Link></li>
    </ul> 
    </div>
    
      <Routes>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/practice" element={<Practice />}></Route> 
        <Route exact path="/profile" element={<Profile />}></Route> 
        <Route exact path="/messages" element={<Messages />}></Route> 
        <Route exact path="/explore" element={<Explore />}></Route>
        <Route exact path = "/post" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
    )
}
export default Navbar