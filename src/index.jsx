import React from 'react';
import Dom from 'react-dom';
import { Button, Input } from 'antd';
import MyInput from './input.jsx';

function App() {
  return (
    <>
      <MyInput />
      <Button type='primary' style={{ margin: 5 }}>
        hello jsx
      </Button>
      <Input />
    </>
  );
}

Dom.render(<App />, document.getElementById('jsx'));
