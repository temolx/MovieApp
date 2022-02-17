import axios from 'axios';
import React, { useState, useEffect } from 'react'

function GetGenre({ genreID, pageNumber }) {

    const[genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=924afd420197cd13759b791f1e2eb83c&language=en-US")
            .then((res) => {
                setGenres(res.data.genres)
            }).catch((err) => {
                console.log(err)
            })
    }, [pageNumber])

    return (
        <div>
            {genres.map((genre) => (
                genreID.map((genreID) => (
                    <h3 className="genres" key={genreID}>{ genre?.id === genreID ? genre?.name : '' }</h3>
                ))
            ))}
        </div>
    )
}

export default GetGenre
