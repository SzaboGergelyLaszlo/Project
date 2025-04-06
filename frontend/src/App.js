import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
import Home from "./Pages/home";
import Movies from "./Pages/movies";
import Actors from "./Pages/actors";
import Login from "./Pages/login";
import Admin from "./Pages/admin";
import Directors from "./Pages/directors";
import Users  from './Pages/users';
import './App.css';

<script src="https://cdn.tailwindcss.com"></script>


function App() {


const url = `http://localhost:5297/actor`;
const [movieData, setMovieData] = useState([]);
const token = localStorage.getItem('authToken');
const jog = localStorage.getItem('authJog');
const userId=localStorage.getItem('authUserId');


useEffect(() =>
    {
        (async () =>
        {
            const request = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!request.ok)
            {
                console.log("Hiba")
                return
            }

            const response = await request.json();
            setMovieData((response.result))
        })()
    }, [])
    
  return (
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <Router>
          
          <nav className="w-full bg-gray-800 p-4 shadow-lg">
      <ul className="flex justify-center space-x-6 text-white">
        <li><Link to="/" className="hover:text-blue-400">Főoldal</Link></li>
        <li><Link to="/movies" className="hover:text-blue-400">Filmek</Link></li>
        <li><Link to="/directors" className="hover:text-blue-400">Rendezők</Link></li>
        <li><Link to="/actors" className="hover:text-blue-400">Színészek</Link></li>
        {token && jog <2 && (
        <li><Link to="/users" className="hover:text-blue-400">Felhasználók</Link></li>
        )}
        {!token && (
          <>
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
            <li><Link to="/admin" className="hover:text-blue-400">Regisztráció</Link></li>
            </>
        )}
        
        {token && (
          <li><button  onClick={() => {
            localStorage.removeItem('authToken'); 
            localStorage.removeItem('authJog'); 
            localStorage.removeItem('authUserID')
            localStorage.removeItem('authName');// Kiléptetés
            window.location.reload();  // Az oldal újratöltése a frissítéshez
          }}>Kilépés</button></li>
        )}
      </ul>
    </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
         {}
          </div>
          
  )
 
}

export default App
