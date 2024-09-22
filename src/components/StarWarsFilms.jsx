import React, { useState, useCallback } from "react";

const StarWarsFilms = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleAddMovie = (e) => {
    e.preventDefault();
    console.log(newMovie); // Log the new movie object to the console

    // Optionally: Clear form after submission
    setNewMovie({
      title: "",
      openingText: "",
      releaseDate: "",
    });
  };

  // Fetch movies function (kept for reference)
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (err) {
      setError("Something went wrong!");
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Star Wars Movies</h1>

      {/* Add Movie Form */}
      <form onSubmit={handleAddMovie} className="mb-4">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={newMovie.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="openingText">Opening Text</label>
          <textarea
            id="openingText"
            name="openingText"
            className="form-control"
            rows="3"
            value={newMovie.openingText}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className="form-control"
            value={newMovie.releaseDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>

      {/* Fetch Movies Button */}
      <button onClick={fetchMoviesHandler} className="btn btn-secondary">
        Fetch Movies
      </button>

      {/* Display Loading Spinner */}
      {isLoading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}

      {/* Movies List */}
      <div className="row">
        {!isLoading &&
          movies.map((movie) => (
            <div key={movie.id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {movie.releaseDate}
                  </h6>
                  <p className="card-text">{movie.openingText}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StarWarsFilms;
