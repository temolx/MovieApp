import React, { useState, useEffect} from 'react'
import axios from 'axios'
import GetGenre from './GetGenre';
import loadingGif from '../img/loadingGif.gif'
import favorites from '../img/favorites.png'
import Favorites from './Favorites';
import { useNavigate } from 'react-router-dom';

function GetMovies({ userInput, checkedGenres, favOpen }) {

  const navigate = useNavigate();

  const[movies, setMovies] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[pageNumber, setPageNumber] = useState(1);
  const[favs, setFavs] = useState(() => {
    const localData = localStorage.getItem('favs');
    return localData ? JSON.parse(localData) : [];
  });


  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=924afd420197cd13759b791f1e2eb83c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`)
      .then((res) => {
        setMovies([...movies, ...res.data.results])
        setIsLoading(false)
        console.log(res.data.results)
      }).catch((err) => {
        console.log(err)
      })

      localStorage.setItem('favs', JSON.stringify(favs))

  }, [pageNumber, favs])


  window.onscroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (bottom) {
      setPageNumber(pageNumber + 1);
      console.log("bottom check");
    }
  }

  const showButton = (index) => {
    const addButton = document.querySelectorAll('.favoriteButton');
    addButton[index].style.display = "flex"
  }

  const hideButton = (index) => {
    const addButton = document.querySelectorAll('.favoriteButton');
    addButton[index].style.display = "none"
  }

  const handleFavorites = (movieID) => {

    movies.map((movie) => {
        if (movieID === movie.id) {
          setFavs([...favs, movie])
        }
    })

    document.getElementsByClassName('favAlert')[0].style.display = 'flex'

    setTimeout(() => {
      document.getElementsByClassName('favAlert')[0].style.display = 'none'
    }, 3000)
  }
  

    if (!isLoading) {
        return (
          <div className="GetMovies">
            <h1 className="favAlert">Added to favorites!</h1>
            <Favorites favs={favs} favOpen={favOpen} setFavs={setFavs} />

            {movies && movies.filter((element) => {
                if (userInput === '') {
                    return element;
                }
                
                else if (element.original_title.toLowerCase().includes(userInput.toLowerCase()) || element.overview.toLowerCase().includes(userInput.toLowerCase()) || element.release_date.toLowerCase().includes(userInput.toLowerCase())) {
                    return element;
                }
            }).filter((element) => {
              if (checkedGenres.length > 0) {
                if (element.genre_ids[0] == checkedGenres || element.genre_ids[1] == checkedGenres || element.genre_ids[2] == checkedGenres || element.genre_ids[3] == checkedGenres) {
                  return element;
                }
              }
              
              else {
                return element;
              }
            }).map((movie, index) => (
            <section className="MovieList" key={ movie.id }>

                <h1 className="MovieTitle">{ movie.original_title }</h1>
        
                <div className="poster-container" onMouseEnter={() => showButton(index)} onMouseLeave={() => hideButton(index)}   >
                    <div className="pic" onClick={() => navigate("/MovieProfile", {state: {
                  movieInfo: movie, favOpen: favOpen }})} >
                      <img className="MoviePoster" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="Movie poster" />
                    </div>

                    <img src={favorites} alt="Add to favorites button" className="favoriteButton" onClick={() => handleFavorites(movie.id)} />
                </div>

                <GetGenre genreID={movie.genre_ids} />

            </section>
            ))}
      
        </div>
        );
    }


    else {
        return(
            <img src={loadingGif} className="loadingGif" alt="loading gif" />
        )
    }
}

export default GetMovies
