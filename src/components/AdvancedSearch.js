import React, { useState, useEffect } from 'react'
import axios from 'axios';
import GetMovies from './GetMovies';

function AdvancedSearch({ userInput, favOpen }) {

    const[genres, setGenres] = useState([]);
    const[checkedGenres, setCheckedGenres] = useState([]);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=924afd420197cd13759b791f1e2eb83c&language=en-US")
            .then((res) => {
                setGenres(res.data.genres)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const checkHandle = (e) => {
        if (e.target.checked) { // if true
            setCheckedGenres([...checkedGenres, e.target.nextSibling.innerHTML])
            console.log(e.target.nextSibling.innerHTML)
        }
        else if (!e.target.checked) {
            setCheckedGenres([])
        }
    }

    return (
        <div>
            <div className="advancedSearch">

                {genres.map((genre) => (
                    <form className="genreForm" key={genre.id}>
                        <input type="checkbox" id="genreCheckBox" name="genreCheckBox" onChange={(e) => checkHandle(e)} />
                        <label id="checkBoxId" name="genreCheckBox">{ genre.id }</label>
                        <label id="checkBoxLabel" name="genreCheckBox">{ genre.name }</label>
                    </form>
                ))}
            </div>

            <GetMovies userInput={userInput} checkedGenres={checkedGenres} favOpen={favOpen} />
        </div>
    )
}

export default AdvancedSearch
