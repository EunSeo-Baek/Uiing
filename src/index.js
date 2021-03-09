// STYLE 1 : open from index.html

// import React from 'react';
// import ReactDOM from 'react-dom';
// import WebPageApplication from './App';

// ReactDOM.render(<WebPageApplication />, document.getElementById('root'));


// STYLE 2 : open from index.js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  React.createElement('h1', {}, "hello world!"),
  document.getElementById('uiing-root'),
)