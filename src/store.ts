import { configureStore } from '@reduxjs/toolkit';
import MusicSlice from './Slice/MusicSlice';
import PlaylistSlice from './Slice/PlaylistSlice';
import FavoriteSlice from './Slice/FavoriteSlice';
import CurrentMusicSlice from './Slice/CurrentMusicSlice';


export default configureStore({
    reducer: {
          MusicSlice : MusicSlice,
          PlaylistSlice  : PlaylistSlice,
          FavoriteSlice : FavoriteSlice,
          CurrentMusicSlice : CurrentMusicSlice
    },
});
