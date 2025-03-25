import React, { useState,useEffect } from 'react';

function Actors() {

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
    <div class="flex flex-wrap justify-center gap-3 mt-3">
    {movieData.map(movie =>
    (
      
        <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
          <div class="p-4">
      <h2 class="text-xl font-bold">{movie.name}</h2>
      <p class="text-gray-400 text-sm">{movie.birthday}</p>
      <p class="mt-2">{movie.nationality}</p>
          </div>
        </div>
      
    
    ))}
    </div>
    
  )
}

export default Actors;