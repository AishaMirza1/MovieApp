import WatchBoxMovie from "./WatchBoxMovie"
export default function WatchBoxList({watched,onDeleteWatched}){
    return(
        <ul className="list">
        {watched.map((movie,index) => (
          <WatchBoxMovie movie={movie} onDeleteWatched={onDeleteWatched} key={index}/>
        ))}
      </ul>
    )
}