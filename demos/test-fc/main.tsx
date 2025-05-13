import ReactDOM from 'react-dom/client';
import App from './App';

const jsx = (
	<div>
		<span>hello</span>
		<span>my-react</span>
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
console.log('打印的<App />结果：', <App />);
console.log('打印的jsx结果:', jsx);
