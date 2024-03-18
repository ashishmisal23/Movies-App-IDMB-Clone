import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies && movies.map(movie => (
        <div key={movie.id} className="movie-item">
          <img className="item-img" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-details">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
