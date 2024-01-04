import React, { useState } from 'react';

const PriceRangeSlider = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const index = event.target.dataset.index;

    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = value;
      return newRange;
    });
  };

  return (
    <div>
      <label>
        Price Range:
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[0]}
          data-index={0}
          onChange={handleSliderChange}
        />
        {priceRange[0]}
      </label>

      <label>
        -
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          data-index={1}
          onChange={handleSliderChange}
        />
        {priceRange[1]}
      </label>
    </div>
  );
};

export default PriceRangeSlider;
