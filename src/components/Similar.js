import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Similar({ movieData }) {

    const[similarMovies, setSimilarMovies] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieData.id}/similar?api_key=924afd420197cd13759b791f1e2eb83c&language=en-US&page=1`)
            .then((res) =>{
                setSimilarMovies(res.data.results)
            }).catch((err) => {
                console.log(err)
            })

            window.scrollTo(0, 0)
    }, [movieData.id])


    return (
        <div>
            <h1 className="reccommend">You might also like...</h1>

        <div className="similarItems">
            {similarMovies && similarMovies.map((similarMovie) => (
                <div className="similarList" key={ similarMovie.id } >
                    <div className="similarPoster-container" >
                        <img className="similarPoster" src={"https://image.tmdb.org/t/p/w500" + similarMovie.poster_path} onClick={() => navigate("/MovieProfile", {state: {
                            movieInfo: similarMovie
                        }})} />
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Similar
