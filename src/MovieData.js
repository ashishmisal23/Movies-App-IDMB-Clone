import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';

const Data = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event) => {
        setPage(parseInt(event.target.value, 10));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform page change logic here
        // In this case, it's already handled by the handlePageChange function
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                    }
                };

                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(data.total_pages);
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
            <div className='input'>
                {page > 1 && <button onClick={() => setPage(1)}>First</button>}
                {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
                <button>{page}</button>
                {page < totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
                {page < totalPages && <button onClick={() => setPage(totalPages)}>Last</button>}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="number" value={page} onChange={handlePageChange} />
                <button type="submit">Go</button>
            </form>
        </>
    );
};

export default Data;
