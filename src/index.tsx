import React from 'react';
import Dom from 'react-dom';
import { Button, Input } from 'antd';

function App() {
  return (
    <>
      <Button type='primary' style={{ margin: 5 }}>
        hello tsx
      </Button>
      <Input />
    </>
  );
}

Dom.render(<App />, document.getElementById('tsx'));
