import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../redux/filterSlice';

const PriceRangeSlider = () => {
  const priceRange = useSelector((state) => state.filter.priceRange);
  const dispatch = useDispatch();

  const [priceRangeValue, setPriceRangeValue] = useState(priceRange);

  return (
    <div className="sliderWrapper">
      <Box>
        <p className="slider_caption">Ценовой диапазон</p>
        <Slider
          value={priceRangeValue}
          onChange={(event, newValue) => {
            setPriceRangeValue(newValue);
          }}
          onChangeCommitted={() => {
            dispatch(setPriceRange(priceRangeValue));
          }}
          valueLabelDisplay="auto"
          min={0}
          max={200000}
        />
        <p className="minPrice">{priceRangeValue[0]}</p>
        <p className="maxPrice"> {priceRangeValue[1]}</p>
      </Box>
    </div>
  );
};

export default PriceRangeSlider;
