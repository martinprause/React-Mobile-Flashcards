import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { getDecksFromStorage } from '../actions';
import { connect } from 'react-redux';
import { Text, Card } from 'react-native-elements'

class Decks extends React.Component {

  componentDidMount() {
    this.props.getDecksFromStorage()
  } 

  renderDeck = ({ item }) => (
    <TouchableOpacity
       onPress={() => this.props.navigation.navigate('DeckDetails', { title: item.title } )}>
    	<Card title={item.title}>
       		<Text>{`${item.questions.length} questions`}</Text>
    	</Card>
    </TouchableOpacity>
  )

  render() {
  	const { decks } = this.props.decks;
  	if (decks==null) {
  	  	return (
    	  	<View  style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
				     <Text h1>Add a question deck to get started.</Text>
      		</View>
    	);
  	} else {
		const decklist = Object.values(decks);
  	  return (
	      <View >
	         <View> 
	          <FlatList
	            data={decklist}
	            keyExtractor={(item) => item.title}
	            renderItem={this.renderDeck}
	          />
	          </View>
	      </View>
	    );

  	}
  	
  }
}

const mapStateToProps = ({ decks }) => ({ decks });
export default connect(mapStateToProps, {  getDecksFromStorage  })(Decks);

