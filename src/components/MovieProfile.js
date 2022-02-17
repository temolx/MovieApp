import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Similar from './Similar';
import Favorites from './Favorites';
import favorites from '../img/favorites.png'

function MovieProfile() {

    const location = useLocation();
    const backdropPath = "https://image.tmdb.org/t/p/w500" + location.state.movieInfo.backdrop_path;

    const style = {
        background: `url(${backdropPath})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }

    const[videoData, setVideoData] = useState('');

    const[favs, setFavs] = useState(() => {
        const localData = localStorage.getItem('favs');
        return localData ? JSON.parse(localData) : [];
      });

    
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${location.state.movieInfo.id}/videos?api_key=924afd420197cd13759b791f1e2eb83c&language=en-US`)
            .then((res) => {
                setVideoData(res.data.results[0])
            }).catch((err) => {
                console.log(err)
            })

            window.scrollTo(0, 0) // scrolls to top when page is loaded / redloaded
            localStorage.setItem('favs', JSON.stringify(favs))

    }, [location.state.movieInfo.id, favs])

    const handleFavorites = (movieID) => {
            if (movieID === location.state.movieInfo.id) {
              setFavs([...favs, location.state.movieInfo])
            }

                document.getElementsByClassName('favAlert')[0].style.display = 'flex'

            setTimeout(() => {
                document.getElementsByClassName('favAlert')[0].style.display = 'none'
            }, 3000)  
        }

    return (
        <div className="movieProfile">
            <h1 className="favAlert-second">Added to favorites!</h1>
            <Favorites favs={favs} favOpen={location.state.favOpen} setFavs={setFavs} />

            <div className="profile-container" style={style}>

                <div className="innerContent">
                    <img src={"https://image.tmdb.org/t/p/w500" + location.state.movieInfo.poster_path} className="profilePoster" />

                    <section className="profileInfo">
                        <div className="openingTitle">
                            <div className="first-cont">
                                <h1>{ location.state.movieInfo.original_title }</h1>
                                <h2>Release Date: { location.state.movieInfo.release_date }</h2>
                            </div>

                            <div className="second-cont">
                                <img src={favorites} alt="Add to favorites button" className="profileFav-button" onClick={() => handleFavorites(location.state.movieInfo.id)} />
                            </div>
                        </div>

                        <p><span>Overview:</span> { location.state.movieInfo.overview }</p>
                        <iframe className="videoTrailer" width="560" height="315" src={`https://www.youtube.com/embed/${videoData.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </section>
                    
                </div>
            </div>
            <Similar movieData={location.state.movieInfo} />

            <footer>
                <h1>Contact Us</h1>
                <form>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="text" placeholder="Email" />
                    <textarea placeholder="Your Message" />
                    <input type="submit" />
                </form>

                <p>© World Movies All Rights Reserved</p>
            </footer>
        </div>
    )
}

export default MovieProfile
