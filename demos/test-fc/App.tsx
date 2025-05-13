import { useState } from 'react';

const App = () => {
	const [count, setCount] = useState(Number);
	const handleClick = () => {
		setCount(count + 1);
	};
	console.log(count);
	return <button onClick={handleClick}>点击+1:{count}</button>;
};

export default App;
