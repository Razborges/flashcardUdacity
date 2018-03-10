import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { getDeck } from '../utils/storage'
import { colors } from '../utils/constants'
import AppButton from './AppButton'

class DeckMain extends Component {
  handleAddCard = () => {
    const { deckName, decks, navigation } = this.props
    const deck = decks[deckName]

    navigation.navigate('NewCard', {deckName, deck})
  }

  handleQuiz = () => {
    const { deckName, decks, navigation } = this.props
    const deck = decks[deckName]

    if(!deck.questions.length){
      return alert('Please add cards to the deck first!')
    }

    navigation.navigate('Quiz', {deckName, deck})
  }

  render(){
    const { deckName, decks } = this.props
    const deck = decks[deckName]

    if (!deck) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>

        <View style={styles.viewInfo}>
          <Text style={styles.title}>{`${deck.title}`.toUpperCase()}</Text>
          <Text style={styles.infoTxt}>{deck.questions.length} CARDS</Text>
        </View>

        <View style={styles.viewBtn}>
          <AppButton style={{backgroundColor: colors.charlestonGreen}}
            onPress={this.handleAddCard}>
              ADICIONAR CARD
          </AppButton>

          <AppButton style={{backgroundColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen}}
            onPress={this.handleQuiz}>
              INICIAR ESTUDO
          </AppButton>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    flex: 1
  },
  viewInfo: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100
  },
  title: {
    color: colors.charcoal,
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoTxt: {
    color: colors.charlestonGreen,
    fontSize: 14
  },
  viewBtn: {
    marginBottom: 30,
    justifyContent: 'space-around',
    height: 100
  },
})

const mapStateToProps = (decks, { navigation }) => {
  const { deckName } = navigation.state.params;

  return {
    decks,
    deckName,
  }
}

export default connect(mapStateToProps,)(DeckMain);
