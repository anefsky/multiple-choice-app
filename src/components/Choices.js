import React, { Component } from 'react';

class Choices extends Component {
	constructor(props) {
		super(props);
		this.questions = props.questions;
		this.getQuestionIndex = props.getQuestionIndex; 
		this.onclick = props.onclick;
	}

	render() {
		return (
			<div>
	        {            
	           this.questions[this.getQuestionIndex()].answers.map((item, index) => 
	            <button
	              key = {item.choice}
	              className = {"choice-button " + 
	              	(this.props.getSelections()[this.getQuestionIndex()] === index  ? "selected" : "unselected")}
	              onClick = {() => this.onclick(this.getQuestionIndex(), index)}
	            >
	              {item.choice}
	            </button>
	           )
	        }
	        </div>
	    );
	}
}

export default Choices;

