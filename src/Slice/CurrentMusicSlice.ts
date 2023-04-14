import { createSlice } from '@reduxjs/toolkit';
import { Music } from './MusicSlice';

interface State {
    currentMusic: Music | null;
}

export const CurrentMusicSlice = createSlice({
    name: 'CurrentMusicSlice',
    initialState: {
        currentMusic: null,
    },
    reducers: {
        setCurrentMusic: (state: State, action: { payload: Music }) => {
            state.currentMusic = action.payload;
        },
        clearCurrentMusic: (state: State) => {
            state.currentMusic = null;
        },
    },
});

export const { setCurrentMusic, clearCurrentMusic } = CurrentMusicSlice.actions;

export default CurrentMusicSlice.reducer;
