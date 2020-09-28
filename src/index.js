import './main.tsx';
import avator from './t/avator.png';
import logo from './t/favicon.ico';
import './t/index.css';
import './t/index.less';
import './t/index.scss';
import wallpaper from './t/wallpaper.jpg';

const body = document.body;
const el_ico = document.createElement('img');
el_ico.src = logo;
body.appendChild(el_ico);

const el_avator = document.createElement('img');
el_avator.src = avator;
body.appendChild(el_avator);

body.style.background = `url(${wallpaper})`;

// 验证代理，需要起一个后端服务，并且监听  /api/ 路径

fetch('/api/user');
