import React, { Component } from 'react';
import { Input } from 'antd';

export default class App extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <Input placeholder='导入的Input组件' />;
  }
}
