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
      <Typography gutterBottom>Ценовой диапазон</Typography>
      <Slider
        value={debouncedValue}
        onChange={handleChange}
        onChangeCommitted={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={200000}
      />
      <Typography>Минимальная цена: {debouncedValue[0]}</Typography>
      <Typography>Максимальная цена: {debouncedValue[1]}</Typography>
    </Box>
  );
};

export default PriceRangeSlider;
