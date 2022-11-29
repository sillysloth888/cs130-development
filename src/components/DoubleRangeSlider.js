import { 
    Box, 
    Slider, 
    Typography
} from "@mui/material"

// component adapted from https://mui.com/material-ui/react-slider/
const DoubleRangeSlider = ({ min, max, rangeValue, handleRangeChange }) =>  {
    const valuetext = (value) => (`${value}°C`)
    
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
                color="primary"
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

export default DoubleRangeSlider