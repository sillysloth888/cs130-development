import { 
    Button, 
    Card, 
    CardMedia, 
    CardContent,
    Typography, 
    CardActions} from "@mui/material"


export default function AlbumItem({ item, handleClick }) { 
    const { 
        id, 
        albumName,
        artists,
        date, 
        length, 
        totalTracks, 
        popularity, 
        explicit,
        imageSrc 
    } = item

    return (
        <Card sx={{ width: 1, height: 1 }}>
            <CardMedia 
                component='img'
                image={imageSrc}
                alt={`${albumName} album cover`}
            />
            <CardContent>
                        <Typography sx={{ 
                            fontSize: 'h6.fontSize', 
                            fontWeight: 'bold',
                            fontStyle: "italic"
                            }}
                        >
                            {albumName} 
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold',
                        }}>
                            {artists} • {date.substr(0, 4)}
                        </Typography>
                        <Typography>
                            {totalTracks} tracks, {length.min} min {length.sec} sec
                        </Typography>  
                </CardContent>  
                <CardActions>
                    <Button 
                        onClick={() => handleClick(item)}
                        color="secondary"
                    >Add to queue</Button>
                </CardActions>
        </Card>
    )}