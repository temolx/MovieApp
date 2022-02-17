import './App.css';
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieProfile from './components/MovieProfile';
import logo from './img/logo.png'
import FavoritesPage from './components/FavoritesPage';
import { Link } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
        <div className="App">
        <header>
                <div className="logo-container">
                    <Link to="/" ><img src={ logo } alt="Logo" /></Link>
                </div>

                <nav>
                    <ul>
                        <li><Link to="/" className="currentPage">Movies</Link></li>
                        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" >Catalogue</a></li>
                        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" >TV</a></li>
                        <li><a href="https://www.youtube.com/watch?v=zpzXGwjXaeo&ab_channel=yvestheestallion" target="_blank" >About Us</a></li>
                        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" >Contact</a></li>
                    </ul>
                </nav>
            </header>

          <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/MovieProfile" element={<MovieProfile />} />
            <Route path="/Favorites" element={<FavoritesPage />} />
          </Routes>

        </div>
      </BrowserRouter>
    );
}

export default App;
