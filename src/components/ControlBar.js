import { FormControl, InputLabel, MenuItem, TextField, Box, Slider, Typography, FormControlLabel, Checkbox, Button } from "@mui/material"
import { useState } from "react"

// slider omponent adapted from https://mui.com/material-ui/react-slider/
function RangeSlider( { min, max, rangeValue, handleRangeChange }) {
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
                min={min}
                max={max}
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
  

export default function ControlBar({ sortVal, handleSort, checked, handleChecked, minDate, maxDate, rangeValue, handleRangeChange, handleClear }) {
    const lengthFilterTypes = ["0-0.5", "0.5-1", "1-2", ">2"]
    return (
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
                {/* select component adapted from https://mui.com/material-ui/react-select/ */}
                <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: "9rem" }}
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
                <RangeSlider
                    min={parseInt(minDate)}
                    max={parseInt(maxDate)}
                    rangeValue={rangeValue}
                    handleRangeChange={handleRangeChange}
                />
                <FormControlLabel 
                    control={<Checkbox 
                        color="secondary" 
                        checked={checked}
                        onChange={handleChecked}
                />} 
                    label="Include Explicit" 
                />
                <Box>
                    {lengthFilterTypes.map(filterKey => (
                        <FormControlLabel 
                            control={<Checkbox 
                                color="secondary" 
                                checked={checked}
                                onChange={handleChecked}
                            />} 
                            label={filterKey}
                        />))}
                </Box>
            </Box>
            <Box sx={{
                alignSelf: "flex-end"
            }}>
                <Button
                    color="secondary"
                    onClick={handleClear}
                >
                    Clear all
                </Button>
            </Box>
        </Box>
    )
}