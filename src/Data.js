import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';

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
                        Authorization: `Bearer ${process.env.REACT_APP_KEY}`
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
