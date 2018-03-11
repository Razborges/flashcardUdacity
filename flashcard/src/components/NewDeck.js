import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { newDeck } from '../actions';
import { saveDeckTitle } from '../utils/storage';
import { colors } from '../utils/constants';
import AppButton from './AppButton';

class NewDeck extends Component {
  state = {
    deckName: ''
  };

  handleTextInput = (deckName) => {
    this.setState({deckName})
  };

  save = () => {
    const { deckName } = this.state
    const { decks, navigation } = this.props
    const existingDeckNames = Object.keys(decks).map(title => title.toLowerCase())

    if(!deckName || !deckName.length) {
      return alert('Você precisa dar um nome para o baralho!')
    }

    if(existingDeckNames.indexOf(deckName.toLowerCase()) !== -1) {
      this.setState(() => ({ deckName: '' }))
      return alert('Você já tem um baralho com este nome!')
    }

    this.props.dispatch(
      newDeck(deckName)
    )

    saveDeckTitle(deckName)
      .then(() => {
        navigation.navigate('DeckMain', {deckName})
      })

    this.setState(() => ({ deckName: '' }))
  };

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.viewCard}>
          <Text style={[styles.marginBase, styles.txt]}>
            Qual o nome deste baralho?
          </Text>
          
          <TextInput
            style={[styles.marginBase, styles.input]}
            value={this.state.deckName}
            maxLength={50}
            onChangeText={this.handleTextInput}
            placeholder='Digite um nome'
          />
        </View>
        <AppButton
          style={[styles.marginBase, {backgroundColor: colors.blueMunsell}]}
          onPress={this.save}>
            CRIAR BARALHO
        </AppButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
    flex: 1
  },
  viewCard: {
    height: 200,
    justifyContent: 'flex-start',
  },
  marginBase: {
    marginTop: 10,
    marginBottom: 10,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.charlestonGreen
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
})

const mapStateToProps = (decks) => {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(NewDeck);
