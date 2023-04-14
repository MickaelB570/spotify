import React, { useState } from 'react';
import '../index.css';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const { Title } = Typography;

const Home = () => {
    const playlists = useSelector((state: any) => state.PlaylistSlice.playlists);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const white = { color: "white" };

    return (

        <div className="content">
            <div className='affichageTop'>
                <Title style={white}>Your Playlists</Title>
                <div className="card-row">
                    <div className="card" >
                        <div className="card-left" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}></div>
                        <div className="card-right"><Link to={`/favorite`}><Title level={3} style={white}>Favorite</Title></Link></div>
                    </div>
                    {playlists.map((playlist: any, index: number) => (
                        <div className="card" key={index}>
                            <div className="card-left" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}></div>
                            <div className="card-right"><Link to={`/playlist/${playlist.id}`}><Title level={3} style={white}>{playlist.name}</Title></Link></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='affichageBottom'>
                <Title style={white}>Top 50</Title>
                <div className="row50">
                    <Link to={"/top50/2019"}>
                        <div className="card50">
                            <div className="top50" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}>
                                <Title level={2} style={white}>TOP 50 </Title>
                                <p style={white}>2019</p>
                            </div>
                            <div className="bottom50">                                    <div>
                                <Title level={5} style={white}>Top 50</Title>
                                <p style={white}>2019</p>
                            </div></div>
                        </div>
                    </Link>
                    <Link to={"/top50/2018"}>
                        <div className="card50">
                            <div className="top50" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}>
                                <Title level={2} style={white}>TOP 50 </Title>
                                <p style={white}>2018</p>
                            </div>
                            <div className="bottom50">                                    <div>
                                <Title level={5} style={white}>Top 50</Title>
                                <p style={white}>2018</p>
                            </div></div>
                        </div>
                    </Link>
                    <Link to={"/top50/2017"}>
                        <div className="card50">
                            <div className="top50" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}>
                                <Title level={2} style={white}>TOP 50 </Title>
                                <p style={white}>2017</p>
                            </div>
                            <div className="bottom50">                                    <div>
                                <Title level={5} style={white}>Top 50</Title>
                                <p style={white}>2017</p>
                            </div></div>
                        </div>
                    </Link>
                    <Link to={"/top50/2016"}>
                        <div className="card50">
                            <div className="top50" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}>
                                <Title level={2} style={white}>TOP 50 </Title>
                                <p style={white}>2016</p>
                            </div>
                            <div className="bottom50">                                    <div>
                                <Title level={5} style={white}>Top 50</Title>
                                <p style={white}>2016</p>
                            </div></div>
                        </div>
                    </Link>
                    <Link to={"/top50/2015"}>
                        <div className="card50">
                            <div className="top50" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}>
                                <Title level={2} style={white}>TOP 50 </Title>
                                <p style={white}>201</p>
                            </div>
                            <div className="bottom50">                                    <div>
                                <Title level={5} style={white}>Top 50</Title>
                                <p style={white}>2015</p>
                            </div></div>
                        </div>
                    </Link>
                    <Link to={"/top50/2014"}>
                        <div className="card50">
                            <div className="top50" style={{ backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})` }}>
                                <Title level={2} style={white}>TOP 50 </Title>
                                <p style={white}>2014</p>
                            </div>

                            <div className="bottom50">
                                <div>
                                    <Title level={5} style={white}>Top 50</Title>
                                    <p style={white}>2014</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    );
};



export default Home;
