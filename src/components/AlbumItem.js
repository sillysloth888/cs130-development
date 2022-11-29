import { 
    Button, 
    Card, 
    CardMedia, 
    CardContent,
    Typography, 
    CardActions} from "@mui/material"

 const AlbumItem = ({ item, handleClick }) => (
    <Card sx={{ width: 1, height: 1 }}>
        <CardMedia 
            component='img'
            image={item.imageSrc}
            alt={`${item.albumName} album cover`}
        />
        <CardContent>
                    {item.explicit ? (
                        <Typography 
                            fontSize="0.8rem" 
                            fontStyle="italic"
                            color="#6a6b6b"
                        >
                            EXPLICIT
                        </Typography>)
                        : (<></>)
                    }
                    <Typography sx={{ 
                        fontSize: 'h6.fontSize', 
                        fontWeight: 'bold',
                        fontStyle: "italic"
                        }}
                    >
                        {item.albumName} 
                    </Typography>
                    <Typography sx={{ 
                        fontSize: '1rem', 
                        fontWeight: 'bold',
                    }}>
                        {item.artists} • {item.date.substr(0, 4)}
                    </Typography>
                    <Typography>
                        {item.totalTracks} tracks, {item.length.min} min {item.length.sec} sec
                    </Typography>  
            </CardContent>  
            <CardActions>
                <Button 
                    onClick={() => handleClick(item)}
                    color="primary"
                >Add to queue</Button>
            </CardActions>
    </Card>
)

export default AlbumItem


