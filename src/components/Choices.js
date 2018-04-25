import React, { Component } from 'react';

class Choices extends Component {
	constructor(props) {
		super(props);
		this.answerPoints = props.answerPoints;
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
	              	(this.answerPoints[this.getQuestionIndex()] - 1 === index  ? "selected" : "")}
	              onClick = {() => this.onclick(this.getQuestionIndex(), item.points)}
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

