import React, { Component } from 'react';

class NextPrevButtonSet extends Component {
	constructor(props) {
		super(props);
		this.isFirst = props.isFirst;
		this.isLast = props.isLast;
		this.onNext = props.onNext;
		this.onPrevious = props.onPrevious;
		this.wasNextQuestionVisited = props.wasNextQuestionVisited;
	}
	render() {
		const prevBtnClass = "nav-button prev " + (!this.isFirst() ? "show" : "hide");
		const nextBtnClass = "nav-button next " + (!this.isLast() &&  
			this.wasNextQuestionVisited() ? "show" : "hide");
		return (
	        <div className="nav-button-set">
	         <button 
	            type="button"
	            className = {prevBtnClass}
	            onClick={this.onPrevious()}
	          />
	         <button 
	            type="button"
	            className = {nextBtnClass}
	            onClick={this.onNext()}
	          />
	        </div>
		);
	}
}

export default NextPrevButtonSet;