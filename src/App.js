import { connect } from 'react-redux';
import './App.css';
import Screen from './components/Screen';

function mapStateToProps(state) {
  return {
    selections: state.selections,
    getQuestionIndex: () => state.questionIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddAnswer: (questionIndex, answerIndex) => dispatch({
      type: "addAnswer",
      answer: {
        questionIndex: questionIndex,
        answerIndex: answerIndex
      }
    }),
    onNextPage: () => dispatch({
      type: "nextPage"
    }),
    onPreviousPage: () => dispatch({
      type: "previousPage"
    })
  }
}

var connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);

export default connectedComponent;