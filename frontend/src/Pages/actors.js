import React, { useState,useEffect } from 'react';


function Actors() {

const url = `http://localhost:5297/Actor`;
const [actorData, setActorData] = useState([]);
const token = localStorage.getItem('authToken');
const jog = localStorage.getItem('authJog');

useEffect(() =>
    {
        (async () =>
        {
            const request = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok)
            {
                console.log("Hiba")
                return
            }

            const response = await request.json();
            setActorData((response.result))
            console.log(response.message)
        })()
    }, [])
  return (
    <div class="flex flex-wrap justify-center gap-3 mt-3">
    {actorData.map(actor =>
    (
      
        <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
          <div class="p-4">
      <h2 class="text-xl font-bold">{actor.name}</h2>
      <p class="text-gray-400 text-sm">{actor.birthday}</p>
      <p class="mt-2">{actor.nationality}</p>
          </div>
        </div>
      
    
    ))}
    </div>
    
  )
}

export default Actors;