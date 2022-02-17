import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Favorites({ favs, favOpen, setFavs }) {

    const navigate = useNavigate();

    useEffect(() => {
    const favoriteHandler = () => {
        const favBar = document.getElementsByClassName('sideFavorites')[0];

        if (favOpen) {
            favBar.style.display = "block";
        }

        else {
            favBar.style.display = "none";
        }
    }

    favoriteHandler();
})

const removeHandler = (movieName) => {
    const updatedFavs = favs.filter((element) => {
        return movieName !== element.original_title;
    })

    setFavs(updatedFavs);
}

    return (
            <div className="sideFavorites">
              <h1 className="favTitle" onClick={() => navigate("/Favorites", {state: {
                  favorites: favs
              }})} >Favorites:</h1>

                  {favs && favs.map((fav) => (
                    <div key={ fav.id } className="fav-container" >
                        <h2 onClick={() => navigate("/MovieProfile", {state: {
                            movieInfo: fav }})} >{ fav.original_title }</h2>
                        <button className="removeFav" onClick={() => removeHandler(fav.original_title)}>X</button>
                    </div>
                  ))}
            </div>
    )
}

export default Favorites
