import { useEffect, useState } from "react"
import Loader from "./Loader"
import StarRating from "./StarRating"
import ErrorMessage from "./ErrorMessage"
export default function MovieDetails({selectedId,onCloseMovie,KEY,onAddMovie,watched}){
    const [movie,setMovie] = useState({})
    const[isLoading,setIsLoading] = useState(false)
    const[userRating,setUserRating] = useState(0)
    const isWatched = watched.map(watched=>watched.imdbId).includes(selectedId)
    const [error,setError] = useState("")
     const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
    const {Title :title,
        Actors:actors,
        Genre:genre,
        Poster:poster,
        imdbRating,
        
        Runtime:runtime,
        Plot:plot,
        Director:director,
        Released:released} = movie

        function handleAdd(){
            const newMovie={
                imdbId:selectedId,
                title:title,
                poster:poster,
                imdbRating:Number(imdbRating),
                runtime:Number(runtime.split(" ").at(0)),
                userRating
            }
          onAddMovie(newMovie)
           
        }
        useEffect(
            function () {
              function callback(e) {
                if (e.code === "Escape") {
                  onCloseMovie();
                }
              }
        
              document.addEventListener("keydown", callback);
        
              return function () {
                document.removeEventListener("keydown", callback);
              };
            },
            [onCloseMovie]
          );
    useEffect(()=>{
    
        async function fetchMovieDetails(){
           try{
            setError("")
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
           
            if(!res.ok) throw new Error("something went wrong")
            
            const data = await res.json()
            if(data.Response==='False') throw new Error("Movie Not found!")
            
            setMovie(data)
            setError("")
           }catch(err){
            
            if(err.name!=="AbortError"){
                setError(err.mesage)
            }
           
           }finally{
            setIsLoading(false)
           }
        }

       fetchMovieDetails()
       

    },[selectedId])
    useEffect(()=>{
        if(!title)return
        document.title = `Movie | ${title}`

        return function(){
            document.title="usePopcorn"
        }
    },[title])
    return(
        <div className="details">
            {isLoading && <Loader />}
            
            {error && <ErrorMessage message={error} />}
           
            {!error && !isLoading && <>
            <header>
                <button onClick={onCloseMovie} className="btn-back">&larr;</button> 
                <img src={poster}  alt={title}/>
                <div className="details-overview">
                <h2>{title}</h2>
                <p>{released} &bull; {runtime}</p>
                <p>{genre}</p>
                <p><span>⭐️</span>{imdbRating} IMDb rating</p>
            </div>
            </header>
            <div className="rating">
                {!isWatched?
                <>
                <StarRating onSetRating={setUserRating}/>
                {userRating>0 && <button className="btn-add" onClick={handleAdd}>+ Add Movie</button>} </>:
                <p>You rated this movie {watchedUserRating}</p>
                
                }
            </div>
            
            <section>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
           </>}
            
          
        </div>
        
    )
}