import React, { useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../redux/filterSlice';

const PriceRangeSlider = () => {
  const priceRange = useSelector((state) => state.filter.priceRange);
  const dispatch = useDispatch();

  const [debouncedValue, setDebouncedValue] = useState(priceRange);

  const handleChange = useCallback(
    (event, newValue) => {
      setDebouncedValue(newValue);
    },
    [setDebouncedValue],
  );

  const handleSliderChange = useCallback(() => {
    dispatch(setPriceRange(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <Box>
      <p className="slider_caption">Ценовой диапазон</p>
      <Slider
        value={debouncedValue}
        onChange={handleChange}
        onChangeCommitted={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={200000}
      />
      <p className="minPrice">{debouncedValue[0]}</p>
      <p className="maxPrice"> {debouncedValue[1]}</p>
    </Box>
  );
};

export default PriceRangeSlider;
