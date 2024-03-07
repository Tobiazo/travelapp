import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function TempSlider() {
  const [value, setValue] = React.useState([-20, 58]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 0,
      label: '0°C',
    },
 
      {
        value: 58,
        label: '58°C',
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
        min={-20}
        max={58}
        marks={marks}
      />
    </Box>
  );
}