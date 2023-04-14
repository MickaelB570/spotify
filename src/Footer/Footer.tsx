import React, { useEffect, useState } from 'react';
import { Button, Divider, Layout, Menu, Progress, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuInfo } from 'rc-menu/lib/interface';
import { AudioOutlined, BackwardFilled, BranchesOutlined, HeartFilled, HeartOutlined, HomeFilled, MenuUnfoldOutlined, PauseCircleFilled, PicCenterOutlined, PlayCircleFilled, PlusSquareFilled, RetweetOutlined, ShrinkOutlined, SoundOutlined, StepForwardFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../Slice/FavoriteSlice';



const { Title } = Typography;


const Footer = () => {
    const white = { color: "white" };
    const currentMusic = useSelector((state: any) => state.CurrentMusicSlice.currentMusic);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState<number | string | null>(null);
    const durationInSecs = currentMusic?.duration ?? 0;
    const favoriteMusicList = useSelector((state: any) => state.FavoriteSlice.favorites);
    const dispatch = useDispatch();
    const isFavorite = favoriteMusicList && favoriteMusicList.find((item: any) => item === currentMusic?.id) !== undefined;


    const handlePlayClick = () => {
        setProgress(0);
        setIsPlaying(true);
        const newIntervalId = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + 1;
            if (newProgress >= 100) {
              clearInterval(newIntervalId);
              setIsPlaying(false);
            }
            return newProgress;
          });
        }, durationInSecs / 100) as unknown as number;
        setIntervalId(newIntervalId);
      };
      

    const handlePauseClick = () => {
        setIsPlaying(false);

        if (intervalId) {
            clearInterval(intervalId);
        }
    };




    return (
        <div className="footer">
            <div className='left'>
                <div className='footer-50' style={white}>
                    <div>Top 50</div>
                </div>
                <div>
                    <Title level={5} style={white}>{currentMusic?.title ?? ''}</Title>
                    <p style={white}>{currentMusic?.artist ?? ''}</p>
                </div>
                <div>
                    {isFavorite ? (
                        <HeartFilled
                            style={{ color: 'green', fontSize: '20px' }}
                            onClick={() => {
                                dispatch(removeFavorite(currentMusic.id));
                            }}
                        />
                    ) : (
                        <HeartOutlined
                            style={{ color: 'green', fontSize: '20px' }}
                            onClick={() => {
                                dispatch(addFavorite(currentMusic.id));
                            }}
                        />
                    )}
                </div>

            </div>
            <div className='center'>
                <div className='playerButton'>
                    <Button type="primary" icon={<BranchesOutlined style={{ color: 'white', fontSize: '24px' }} />} className="button-transparent"></Button>
                    <Button type="primary" icon={<BackwardFilled style={{ color: 'white', fontSize: '24px' }} />} className="button-transparent"></Button>
                    {isPlaying ? (
                        <Button type="primary" icon={<PauseCircleFilled style={{ color: 'white', fontSize: '24px' }} />} className="button-transparent" onClick={handlePauseClick}></Button>
                    ) : (
                        <Button type="primary" icon={<PlayCircleFilled style={{ color: 'white', fontSize: '24px' }} />} className="button-transparent" onClick={handlePlayClick}></Button>
                    )}                    <Button type="primary" icon={<StepForwardFilled style={{ color: 'white', fontSize: '24px' }} />} className="button-transparent"></Button>
                    <Button type="primary" icon={<RetweetOutlined style={{ color: 'white', fontSize: '24px' }} />} className="button-transparent"></Button>
                </div>
                <div>
                    <p style={white}>0:00</p>
                    <Progress style={{ marginLeft: "5px" }} percent={progress} showInfo={false} strokeColor={'#ccc'} trailColor={"#535353"} />
                    <p style={white}>{ currentMusic?.duration / 60 }</p>
                </div>
            </div>
            <div className='right'>
                <Button type="primary" icon={<AudioOutlined style={{ color: 'white', fontSize: '20px' }} />} className="button-transparent"></Button>
                <Button type="primary" icon={<MenuUnfoldOutlined style={{ color: 'white', fontSize: '20px' }} />} className="button-transparent"></Button>
                <Button type="primary" icon={<PicCenterOutlined style={{ color: 'white', fontSize: '20px' }} />} className="button-transparent"></Button>
                <Button type="primary" icon={<SoundOutlined style={{ color: 'white', fontSize: '20px' }} />} className="button-transparent"></Button>
                <Progress percent={50} showInfo={false} strokeColor={'#ccc'} trailColor={"#535353"} style={{ width: '116px' }} />
                <Button type="primary" icon={<ShrinkOutlined style={{ color: 'white', fontSize: '20px' }} />} className="button-transparent"></Button>
            </div>
        </div>
    );
};

export default Footer;
