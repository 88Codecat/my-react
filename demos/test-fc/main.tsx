import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const jsx = (
	<div>
		<span>hello my-react</span>
	</div>
);

const elment = document.getElementById('root');
if (elment) {
	const root = ReactDOM.createRoot(elment);
	// root.render(<App />);
	root.render(jsx);
}
