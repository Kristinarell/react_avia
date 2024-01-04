import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  sort: {},
  airline: [],
  transfersQuantity: [],
  priceRange: { minPrice: 0, maxPrice: 1000000 },
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveSort: (state, action) => {
      state.sort = {};
      state.sort = action.payload;
    },

    setAirline: (state, action) => {
      state.airline.push(action.payload);
    },
    setTransfersQuantity: (state, action) => {
      state.transfersQuantity.push(action.payload);
    },
    setPriceRange: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const { setActiveSort, setAirline, setPriceRange, setTransfersQuantity } = filterSlice.actions;
export default filterSlice.reducer;
