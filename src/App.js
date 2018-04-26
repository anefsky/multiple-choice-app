import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Choices from './components/Choices';
import TextArea from './components/TextArea';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading : true,
      isDone: false
    };
    this.questions = null;
    this.questionIdx = 0;
    this.answerPoints = [];

    this.onNext = this.onNext.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
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


  onAnswer(index, points) {
    this.answerPoints[index] = points;
    this.onNext();
  }

  render() {
    const {isLoading, isDone} = this.state;
    const score = this.answerPoints.length ? this.answerPoints.reduce((a, b) => a + b) : 0;

    if(isLoading) {
      return <p>Loading...</p>;
    }

    if(!isDone) {
      return (
        <div className="App">

          <Header
            onclick = {this.onPrevious}
            getQuestionIndex = {() => this.questionIdx}
            numQuestions = {this.questions.length}
          />

          <TextArea
            question = {this.questions[this.questionIdx].question}
            copy = {this.questions[this.questionIdx].copy}
          />

         <Choices
          answerPoints = {this.answerPoints}
          questions = {this.questions}
          getQuestionIndex = {() => this.questionIdx}
          onclick = {this.onAnswer}
         />

       </div>
       );
    } else {
      return(
        <p className="score">Score: <span className="number">{score}</span> points</p>
      )
    }
  }
}

export default App;
