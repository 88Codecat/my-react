import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

React.createElement("h1",{children: "123"})
console.log()

const jsx = (<div>
  <span>hello my-react</span>
</div>)

const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(jsx);
root.render(jsx);