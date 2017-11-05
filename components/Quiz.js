import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { Card } from 'react-native-elements'
import { purple, red, black } from '../utils/colors'

class Quiz extends Component {

  state = {
    showQuestionScreen: true,
    correctAnswers: 0,
    currentQuestion: 1,
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return{
      title: `${title}`
    }
  }

  constructor(props) {
    super(props);
    this.title = props.navigation.state.params && props.navigation.state.params.title;
    this.deck = this.props.decks.decks[this.title];
  }

  submitAnswer = (rightAnswer) => {
    const correctAnswers = rightAnswer ? this.state.correctAnswers + 1 : this.state.correctAnswers;

    if (this.state.currentQuestion === this.deck.questions.length) {
      clearLocalNotification().then(setLocalNotification);
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      showQuestionScreen: true,
      correctAnswers,
    })
  }

  resetQuiz = () => {
    this.setState({
      currentQuestion: 1,
      showQuestionScreen: true,
      correctAnswers: 0,
    })
  }

  showAnswer = () => {
    this.setState({ showQuestionScreen: false })
  }

  showQuestion = () => {
    this.setState({ showQuestionScreen: true })
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { showQuestionScreen, currentQuestion, correctAnswers } = this.state;
    const { questions } = this.deck;

    if (currentQuestion > questions.length) {
      return(
        <View >
          <Card title='Results'>
            <Text >Correct answers: {correctAnswers} of {questions.length}!</Text>
            <Button 
              title='Back to Deck' 
              backgroundColor={black}
              onPress={this.goBack} />
            <Button 
              title='Restart Quiz' 
              backgroundColor={purple}
              onPress={this.resetQuiz} />
          </Card>
        </View>
      )
    }
;
    if (showQuestionScreen) {
      return(
        <View>
        <Card title={`Question ${currentQuestion} of ${questions.length}`}>
          <Text>Question: {questions[currentQuestion-1].question}</Text>
          <Button 
            title='Show Answer' 
            backgroundColor={purple}
            onPress={this.showAnswer}/>
        </Card>
        <Card  title='Your answer' >
          <Button  
            title='Right' 
            backgroundColor={black}
            onPress={() => this.submitAnswer(true)}/>
          <Button  
            title='Wrong'
            backgroundColor={red}
            onPress={() => this.submitAnswer(false)}/>
        </Card>
      </View>
      )
    } else {

      return(
        <View >
           <Card title={`Question ${currentQuestion} of ${questions.length}`}> 
            <Text>Question: {questions[currentQuestion-1].question}</Text>
            <Text>Answert: {questions[currentQuestion-1].answer}</Text>
            <Button 
              title='Show Question' 
              backgroundColor={purple}
              onPress={this.showQuestion}/>
          </Card>
        </View>
      )
   }

  }

}
  
mapStateToProps = ({ decks }) => ({ decks });
export default connect( mapStateToProps) (Quiz);