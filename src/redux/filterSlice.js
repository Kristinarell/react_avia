import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  sort: {},
  selectedAirlines: [],
  transfersQuantity: [],
  priceRange: [0, 200000],
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveSort: (state, action) => {
      state.sort = {};
      state.sort = action.payload;
    },

    setSelectedAirline: (state, action) => {
      const existingAirline = state.selectedAirlines.find(
        (selectedAirline) => selectedAirline.id === action.payload.id,
      );

      if (!existingAirline) {
        // Если авиакомпания не выбрана, добавляем в массив
        state.selectedAirlines.push(action.payload);
      } else {
        // Если авиакомпания уже выбрана, удаляем из массива
        state.selectedAirlines = state.selectedAirlines.filter(
          (selectedAirline) => selectedAirline.id !== action.payload.id,
        );
      }
    },

    setTransfersQuantity: (state, action) => {
      const existingQuantity = state.transfersQuantity.find((quantity) => quantity.id === action.payload.id);

      if (!existingQuantity) {
        // Если количество пересадок не выбрано, добавляем в массив
        state.transfersQuantity.push(action.payload);
      } else {
        // Если количество пересадок уже выбрано, удаляем из массива
        state.transfersQuantity = state.transfersQuantity.filter(
          (quantity) => quantity.id !== action.payload.id,
        );
      }
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const {
  setActiveSort,
  setSelectedAirline,
  setPriceRange,
  setTransfersQuantity,
  removeSelectedAirline,
} = filterSlice.actions;
export default filterSlice.reducer;
