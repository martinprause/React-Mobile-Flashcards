import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import AddQuestion from './components/AddQuestion';
import Quiz from './components/Quiz';
import { purple, white } from './utils/colors'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers';


function FlashStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Home = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
 });

const Main =  StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Mobile Flashcards",
    }
  },
  DeckDetails: {
    screen: DeckDetails,
  },
  AddQuestion: {
    screen: AddQuestion,
  },
   Quiz: {
    screen: Quiz,
  },
});


export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }
  
  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashStatusBar backgroundColor={purple} barStyle="light-content" />
          <Main />
        </View>
      </Provider>  
    );
  }
}

