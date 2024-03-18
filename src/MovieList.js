import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-item">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title} className='item-img'
          />
          <div className="movie-details">
            <h2>{movie.title}</h2>
            {/* <p>{movie.overview}</p> */}
            <p>Release Date: {movie.release_date}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Vote Average: {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
