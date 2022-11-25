import { useState } from "react";
import spotifyData from "./assets/spotify-data.json"
import AlbumItem from './components/AlbumItem'
import ControlBar from "./components/ControlBar"
import Queue from './components/Queue'
import Grid from '@mui/material/Unstable_Grid2'
import { Box, createTheme, CssBaseline, Paper, ThemeProvider, Typography } from "@mui/material"

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      type: 'dark',
      primary: {
        main: '#1f1e21',
        contrastText: "#8d54ff",
      },
      secondary: {
        main: '#8d54ff',
        contrastText: "#8d54ff"
      },
    },
  })

  function makeAlbumObj(item) {
    const lengthSec = item.tracks.items.reduce(
      (totalLength, track) => totalLength + (track.duration_ms / 1000),
      0
    )
    return {
      id: item.id,
      albumName: item.name, 
      artists: item.artists.map(artist => (artist.name)), 
      date: item.release_date,
      length: {
        min: Math.floor(lengthSec / 60), 
        sec: Math.round(lengthSec % 60)
      },
      totalTracks: item.total_tracks,
      popularity: item.popularity, 
      explicit: item.explicit,
      imageSrc: item.images[0].url
    }
  }

  function handleAddQueue(albumObj) {
    setQueue([...queue, albumObj])
  }

  const handleSort = event => setSort(event.target.value)

  const handleRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRangeValue([Math.min(newValue[0], rangeValue[1] - minDistance), rangeValue[1]]);
    } else {
      setRangeValue([rangeValue[0], Math.max(newValue[1], rangeValue[0] + minDistance)]);
    }
  }

  var albums = spotifyData.albums.map(album => makeAlbumObj(album))
  // adapted from https://stackoverflow.com/questions/8864430/compare-javascript-array-of-objects-to-get-min-max
  const minDate = parseInt(albums.reduce(function(prev, curr) {
      return prev.date < curr.date ? prev : curr;
  }).date.substr(0, 4))
  const maxDate = parseInt(albums.reduce(function(prev, curr) {
      return prev.date > curr.date ? prev : curr;
  }).date.substr(0, 4))
  const minDistance = 5

  const [queue, setQueue] = useState([])
  const [sort, setSort] = useState("")

  if (sort === "newest") {
    albums.sort((a, b) => a.date < b.date ? 1 : -1) 
  } else if (sort === "oldest") {
    albums.sort((a, b) => a.date > b.date ? 1 : -1) 
  } else if (sort === "popular") {
    albums.sort((a, b) => a.popularity > b.popularity ? -1 : 1) 
  }

  const [rangeValue, setRangeValue] = useState([minDate, maxDate]);
  albums = albums.filter((album) => (
    parseInt(album.date) >= rangeValue[0]) & (parseInt(album.date) <= rangeValue[1]
    )
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Grid container spacing={4} sx={{px: 12, py: 2}}>
      <Grid xs={8} spacing={10}>
        <h1>Albums</h1> 
        <ControlBar 
          albums={albums}
          sortVal={sort} 
          handleSort={handleSort}
          minDate={minDate}
          maxDate={maxDate}
          rangeValue={rangeValue}
          handleRangeChange={handleRangeChange}
        />
        <Grid container spacing={2}>
          {albums.map((item, index) => ( 
            <Grid key={index} xs={4}>
              <AlbumItem 
                item={item}
                handleClick={handleAddQueue}
              />
            </Grid> 
          ))}
        </Grid>
      </Grid>
        <Grid xs>
          <h2>Queue</h2>
          <Queue 
            queue={queue}
          />
        </Grid>
    </Grid>
    </ThemeProvider> 
  );
}

export default App;
