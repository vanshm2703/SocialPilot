import React from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';  
import Home from './components/Home';
import Navbar from './components/Navbar';
import Feature from './components/Feature';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import StairsModel from './assets/StairsModel';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import StarrySky from './utils/StarrySky';

function App() {
  return (<>
    
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/" element={<><Navbar/><Home /><Feature/><Testimonial/><Footer/></>} />
        {/* <Route path="/model" element={<StairsModel/>}/> */}
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
