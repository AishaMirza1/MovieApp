export default function WatchBoxMovie({movie,onDeleteWatched}){
   
    return(
        <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button onClick={()=>onDeleteWatched(movie.title)} className="btn-delete">X</button>
        </div>
      </li>
    )
}