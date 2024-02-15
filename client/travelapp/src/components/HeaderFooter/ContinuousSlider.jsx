import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function ContinuousSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 1,
      label: '1.0',
    },
 
    {
        value: 2,
        label: '2.0',
      },
      {
        value: 3,
        label: '3.0',
      },
      {
        value: 4,
        label: '4.0',
      },
      {
        value: 5,
        label: '5.0',
      },
]

  return (
    
    <Box sx={{ width: 300 }}>
    
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
        min={1}
        max={5}
        step={0.25}
        marks={marks}
      />
    </Box>
  );
}