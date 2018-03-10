import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/constants';
import AppButton from './AppButton';

const Score = ({ correct, total, handleReset, handleGoBack }) => (
    <View style={styles.container}>
      <Text style={styles.message}>
        Você acertou { correct.toFixed(0) } de um total de { total.toFixed(0) } perguntas.
      </Text>

      <View style={styles.viewBtn}>
        <AppButton
          onPress={handleGoBack}
          style={{backgroundColor: colors.charlestonGreen}}
        >
            ACRESCENTAR CARDS
        </AppButton>

        <AppButton
          onPress={handleReset}
        >
            RESPONDER NOVAMENTE
        </AppButton>
      </View>

    </View>
);

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

export default Score;
