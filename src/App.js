import { useState } from "react";
import spotifyData from "./assets/spotify-data.json"
import AlbumItem from './components/AlbumItem'
import ControlBar from "./components/ControlBar"
import Queue from './components/Queue'
import Grid from '@mui/material/Unstable_Grid2'
import { 
  createTheme, 
  CssBaseline, 
  ThemeProvider,
} from "@mui/material"

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      type: 'dark',
      primary: {
        main: "#8d54ff",
        contrastText: "#fff",
      },
    },
  })

  const makeAlbumObj = (item) => {
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
      explicit: item.tracks.items.some(track =>track.explicit),
      imageSrc: item.images[0].url
    }
  }

  const handleAddQueue = (albumObj) => {
    setQueue({
      nextIndex: queue.nextIndex + 1, 
      items: [...queue.items, {index: queue.nextIndex, album: albumObj}]})
  }
  
  const handleRemoveQueue = (index) => () => {
    setQueue({
      nextIndex: queue.nextIndex,
      items: queue.items.filter(queueItem => index !== queueItem.index)
    })
  }

  const handleSort = event => setSort(event.target.value)

  const handleRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setRangeValue([Math.min(newValue[0], rangeValue[1] - minDistance), rangeValue[1]]);
    } else {
      setRangeValue([rangeValue[0], Math.max(newValue[1], rangeValue[0] + minDistance)]);
    }
  }

  const handleChecked = event => {
    setChecked(event.target.checked)
  }

  const handleClear = () => {
    filteredAlbums = Array.from(albums)
    setRangeValue([minDate, maxDate])
    setSort("")
    setChecked(true)
  }

  const albums = spotifyData.albums.map(album => makeAlbumObj(album)).sort(
    (a, b) =>  a.albumName > b.albumName ? 1 : -1) 
  var filteredAlbums = Array.from(albums)
  // adapted from https://stackoverflow.com/questions/8864430/compare-javascript-array-of-objects-to-get-min-max
  const minDistance = 5
  const minDate = parseInt(albums.reduce(function(prev, curr) {
      return prev.date < curr.date ? prev : curr;
  }).date.substr(0, 4))
  const maxDate = parseInt(albums.reduce(function(prev, curr) {
      return prev.date > curr.date ? prev : curr;
  }).date.substr(0, 4))

  const [queue, setQueue] = useState({nextIndex: 0, items: []})
  const [checked, setChecked] = useState(true)
  const [sort, setSort] = useState("")
  const [rangeValue, setRangeValue] = useState([minDate, maxDate])
  
  if (!checked) {
    filteredAlbums = filteredAlbums.filter((album) => (
      !album.explicit
    ))
  }

  filteredAlbums = filteredAlbums.filter((album) => (
    parseInt(album.date) >= rangeValue[0]) & (parseInt(album.date) <= rangeValue[1]
    )
  )

  if (sort === "newest") {
    filteredAlbums.sort((a, b) => a.date < b.date ? 1 : -1) 
  } else if (sort === "oldest") {
    filteredAlbums.sort((a, b) => a.date > b.date ? 1 : -1) 
  } else if (sort === "popular") {
    filteredAlbums.sort((a, b) => a.popularity > b.popularity ? -1 : 1) 
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Grid container spacing={4} sx={{px: 12, py: 2}}>
        <Grid xs={8} spacing={10}>
          <h1>Albums</h1> 
          <ControlBar 
            sortVal={sort} 
            handleSort={handleSort}
            checked={checked}
            handleChecked={handleChecked}
            minDate={minDate}
            maxDate={maxDate}
            rangeValue={rangeValue}
            handleRangeChange={handleRangeChange}
            handleClear={handleClear}
          />
          <Grid container spacing={2}>
            {filteredAlbums.map((item, index) => ( 
              <Grid key={index} xs={4}>
                <AlbumItem 
                  item={item}
                  handleClick={handleAddQueue}
                />
              </Grid> 
            ))}
          </Grid>
        </Grid>
        <Grid xs pt={8}>
          <Queue 
              queue={queue}
              handleRemoveQueue={handleRemoveQueue}
          />
        </Grid>
    </Grid>
    </ThemeProvider> 
  )
}

export default App