
import './App.css';
import React from 'react';
import Navbar from './pages/navbar';
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Authentication from './pages/auth'
import Practice from './pages/practice';
import Profile from './pages/profile';
import Messages from './pages/messages';
import Explore from './pages/explore';
import Home from './pages/home';
import Post from './pages/post';
import SignOutPage from './pages/signout';
import SignInPage from './pages/signIn';
import UserProfileViewer from './pages/userProfileView';

function App() {
  
  return (
      <BrowserRouter>
      <Navbar/> 
      <Routes>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/practice" element={<Practice />}></Route> 
          <Route exact path="/profile" element={<Profile />}></Route> 
          <Route exact path="/messages" element={<Messages />}></Route> 
          <Route exact path="/explore" element={<Explore />}></Route>
          <Route exact path = "/post" element={<Post />}></Route>
          <Route exact path = "/auth" element={<Authentication />}></Route>
          <Route exact path = "/signout" element={<SignOutPage />}></Route>
          <Route exact path = "/signIn" element={<SignInPage />}></Route>
          <Route exact path = "/user-profile/:userId" element={<UserProfileViewer />}></Route>
        </Routes>
        </BrowserRouter>
    
  );
}

export default App;
