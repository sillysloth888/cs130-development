import { 
    Box, 
    Typography, 
    Paper,  
    Fab,
    Button
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';

const QueueItem = ({ queueItem, handleRemoveQueue}) => (
    <Paper
        sx={{
            display: "flex",
            alignItems: "space-between",
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
            <Button 
                aria-label="remove" 
                sx={{
                    minWidth: "1rem",
                    minHeight: "1rem",
                    borderRadius: "100%",
                    padding: "0.4rem 0.4rem"
                }}
                onClick={handleRemoveQueue(queueItem.index)}
            >
                <RemoveIcon />
            </Button>
            {/* <Fab 
                color="primary" 
                aria-label="remove"
                
                
            >
                <RemoveIcon />
            </Fab> */}
        </Box>
    </Paper>
)

export default QueueItem