import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addQuestionToStorage } from '../actions';
import {
  Card,
  Button,
  FormLabel,
  FormInput,
} from 'react-native-elements';
import { purple } from '../utils/colors'

class AddQuestion extends Component {
  state = {
    question: '',
    answer: '',
  }

  constructor(props) {
    super(props);
    this.title = props.navigation.state.params && props.navigation.state.params.title;
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Add Question'
    }
  }

  addQuestion = () => {
    const { question, answer } = this.state;
    this.props.addQuestionToStorage(this.title, question, answer);
    this.setState({ question: '', answer: ''});
    this.props.navigation.goBack();
  }

  render() {
    return(
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
        behavior="padding"
      >
        <Card title="Add a Card" >
          <FormLabel>Question:</FormLabel>
          <FormInput
            onChangeText={question => this.setState({ question })}
            value={this.state.titleText}
          />
          <FormLabel>Answer:</FormLabel>
          <FormInput
            onChangeText={answer => this.setState({ answer })}
            value={this.state.titleText}
          />
          <Button
            title="Add question"
            backgroundColor={purple}
            onPress={this.addQuestion}
          />
        </Card>
      </KeyboardAvoidingView>
   );
  }


}

export default connect( null, { addQuestionToStorage }) (AddQuestion);