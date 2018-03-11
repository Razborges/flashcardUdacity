import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { colors } from '../utils/constants';
import AppButton from './AppButton';

class Card extends Component {
  state = {
    showQuestion: true,
    position: 0,
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.position != this.state.position) {
      this.setState({
        showQuestion: true,
        position: nextProps.position,
      })
    }
  }

  toggleSide = () => {
    const { showQuestion } = this.state;
    this.setState({showQuestion: !showQuestion});
  };

  render(){
    const { showQuestion } = this.state;
    const { question, answer, position, length } = this.props;
  
    const cardText = (showQuestion ? question : answer);

    return (
      <View>

        <TouchableOpacity
          onPress={() => this.toggleSide()}
          style={showQuestion ? styles.cardQuestion : styles.cardAnswer}
        >
          <Text style={styles.position}>
            { position+1 }/{ length }
          </Text>
          <View style={styles.question}>
            <Text style={showQuestion ? styles.txtQuestion : styles.txtAnswer}>
              { cardText }
            </Text>
          </View>
          <View>
            <Text style={styles.position}>
              Clique na carta para mostrar a resposta.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardQuestion: {
    flex: 1,
    height: 350,
    backgroundColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  cardAnswer: {
    flex: 1,
    height: 350,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderColor: colors.blueMunsell,
    borderWidth: 3,
    borderStyle: 'solid',
  },
  question: {
    justifyContent: 'center',
    height: 300
  },
  position: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  txtQuestion: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtAnswer: {
    color: colors.blueMunsell,
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default Card;
