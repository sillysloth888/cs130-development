import { useState } from "react";
import spotifyData from "./assets/spotify-data.json";
import AlbumItem from './components/AlbumItem'
import Queue from './components/Queue'
import Grid from '@mui/material/Unstable_Grid2'
import { Box, Typography } from "@mui/material"

// spotifyData.albums.forEach((item) => {
//   item.image = process.env.PUBLIC_URL + "/" + item.images[0];
// });

function App() {
  const [queue, setQueue] = useState([])
  function makeAlbumObj(item) {
    const lengthSec = item.tracks.items.reduce(
      (totalLength, track) => totalLength + (track.duration_ms / 1000),
      0
    )
    return {
      id: item.id,
      albumName: item.name, 
      artists: item.artists.map(artist => (artist.name)), 
      year: item.release_date.substr(0, 4), 
      length: {
        min: Math.floor(lengthSec / 60), 
        sec: Math.round(lengthSec % 60)
      },
      totalTracks: item.total_tracks,
      popularity: item.popularity, 
      imageSrc: item.images[0].url
    }
  }

  function handleAddQueue(albumObj) {
    setQueue([...queue, albumObj])
  }

  return (
    <Grid container spacing={4} sx={{px: 12, py: 2}}>
      <Grid xs={9} spacing={10}>
        <h1>Albums</h1> 
        <Grid container spacing={2}>
          {spotifyData.albums.map((item, index) => ( 
            <Grid key={index} xs={4}>
              <AlbumItem 
                item={makeAlbumObj(item)}
                handleClick={handleAddQueue}
              />
            </Grid> 
          ))}
        </Grid>
      </Grid>
      <Grid xs>
        <h2>Queue</h2>
        <Queue queue={queue}/>
      </Grid>
    </Grid>
  );
}

export default App;
