import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { updateDeck } from '../actions';
import { addCardToDeck } from '../utils/storage';
import { colors } from '../utils/constants';
import AppButton from './AppButton';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  componentDidMount(){
    const { deckName, deck } = this.props.navigation.state.params
    this.setState({ deck, deckName })
  };

  handleQuestionChange = (question) => {
    this.setState({question})
  };

  handleAnswerChange = (answer) => {
    this.setState({answer})
  };

  save = () => {
    const { deck, deckName, question, answer } = this.state
    const card = { question, answer }
    
    let invalidMessage = '';
    if(!question || !question.length) {
      invalidMessage += 'É necessário digitar uma pergunta!\n'
    }
    if(!answer || !answer.length) {
      invalidMessage += 'É necessário digitar uma resposta!\n'
    }
    if(invalidMessage.length) {
      return alert(invalidMessage)
    }
    let updatedDeck = {...deck}
    updatedDeck.questions.push(card)

    this.props.dispatch(
      updateDeck(updatedDeck)
    )

    addCardToDeck(deckName, card)

    this.setState(() => ({ question: '', answer: '', deck: updatedDeck }))

    this.props.navigation.dispatch(
      NavigationActions.back()
    )
  };

  render(){
    const { deck } = this.state
    const questions = ((deck && deck.questions) || [])

    return (
      <View style={styles.container}>
        <Text style={[styles.marginBase, styles.txt]}>
          Pergunta do seu card:
        </Text>
        
        <TextInput
          style={[styles.marginBase, styles.input]}
          value={this.state.question}
          maxLength={250}
          onChangeText={this.handleQuestionChange}
          placeholder='Digite uma pergunta' />

        <Text style={[styles.marginBase, styles.txt]}>
          Qual a resposta desta pergunta?
        </Text>
        
        <TextInput
          style={[styles.marginBase, styles.input]}
          value={this.state.answer}
          maxLength={250}
          onChangeText={this.handleAnswerChange}
          placeholder='Digite uma resposta' />

        <AppButton
          style={[styles.marginBase, {backgroundColor: colors.blueMunsell}]}
          onPress={this.save}>
            ADICIONAR
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

export default connect()(NewCard);
