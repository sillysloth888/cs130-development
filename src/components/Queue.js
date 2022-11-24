import { Box, Typography, List, ListItem, Paper } from "@mui/material";

export default function Queue({ queue }) {
    console.log(queue)
    return (
        <List
            variant="outlined"
        >
            {queue.map(album => (
                <ListItem 
                    key={album.id}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            width: 1
                        }}
                    >
                    <Box 
                        component="img"
                        src={album.imageSrc}
                        alt={`${album.albumName} album cover`}
                        sx={{
                            width: "6rem", 
                            height: "6rem"
                        }}
                    />
                    <Box>
                        <Typography sx={{
                            fontStyle:"italic"
                        }}>
                            {album.albumName}
                        </Typography>
                        
                    </Box>
                    </Paper>
                </ListItem>
            )
            )}
        </List>
    )
}