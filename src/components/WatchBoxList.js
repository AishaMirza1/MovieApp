import WatchBoxMovie from "./WatchBoxMovie"
export default function WatchBoxList({watched}){
    return(
        <ul className="list">
        {watched.map((movie) => (
          <WatchBoxMovie movie={movie}/>
        ))}
      </ul>
    )
}