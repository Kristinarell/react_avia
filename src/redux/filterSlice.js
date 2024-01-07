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
      if (state.sort.id === action.payload.id) {
        state.sort = {}; // Если пользователь повторно нажал на ту же сортировку, сбросить состояние
      } else {
        state.sort = action.payload;
      }
    },
    setSelectedAirline: (state, action) => {
      const existingAirline = state.selectedAirlines.find(
        (selectedAirline) => selectedAirline.id === action.payload.id,
      );
      if (!existingAirline) {
        state.selectedAirlines.push(action.payload); // Если авиакомпания не выбрана, добавляем в массив
      } else {
        state.selectedAirlines = state.selectedAirlines.filter(
          (selectedAirline) => selectedAirline.id !== action.payload.id, // Если авиакомпания уже выбрана, удаляем
        );
      }
    },
    setTransfersQuantity: (state, action) => {
      const existingQuantity = state.transfersQuantity.find((quantity) => quantity.id === action.payload.id);
      if (!existingQuantity) {
        state.transfersQuantity.push(action.payload);
      } else {
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
