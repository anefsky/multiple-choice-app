import React from 'react';

function TextArea(props) {
	const { question, copy } = props;
	return(
		<div>
			<h2>{question}</h2>
			<h4>{copy}</h4>
		</div>
	);
}

export default TextArea;