import React, { useEffect, useState } from 'react'

function GetAllFilm(props)
{
    const url = `http://localhost:3306/p`
    const [moviesData, setMovieData] = useState([])
    const [movieObj, setMovieObj] = useState(null)

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
            setMovieData(response.result)
            console.log(response.message)
        })()
    }, [props.count])


    const handleMovieObj = (movieFromCard) =>
    {
        setMovieObj(movieFromCard)
    }

    const movieElments = moviesData.map(
        Film =>
        {
            return (
                <div onDoubleClick={() => { handleMovieObj(Film) }} className="card m-3 pt-2" style={{ 'width': 200, 'float': 'left' }} key={Film.id}>
                    <div className="card-header">{Film.Name}</div>
                    <div className="card-body">{Film.Director}</div>
                    <div className="card-footer">{Film.Genre}</div>
                    <div className="card-footer">{Film.ReleaseYear}</div>
                    
                </div>
            )
        }
    )
    return (
        <>
            
            <div>{movieElments}</div>
        </>

    )

}

export default GetAllFilm