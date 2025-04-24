import React from 'react';
import { useState } from 'react';

function App() {
	const [count, setCount] = useState(120);
	// window.setCount = setCount
	setCount(120);
	return <span>{count}</span>;
}

export default App;
