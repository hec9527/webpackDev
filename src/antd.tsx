import React from 'react';
import Dom from 'react-dom';
import { Button } from 'antd';
import moment from 'moment';
import URL from './t/wallpaper.jpg';

moment.locale('zh-cn');

function App() {
  console.log(moment());
  document.body.style.background = `url(${URL})`;

  return (
    <>
      <h1>hello world</h1>
      <Button type='primary'>测试</Button>
    </>
  );
}

Dom.render(<App />, document.getElementById('app'));
