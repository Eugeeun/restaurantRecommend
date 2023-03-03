import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

const position = createSlice({
  name: 'positionReducer',
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setCurrPosition: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

const restaurants = createSlice({
  name: 'restaurantsReducer',
  initialState: [],
  reducers: {
    setNearRestaurants: (state, action) => {
      return [...action.payload];
    },
  },
});

const allReducer = combineReducers({
  position: position.reducer,
  restaurants: restaurants.reducer,
});

const store = configureStore({ reducer: allReducer });

export const { setCurrPosition } = position.actions;
export const { setNearRestaurants } = restaurants.actions;
export default store;
