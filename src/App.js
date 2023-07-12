import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import WatchedSummery from "./components/WatchedSummery";
import WatchBoxList from "./components/WatchBoxList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState("")
  const [query,setQuery] = useState("")
  const [selectedId,setSelectedId] = useState(null)
 
 
  const KEY = "6202128b"

  function handleSelectMovie(id){
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie(){
    setSelectedId(null)
  }
  function handleAddWatched(newMovie){
    setWatched((watched)=>[...watched,newMovie])
    handleCloseMovie()
  }

  function handleDeleteWatched(title) {
    setWatched((watched) => watched.filter((movie) => movie.title !== title));
  }

  useEffect(function (){
    const controller = new AbortController()
     async function fetchMovies(){
     try{
      setIsLoading(true)
      setError((""))
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal})
    
      if(!res.ok) throw new Error("Something went wrong! check connection")

      const data  = await res.json()
      if(data.Response==='False') throw new Error("Movie Not found!")

      setMovies(data.Search)
      
     }catch(err){
      console.error(err.message)
      setError(err.message)
     } finally{
      setIsLoading(false)
     }
     }
     if(query.length<2){
      setMovies([])
      setError("")
      return
     }
     handleCloseMovie()
     fetchMovies()
  return function(){
    controller.abort()
   }
  },[query])

  return (
    <>
       <Navbar>
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
       </Navbar>
      <Main>
        
        <Box>
       
       {isLoading && <Loader />}
       {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>
          )}
          
        
        </Box>

        <Box>
          {selectedId? <MovieDetails watched={watched} onAddMovie={handleAddWatched} selectedId={selectedId} onCloseMovie={handleCloseMovie} KEY={KEY}/>:
          <>
            <WatchedSummery watched={watched} />
            <WatchBoxList watched={watched} onDeleteWatched={handleDeleteWatched}/>
          </>}
        </Box>
     
      </Main>
      
   
    </>
  );
}


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];