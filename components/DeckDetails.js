import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { purple, red } from '../utils/colors'

class DeckDetails extends React.Component {

  state = {
    deck: null
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title: `${title}`
    }
  }


  startQuiz = () => {
    const { title } = this.props.navigation.state.params;
    this.props.navigation.navigate(
      'Quiz', 
      { title } 
    )
  }

  addQuestion = () => {
    const { title } = this.props.navigation.state.params;
    this.props.navigation.navigate(
        'AddQuestion',
        { title }
      )
  }

  render() {
    const { title } = this.props.navigation.state.params;
    const deck = this.props.decks.decks[title];
    return (

      <View>
      <Card title='Deck Details' >
        <Text style={{marginBottom: 10, textAlign: 'center'}}>
          {deck.questions.length === 1 ? '1 question' : `${deck.questions.length} questions`}
        </Text>
        <Button
          title="New Question"
          backgroundColor={purple}
          onPress={this.addQuestion}
        />
        <Button
          title="Start Quiz"
          backgroundColor={red}
          onPress={this.startQuiz}
        />
      </Card>
    </View>
    )
  }
}

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(DeckDetails);
