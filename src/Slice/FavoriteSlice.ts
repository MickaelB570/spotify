import { createSlice } from '@reduxjs/toolkit';
import { Music } from './MusicSlice';

interface State {
  favorites: Music[];
}

export const FavoriteSlice = createSlice({
  name: 'FavoriteSlice',
  initialState: {
    favorites: [],
  } as State,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      const index = state.favorites.findIndex(
        (favorite) => favorite.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = FavoriteSlice.actions;

export default FavoriteSlice.reducer;
