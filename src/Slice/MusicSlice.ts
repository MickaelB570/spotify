import { createSlice } from '@reduxjs/toolkit';

interface State {
    musics: Music[];
}

export interface Music {
    id: string;
    title: string;
    artist: string;
    genre: string;
    year: number;
    duration: number;
    popularity: number;
}

const randomId = () => (Math.random() + 1).toString(36).substring(7);

export const MusicSlice = createSlice({
    name: 'MusicSlice',
    initialState: {
        musics: [],
    },
    reducers: {
        setMusics: (state: State, action: { payload: Music[] }) => {
            state.musics = action.payload;
        },
        addMusic: (state: State, action: { payload: Omit<Music, 'id'> }) => {
            const newMusic = {
                id: randomId(),
                ...action.payload,
            };
            state.musics.push(newMusic);
        }
    },
});

export const { setMusics, addMusic} = MusicSlice.actions;

export default MusicSlice.reducer;