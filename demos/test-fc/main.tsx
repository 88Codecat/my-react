import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const a: React.ReactElement = React.createElement('h1', { children: '123' });
const jsx = (
	<div>
		<p>egeaeagag</p>
		<span>hello my-react</span>
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(jsx);
// root.render(a);
console.log('打印的react元素结果', a);
console.log('打印的<App />结果：', <App />);
console.log('打印的jsx结果:', jsx);
