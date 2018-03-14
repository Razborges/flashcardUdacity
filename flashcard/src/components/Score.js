import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/constants';
import AppButton from './AppButton';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';

class Score extends Component {

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification())
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Você acertou { this.props.correct.toFixed(0) } de um total de { this.props.total.toFixed(0) } perguntas.
        </Text>

        <View style={styles.viewBtn}>
          <AppButton
            onPress={this.props.handleGoBack}
            style={{backgroundColor: colors.charlestonGreen}}
          >
              RETORNAR AO BARALHO
          </AppButton>

          <AppButton
            onPress={this.props.handleReset}
          >
              REINICIAR QUIZ
          </AppButton>
        </View>

      </View>
    )
  }
}

Score.proptypes = {
  correct: Proptypes.number.isRequired,
  total: Proptypes.number.isRequired,
  handleGoBack: Proptypes.func.isRequired,
  handleReset: Proptypes.func.isRequired,
};

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
  },
  message: {
    color: colors.charlestonGreen,
    fontSize: 20,
    fontWeight: 'bold',
  }
})

// const mapStateToProps = ({ correct, total, handleReset, handleGoBack })

// export default connect(mapStateToProps,)(Score);

export default Score;
