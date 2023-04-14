import { createSlice } from '@reduxjs/toolkit';
import { Music } from './MusicSlice';

interface State {
    playlists: Playlist[];
}

export interface Playlist {
    id: string;
    name: string;
    musics: Music[];
}

const randomId = () => (Math.random() + 1).toString(36).substring(7);

export const PlaylistSlice = createSlice({
    name: 'PlaylistSlice',
    initialState: {
        playlists: [],
    },
    reducers: {
        setPlaylists: (state: State, action: { payload: Playlist[] }) => {
            state.playlists = action.payload;
        },
        addPlaylist: (state: State, action: { payload: Omit<Playlist, 'id'> }) => {
            const newPlaylist = {
                id: randomId(),
                songs: [],
                ...action.payload,
            };
            state.playlists.push(newPlaylist);
        },
        updatePlaylist: (state: State, action: { payload: Playlist }) => {
            const index = state.playlists.findIndex((playlist) => playlist.id === action.payload.id);
            if (index !== -1) {
                state.playlists[index] = action.payload;
            }
        },
        deletePlaylist: (state: State, action: { payload: string }) => {
            const index = state.playlists.findIndex((playlist) => playlist.id === action.payload);
            if (index !== -1) {
                state.playlists.splice(index, 1);
            }
        },
        addSongToPlaylist: (state: State, action: { payload: { playlistId: string; song: Music } }) => {
            const playlist = state.playlists.find((playlist) => playlist.id === action.payload.playlistId);
            if (playlist) {
                playlist.musics.push(action.payload.song);
            }
        },
        removeSongFromPlaylist: (state: State, action: { payload: { playlistId: string; songId: string } }) => {
            const playlist = state.playlists.find((playlist) => playlist.id === action.payload.playlistId);
            if (playlist) {
                const index = playlist.musics.findIndex((song) => song.id === action.payload.songId);
                if (index !== -1) {
                    playlist.musics.splice(index, 1);
                }
            }
        },
    },
});

export const {
    setPlaylists,
    addPlaylist,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
} = PlaylistSlice.actions;

export default PlaylistSlice.reducer;