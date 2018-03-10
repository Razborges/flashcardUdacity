import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { colors } from '../utils/constants';
import Card from './Card';
import Score from './Score';
import AppButton from './AppButton';

class Quiz extends Component {
  state = {
    currentIndex: 0,
    correct: 0,
  }

  handleGrade = (grade) => {
    const { currentIndex, correct } = this.state
    
    this.setState({
      currentIndex: currentIndex + 1,
      correct: correct + grade
    })
  }

  reset = () => {
    this.setState({
      currentIndex: 0,
      correct: 0,
    })
  }

  goBack = () => {
    this.props.navigation.dispatch(
      NavigationActions.back()
    )
  }

  render(){
    const { deckName, deck } = this.props;
    const { currentIndex, correct } = this.state;
    const deckTotal = deck.questions.length;
    
    if(currentIndex >= deckTotal) {
      return (
        <Score
          correct={correct}
          total={deckTotal}
          handleReset={this.reset}
          handleGoBack={this.goBack}
        />
      )
    }

    const currentCard = deck.questions[currentIndex];

    return (
      <ScrollView>
        <View style={styles.container}>

          <Card position={currentIndex}
            length={deckTotal}
            question={currentCard.question}
            answer={currentCard.answer}
          />

          <View style={styles.viewBtn}>
            <AppButton
              onPress={() => {this.handleGrade(0)}}
              style={{backgroundColor: colors.charlestonGreen}}
            >
                {'OPS... ERREI'}
            </AppButton>

            <AppButton
              onPress={() => {this.handleGrade(1)}}
            >
                {'HA! ACERTEI'}
            </AppButton>
          </View>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    margin: 20,
    flex: 1
  },
  viewBtn: {
    justifyContent: 'space-around',
    height: 100,
  }
})

const mapStateToProps = (decks, { navigation }) => {
  return {
    decks,
    deckName: navigation.state.params.deckName,
    deck: navigation.state.params.deck,
  }
}

export default connect(mapStateToProps,)(Quiz);
