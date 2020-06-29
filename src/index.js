import logo from './t/favicon.ico';
import avator from './t/avator.png';
import wallpaper from './t/wallpaper.jpg';
import './t/index.css';
import './t/index.scss';
import './t/index.less';
import './index.jsx';
import './index.tsx';

const body = document.body;
const el_ico = document.createElement('img');
el_ico.src = logo;
body.appendChild(el_ico);

const el_avator = document.createElement('img');
el_avator.src = avator;
body.appendChild(el_avator);

body.style.background = `url(${wallpaper})`;
