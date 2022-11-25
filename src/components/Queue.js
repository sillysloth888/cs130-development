import { Box, Typography, List, ListItem, Paper } from "@mui/material";

export default function Queue({ queue }) {
    const queueLength = {
        sec: queue.reduce(
            (totalLength, album) => 
                (totalLength + album.length.min * 60 + album.length.sec),
        0
    )
    }

   var displayLength = (<>{queueLength.sec} sec</>)
    
    if (queueLength.sec >= 3600) {
        queueLength["hr"] = Math.floor(queueLength.sec / 3600)
        queueLength["min"] = Math.floor((queueLength.sec % 3600) / 60)
        queueLength["sec"] = Math.round(queueLength.sec % 60)
        displayLength = (
            <>
                {queueLength.hr} hr {queueLength.min} min
            </>
        )
    } else if (queueLength.sec >= 60) {
        queueLength["min"] = Math.floor(queueLength.sec / 60)
        queueLength["sec"] = Math.round(queueLength.sec % 60)
        displayLength = (
            <>
                {queueLength.min} min {queueLength.sec} sec
            </>
        )
    }

    return (
        <Box>
            {queueLength.sec ? 
                (<Typography fontStyle="italic">
                    Runtime: {displayLength}
                 </Typography>):
                (<Typography fontStyle="italic">
                    Nothing in the queue!
                </Typography>)
            }       
            <List
                variant="outlined"
            >
                {queue.map((album, index) => (
                    <ListItem 
                        key={index}
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
        </Box>  
    )
}