import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';

export default configureStore({
  reducer: { filter: filterSlice },
});
