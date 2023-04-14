import { Button, Input, Modal, Select, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import "../index.css";
import { HeartFilled, HeartOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Music, setMusics } from '../Slice/MusicSlice';
import musicsJson from '../static/data.json';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../Slice/FavoriteSlice';
import { setCurrentMusic } from '../Slice/CurrentMusicSlice';
import { updatePlaylist, Playlist } from '../Slice/PlaylistSlice';

const { Title } = Typography;

const Favorite = () => {

    const dispatch = useDispatch();

    let count = 0;
    const currentMusic = useSelector((state: any) => state.CurrentMusicSlice.currentMusic);
    const playlists = useSelector((state: any) => state.PlaylistSlice.playlists);
    const favoriteMusicList = useSelector((state: any) => state.FavoriteSlice.favorites);
    const favoriteList = useSelector((state : any) => state.FavoriteSlice.favorites)


    const columns: ColumnsType<Music> = [
        {
            title: "#",
            dataIndex: "numero",
            key: "numero",
            render: () => <a style={{ color: "white" }}>{count++}</a>,
        },

        {
            title: '',
            dataIndex: 'favoris',
            key: 'action',
            render: (text: any, record: Music) => {
                const isFavorite = favoriteMusicList && favoriteMusicList.find((item: any) => item === record) !== undefined;
                return isFavorite ? (
                    <HeartFilled
                        style={{ color: 'green', fontSize: '20px' }}
                        onClick={() => {
                            dispatch(removeFavorite(record));
                        }}
                    />
                ) : (
                    <HeartOutlined
                        style={{ color: 'green', fontSize: '20px' }}
                        onClick={() => {
                            dispatch(addFavorite(record));
                        }}
                    />
                );
            },
        },
        {
            title: "title",
            dataIndex: "title",
            key: "title",
            sorter: (a: Music, b: Music) => a.title.localeCompare(b.title),
        },
        {
            title: "genre",
            dataIndex: "genre",
            key: "genre",
            sorter: (a: Music, b: Music) => a.genre.localeCompare(b.genre),
        },
        {
            title: "year",
            dataIndex: "year",
            key: "year",
            sorter: (a: Music, b: Music) => a.year - b.year,
        },
        {
            title: "popularity",
            dataIndex: "popularity",
            key: "popularity",
            sorter: (a: Music, b: Music) => a.popularity - b.popularity,
        },
        {
            title: "duration",
            dataIndex: "duration",
            key: "duration",
            sorter: (a: Music, b: Music) => a.duration - b.duration,
        },
        {
            title: "Ajouter à une playlist",
            key: "action",
            render: (text: any, record: Music) => (
                <Button type="primary" onClick={() => addToPlaylist(record)}>
                    Ajouter
                </Button>
            ),
        },
        {
            title: "Ecouter",
            dataIndex: "action",
            key: "action",
            render: (text: any, record: Music) => (
                <Button type="primary" onClick={() => handleAddToCurrentMusic(record)}>Ecouter</Button>
            )
        },


    ];

    const handleAddToCurrentMusic = (music: Music) => {
        dispatch(setCurrentMusic(music));
    };

    const handleAddToPlaylist = (music: Music, playlistId: string) => {
        const playlist = playlists.find((playlist: Playlist) => playlist.id === playlistId);
        if (playlist) {
            const updatedPlaylist = { ...playlist, musics: [...playlist.musics, music] };
            dispatch(updatePlaylist(updatedPlaylist));
        }
    };




    const handleChange = (value: any) => {
        console.log(`selected ${value}`);
    };

   
    const addToPlaylist = (music: Music) => {
        Modal.confirm({
            title: "Ajouter à une playlist",
            content: (
                <Select
                    defaultValue=""
                    style={{ width: "100%" }}
                    onChange={(value: string) => handleAddToPlaylist(music, value)}
                    options={
                        playlists.map((playlist: Playlist) => ({
                            value: playlist.id,
                            label: playlist.name
                        }))
                    }
                />

            ),
            onOk() { },
        });
    };



    return (
        <div className="content">
            <div className='topPlaylist'>
                <div className='topPlaylistLeft'></div>
                <div className='topPlaylistRight'><Title style={{ color: 'white', fontSize: '96px' }}>Favorite Song</Title></div>
            </div>
            <div className='centerPlaylist'>
                <Input style={{ width: "256px", backgroundColor: "#FFFFFF", borderRadius: "26px" }} placeholder="Recherche" prefix={<SearchOutlined />} />
                <Select
                    defaultValue="lucy"
                    style={{
                        width: 120,
                        borderRadius: "26px",
                        backgroundColor: "#FFFFFF"
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'disabled',
                            label: 'Disabled',
                            disabled: true,
                        },
                    ]}
                />
            </div>
            <div className='bottomPlaylist'>
                <Table columns={columns} dataSource={favoriteList} pagination={false} style={{ backgroundColor: 'transparent' }} />
            </div>
        </div>
    );
};

export default Favorite;
