import React from 'react';
import { View, Text, TextInput , KeyboardAvoidingView, Keyboard } from 'react-native';
import { addDeckToStorage  } from '../actions';
import { connect } from 'react-redux';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements'
import { purple } from '../utils/colors'

class AddDeck extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return { title: 'Add new deck' }
  }

  state = {
    deckTitle: '',
  };

  addDeck = () => {
    if (this.state.deckTitle) {
      const { deckTitle } = this.state;
      this.props.addDeckToStorage(deckTitle);
      this.setState({
        deckTitle: ''
      });

      this.props.navigation.navigate(
        'DeckDetails', 
        { title: deckTitle },
        Keyboard.dismiss()
      );
    } 
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}  behavior="padding">
        <Card title='What is the title of your new deck?'>
        <View>

          <FormLabel>Deck name:</FormLabel>
          <FormInput
            onChangeText={deckTitle => this.setState({ deckTitle })}
            value={this.state.deckTitle}
          />
          <Button 
            title='Add deck' 
            backgroundColor={purple}
            onPress={this.addDeck}/>
        </View>
        </Card>
      </KeyboardAvoidingView>
    );
  }
}


export default connect( null, { addDeckToStorage }) (AddDeck);