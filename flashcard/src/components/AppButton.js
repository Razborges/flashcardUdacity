import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/constants';


const AppButton = ({ children, onPress, style = {}, ...props  }) => (
  <TouchableOpacity
    onPress={ onPress }
    style={[styles.btn, style]}
    {...props}>
      <Text style={styles.btntext}>{ children }</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: colors.blueMunsell,
  },
  btntext: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  }
})

export default AppButton;
