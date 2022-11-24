import { 
    Button, 
    Card, 
    CardMedia, 
    CardContent,
    Typography, 
    Box,
    alertTitleClasses,
    CardActions} from "@mui/material"


export default function AlbumItem({ item, handleClick }) { 
    const { 
        id, 
        albumName,
        artists,
        year, 
        length, 
        totalTracks, 
        popularity, 
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
                            {artists} • {year}
                        </Typography>
                        <Typography>
                            {totalTracks} tracks, {length.min} min {length.sec} sec
                        </Typography>  
                </CardContent>  
                <CardActions>
                    <Button onClick={() => handleClick(item)}>Add to queue</Button>
                </CardActions>
        </Card>
    )}