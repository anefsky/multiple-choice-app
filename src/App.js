import React, { Component } from 'react';
import './App.css';
import NextPrevButtonSet from './components/NextPrevButtonSet';
import Choices from './components/Choices';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading : true,
      isDone: false
    };
    this.questions = null;
    this.questionIdx = 0;
    this.selections = [];

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
    this.questionIdx++;
    if(this.questionIdx >= this.questions.length) {
      this.setState({isDone: true})
    } else {
      this.setState({ isDone: false });
    }
  }

  onPrevious() {
    this.questionIdx--;
    this.setState({isDone: false})
  }


  onAnswer(index, selectionIdx) {
    this.selections[index] = selectionIdx;
    this.onNext();
  }

  getScore() {
    let sum = 0;
    this.questions.forEach( (question, index) =>
      sum += question.answers[this.selections[index]].points
    )
    return sum;
  }

  isFirstQuestion() {
    return this.questionIdx === 0;
  }

  isLastQuestion() {
    return this.questionIdx === this.questions.length - 1;
  }

  wasNextQuestionVisited() {
    return this.selections.length > this.questionIdx;
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

            <p classList="counter">Step {this.questionIdx + 1} of {this.questions.length}</p>
          </div>

          <h2>{this.questions[this.questionIdx].question}</h2>
          <h4>{this.questions[this.questionIdx].copy}</h4>

           <Choices
              selections = {this.selections}
              questions = {this.questions}
              getQuestionIndex = {() => this.questionIdx}
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

export default App;
