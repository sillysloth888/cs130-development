import { FormControl, InputLabel, MenuItem, TextField, Box, Slider, Typography, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"

// component adapted from https://mui.com/material-ui/react-slider/
function DateSlider( { minDate, maxDate, rangeValue, handleRangeChange }) {
    function valuetext(value) {
        return `${value}°C`;
      }

    return (
        <Box
            sx={{
                flex: "1 1 15rem",
                minWidth: "10rem", 
                maxWidth: "15rem"
            }}
        >
            <Typography gutterBottom ml={-1}>Release Date</Typography>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={rangeValue}
                onChange={handleRangeChange}
                getAriaValueText={valuetext}
                min={minDate}
                max={maxDate}
                disableSwap
                color="secondary"
                valueLabelDisplay="off"
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -1.18,
                }}
            >
                <Typography fontSize={14}>{rangeValue[0]}</Typography>
                <Typography fontSize={14}>{rangeValue[1]}</Typography>
            </Box>
        </Box>
    )
}
  

export default function ControlBar({ albums, sortVal, handleSort, handleChecked, minDate, maxDate, rangeValue, handleRangeChange }) {
    return (
        // adapted from https://mui.com/material-ui/react-select/
        <Box 
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "3rem"
            }}
        >
            <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            >
            <TextField
                select
                value={sortVal}
                onChange={handleSort}
                label="Sort By"
                color="secondary"
            >
                <MenuItem value={"newest"}>Newest</MenuItem>
                <MenuItem value={"oldest"}>Oldest</MenuItem>
                <MenuItem value={"popular"}>Most Popular</MenuItem>
            </TextField>
        </FormControl>
        <DateSlider
            minDate={parseInt(minDate)}
            maxDate={parseInt(maxDate)}
            rangeValue={rangeValue}
            handleRangeChange={handleRangeChange}
        />
         <FormControlLabel 
            control={<Checkbox 
                color="secondary" 
                defaultChecked
                onChange={handleChecked}
            />} 
            label="Explicit Albums" />
    </Box>
    )
}