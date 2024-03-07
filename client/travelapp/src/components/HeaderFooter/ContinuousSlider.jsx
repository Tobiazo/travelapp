import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useFilter } from "../FilterProvider";


function valuetext(value) {
  return `${value}°C`;
}

export default function ContinuousSlider() {
  const {filter, setFilter} = useFilter()

  const [value, setValue] = React.useState([0, 10]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newFilter = [...filter]
    newFilter[0] = newValue
    setFilter(newFilter)
  };

  const marks = [
    {
      value: 1,
      label: '1',
    },
 
    {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5',
      },
      
   
      {
          value: 6,
          label: '6',
        },
        {
          value: 7,
          label: '7',
        },
        {
          value: 8,
          label: '8',
        },
        {
          value: 9,
          label: '9',
        },
        {
          value: 10,
          label: '10',
        }
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
        max={10}
        step={0.01}
        marks={marks}
      />
    </Box>
  );
}