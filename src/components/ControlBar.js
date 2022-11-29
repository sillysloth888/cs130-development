import { 
    FormControl, 
    MenuItem, 
    TextField, 
    Box, 
    FormControlLabel, 
    Checkbox, 
    Button
} from "@mui/material"
import DoubleRangeSlider from "./DoubleRangeSlider"

const ControlBar = ({ 
    sortVal, 
    handleSort, 
    checked, 
    handleChecked, 
    minDate, 
    maxDate, 
    rangeValue, 
    handleRangeChange, 
    handleClear 
}) => (
    // adapted from https://mui.com/material-ui/react-select/
    <Box sx={{
        display: "flex",
        flexDirection: "column", 
    }}
    >
        <Box 
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "3rem"
            }}
        >
            <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: "9rem" }}
            >
                <TextField
                    select
                    value={sortVal}
                    onChange={handleSort}
                    label="Sort By"
                    color="primary"
                >
                    <MenuItem value={"newest"}>Newest</MenuItem>
                    <MenuItem value={"oldest"}>Oldest</MenuItem>
                    <MenuItem value={"popular"}>Most Popular</MenuItem>
                </TextField>
            </FormControl>
            <DoubleRangeSlider
                min={parseInt(minDate)}
                max={parseInt(maxDate)}
                rangeValue={rangeValue}
                handleRangeChange={handleRangeChange}
            />
            <FormControlLabel 
                control={
                    <Checkbox 
                        color="primary" 
                        checked={checked}
                        onChange={handleChecked}
                    />
                } 
                label="Include Explicit" 
            />
        </Box>
        <Box sx={{
            alignSelf: "flex-end"
        }}>
            <Button
                color="primary"
                onClick={handleClear}
            >
                Clear all
            </Button>
        </Box>
    </Box>
)

export default ControlBar