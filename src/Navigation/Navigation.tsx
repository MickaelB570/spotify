import React, { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeartFilled, HomeFilled, PlusSquareFilled } from '@ant-design/icons';
import { setMusics } from '../Slice/MusicSlice';
import { useDispatch, useSelector } from 'react-redux';
import musicsJson from '../static/data.json';
import { setPlaylists } from '../Slice/PlaylistSlice';
import { Playlist } from '../Slice/PlaylistSlice';

const Navigation = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>('');
    const [visible, setVisible] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState<string>('');

    const randomId = () => (Math.random() + 1).toString(36).substring(7);
    const playlists = useSelector((state: any) => state.PlaylistSlice.playlists);

    const musics = musicsJson.map((music: any) => ({
        id: randomId(),
        ...music,
    }));

    dispatch(setMusics(musics));

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location]);

    const white = { color: "white" };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        if (newPlaylistName) {
            const newPlaylist: Playlist = {
                id: randomId(),
                name: newPlaylistName,
                musics: [],
            };
            dispatch(setPlaylists([...playlists, newPlaylist]));
            handleCancel();
        }
    };

    const handleCancel = () => {
        setVisible(false);
        setNewPlaylistName('');
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlaylistName(e.target.value);
    };

    return (
        <div className="menu">
            <div style={{ margin: 15 }}><img height={48} src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" /></div>
            <Link to={"/home"}><Button   className='gros-button-menu' size='large' type="primary" icon={<HomeFilled />}>Home</Button></Link>
            <Button onClick={showModal} className='gros-button-menu' size='large' type="primary" icon={<PlusSquareFilled />}>Create Playlist </Button>
            <Link to={"/favorite"}><Button size='large' className='gros-button-menu gros-button-menu-3' type="primary" icon={<HeartFilled />}>Liked Songs</Button></Link>
            {playlists.map((playlist: any, index: number) => (
                <Link to={`playlist/${playlist.id}`}><Button key={index} style={white} type="text">{playlist.name}</Button></Link>
            ))}

            <Modal
                visible={visible}
                title="Create Playlist"
                okText="Create"
                cancelText="Cancel"
                onCancel={handleCancel}
                onOk={handleOk}
                style={{color : "black" }}
            >
                <Input value={newPlaylistName} onChange={handleOnChange} />
            </Modal>
        </div>
    );
};

export default Navigation;
