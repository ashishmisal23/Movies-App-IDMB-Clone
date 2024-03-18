import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import { getValue } from '@testing-library/user-event/dist/utils';

const Data = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1)

    const handlePageChange = (event) => {
        setPage(parseInt(event.target.value, 10));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTIxNTEzZWRhYjA5NWRlMzFhNGUyMzU2ZGY5OTUxZiIsInN1YiI6IjY1Zjg5ZDMwMTYwZTczMDE4M2Y5NDFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nNcDSOK44UnSGxQSI33WA9plEdYLh5b3mm3_ArABfUg'
                    }
                };

                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);
                const data = await response.json();
                setMovies(data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <h1>Popular Movies</h1>
            <MovieList movies={movies} />
            <input type="number" value={page} onChange={handlePageChange} />
        </>
    );
};

export default Data;
