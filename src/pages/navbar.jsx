import React from 'react';
import { Link} from 'react-router-dom';
import './css/Navbar.css'
const Navbar = () => {
    return (
    <div className='navbar'>
    <ul>
      <li> <Link to = "/home"> Home</Link></li>
      <li> <Link to = "/practice"> Practice</Link></li>
      <li> <Link to = "/profile"> Profile</Link></li>
      <li> <Link to = "/messages"> Messages</Link></li>
      <li> <Link to = "/explore"> Explore</Link></li>
      <li> <Link to = "/post"> Post</Link></li>
      <li> <Link to = "/auth"> Login / Sign Out</Link></li>
    </ul> 
    </div>
    )
}
export default Navbar