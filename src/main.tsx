import React from 'react';
import Dom from 'react-dom';
import JSX from './index.jsx';
import TSX from './index';

function App() {
  return (
    <div className='main'>
      <JSX />
      <TSX />
    </div>
  );
}

Dom.render(<App />, document.querySelector('#app'));
