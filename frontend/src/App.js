import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/home";
import Movies from "./Pages/movies";
import Actors from "./Pages/actors";

<script src="https://cdn.tailwindcss.com"></script>

function App() {



const url = `http://localhost:5297/actor`;
const [movieData, setMovieData] = useState([]);

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
            console.log(response.message)
        })()
    }, [])
    
  return (
        <div class="flex flex-wrap justify-center gap-6 mt-6">
          <Router>
          <nav className="w-full bg-gray-800 p-4 shadow-lg">
      <ul className="flex justify-center space-x-6 text-white">
        <li><Link to="/" className="hover:text-blue-400">Főoldal</Link></li>
        <li><Link to="/movies" className="hover:text-blue-400">Filmek</Link></li>
        <li><Link to="/actors" className="hover:text-blue-400">Színészek</Link></li>
      </ul>
    </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
        </Routes>
      </div>
    </Router>
         {/*
          {
          movieData.map(movie =>
          (
          <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
        <div class="p-4">
            <h2 class="text-xl font-bold">{movie.name}</h2>
            <p class="text-gray-400 text-sm">{movie.birthday}</p>
            <p class="mt-2">{movie.nationality}</p>
        </div>
    </div>
          
          ))
          }
    
          */}
          </div>
          
  )
 
}

export default App
