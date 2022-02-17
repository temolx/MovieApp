import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function FavoritesPage() {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="searchTitle">Favorites</h1>
        <div className="GetMovies">
            {location.state.favorites && location.state.favorites.map((fav) => (
                <div className="MovieList">
                    <div className="poster-container"   >
                    <div className="pic" onClick={() => navigate("/MovieProfile", {state: {
                movieInfo: fav }})} >
                    <img className="MoviePoster" src={"https://image.tmdb.org/t/p/w500" + fav.poster_path} alt="Movie poster" />
                    </div>
                </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default FavoritesPage
