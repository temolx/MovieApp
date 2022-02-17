import React, { useState } from 'react'
import AdvancedSearch from './AdvancedSearch';
import ScrollTop from './ScrollTop';

function SearchBar() {

    const[userInput, setUserInput] = useState("");
    const[filtersHidden, setFiltersHidden] = useState(true);
    const[favOpen, setFavOpen] = useState(false);
 
    const inputHandler = (e) => {
        e.preventDefault()
        setUserInput(e.target.value)
    }

    const clearHandler = (e) => {
        setUserInput('')
    }

    const handleFilters = (e) => {
        e.preventDefault();

            if (filtersHidden) { // hidden
                document.getElementsByClassName('advancedSearch')[0].style.display = "grid"
                setFiltersHidden(false)
            }

            else { // visible
                document.getElementsByClassName('advancedSearch')[0].style.display = "none"
                setFiltersHidden(true)
            }
    }

    const favHandler = (e) => {
        e.preventDefault();

        if (!favOpen) {
            setFavOpen(true) 
        }
        
        else {
            setFavOpen(false)
        }
    }

    return (
        <div>
            <h1 className="searchTitle">Find A Movie!</h1>

            <form className="searchBar">
                <input type="text" placeholder="Movie / Year / Desc." onChange={inputHandler} />
                <button className="advancedButton" onClick={handleFilters}>Advanced Search</button>
                <button className="clearButton" onClick={clearHandler}>Clear</button>
                <button className="favButton" onClick={favHandler} >Favorites</button>
            </form>

            <ScrollTop />
            <AdvancedSearch userInput={userInput} favOpen={favOpen} />
        </div>
    )
}

export default SearchBar
