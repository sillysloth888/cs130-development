import { 
    Box, 
    Typography, 
    List, 
    ListItem, 
} from "@mui/material";
import QueueItem from "./QueueItem";

const Queue = ({ queue, handleRemoveQueue }) => {
    const queueLength = {
        sec: queue.items.reduce(
            (totalLength, queueItem) => 
                (totalLength + queueItem.album.length.min * 60 + queueItem.album.length.sec),
        0
    )}

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
            <h2>Queue</h2>
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
                        <QueueItem 
                            queueItem={queueItem}
                            handleRemoveQueue={handleRemoveQueue}
                        /> 
                    </ListItem>
                ))}
            </List>
        </Box>  
    )
}

export default Queue