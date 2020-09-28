import React from 'react';
import { Button, Input } from 'antd';
import MyInput from './input';

function App() {
  return (
    <>
      <div>
        <p>
          在 webpack.config.js 中添加插件 webpack.DefinePlugin
          来注入全局属性，如果使用Ts，则需要在类型申明文件中添加定义{' '}
        </p>
        注入变量 name:{name} address:{address}
      </div>
      <MyInput />
      <Button type='primary' style={{ margin: 5 }}>
        hello tsx
      </Button>
      <Input />
    </>
  );
}

export default App;
