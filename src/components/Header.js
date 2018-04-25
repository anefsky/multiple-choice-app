import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);
		this.onclick = props.onclick;
		this.questionIndex = props.getQuestionIndex;
		this.numQuestions = props.numQuestions;

	}
	render() {
		const prevBtnClass = "prev-button " + (this.questionIndex() > 0 ? "show" : "hide");
		return (
	        <div className="header">
	         <button 
	            type="button"
	            className = {prevBtnClass}
	            onClick={this.onclick}
	          />

	          <p>Step {this.questionIndex() + 1} of {this.numQuestions}</p>
	        </div>
		);
	}
}

export default Header;