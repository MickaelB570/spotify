import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from './Home';
import Playlist from './Playlist';
import { Provider } from 'react-redux';
import store from './store';
import { setMusics } from './Slice/MusicSlice';
import musicsJson from './static/data.json';
import { useDispatch } from 'react-redux';
import Favorite from './Favorite';
import Top50 from './Top50';



const App = () => {
    return (
        <Provider store={store} >
        <div className="app">
            <div className="upper">
                <Navigation />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="playlist/:id" element={<Playlist />} />
                    <Route path="top50/:year" element={<Top50 />} />
                    <Route path="/favorite" element={<Favorite />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </div>
            <Footer />
        </div>
        </Provider>
    );
};



export default App;


