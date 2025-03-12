import React, { useState,useEffect } from 'react';

function App() {
const url = `https://localhost:7131/actor`;
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
        <div>
          {
          movieData.map(movie =>
          (
          <p>Színész:{movie.name}</p>
          
          ))
          }
          
          </div>
  )
 
}

export default App
