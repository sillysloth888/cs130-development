import { Box, Typography, List, ListItem, Paper, Icon, Button, Fab } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';

export default function Queue({ queue, handleRemoveQueue }) {
    const queueLength = {
        sec: queue.items.reduce(
            (totalLength, queueItem) => 
                (totalLength + queueItem.album.length.min * 60 + queueItem.album.length.sec),
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
                {queue.items.map((queueItem) => (
                    <ListItem 
                        key={queueItem.index}
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
                            src={queueItem.album.imageSrc}
                            alt={`${queueItem.album.albumName} album cover`}
                            sx={{
                                width: "6rem", 
                                height: "6rem"
                            }}
                        />
                        <Box sx={{
                            display: "flex", 
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: 1,
                            px: "2rem"
                        }}
                        >
                            <Typography sx={{
                                fontStyle:"italic"
                            }}>
                                {queueItem.album.albumName}
                            </Typography>
                            <Fab 
                                color="secondary" 
                                id={queueItem.album.name}
                                size="small"
                                aria-label="remove"
                                onClick={handleRemoveQueue(queueItem.index)}
                            >
                                <RemoveIcon />
                            </Fab>
                        </Box>
                        </Paper>
                    </ListItem>
                )
                )}
            </List>
        </Box>  
    )
}