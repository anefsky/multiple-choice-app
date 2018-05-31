import React, { Component } from "react";
import NextPrevButtonSet from './NextPrevButtonSet';
import Choices from './Choices';

class Screen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading : true,
      isDone: false
    };
    this.questions = null;

    this.onAnswer = this.onAnswer.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  componentDidMount() {
    fetch('questions.json')
    .then(results => {
      return results.json();
    })
    .then(data => {
      this.questions = data;
      this.setState({isLoading: false});
    })
  }

  onNext() {
    this.props.onNextPage();

    if(this.props.getQuestionIndex() + 1 >= this.questions.length) { 
      this.setState({isDone: true})
    } else {
      this.setState({ isDone: false });
    }
  }

  onPrevious() {
    this.setState({isDone: false})
    this.props.onPreviousPage();
  }

  onAnswer(questionIndex, selectionIdx) {
    this.props.selections[questionIndex] = selectionIdx;
    this.props.onAddAnswer(questionIndex, selectionIdx);
    this.onNext();
  }

  getScore() {
    let sum = 0;
    this.props.selections.forEach( (answerIdx, index) =>
      sum += this.questions[index].answers[answerIdx].points
    )
    return sum;
  }

  isFirstQuestion() {
    return this.props.getQuestionIndex() === 0;
  }

  isLastQuestion() {
    return this.props.getQuestionIndex() === this.questions.length - 1;
  }

  wasNextQuestionVisited() {
    return this.props.selections.length > this.props.getQuestionIndex();
  }

  render() {
    const {isLoading, isDone} = this.state;

    if(isLoading) {
      return <p>Loading...</p>;
    }

    if(!isDone) {
      return (
        <div className="App">
          <div className="header">
 
            <NextPrevButtonSet
              isFirst = {() => this.isFirstQuestion()}
              isLast = {() => this.isLastQuestion()}
              onNext = {() => this.onNext}
              onPrevious = {() => this.onPrevious}
              wasNextQuestionVisited = {() => this.wasNextQuestionVisited()}
            />

            <p className="counter">Step {this.props.getQuestionIndex() + 1} of {this.questions.length}</p>
          </div>

          <h2>{this.questions[this.props.getQuestionIndex()].question}</h2>
          <h4>{this.questions[this.props.getQuestionIndex()].copy}</h4>

           <Choices
              selections = {this.props.selections}
              getSelections = { () => this.props.selections }
              questions = {this.questions}
              getQuestionIndex = {() => this.props.getQuestionIndex()}
              onclick = {this.onAnswer}
           />
        </div>
       );
    } else {
      return(
        <p className="App score">Score: <span className="number">{this.getScore()}</span> points</p>
      )
    }
  }
}

export default Screen;
